from datetime import datetime, timedelta, timezone
from urllib.parse import urlencode

import httpx
import jwt
from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy import or_

from .. import database, schemas, models
from ..config import settings
from ..utils import oauth2, hashing

router = APIRouter(
    prefix="/auth",
    tags=['Authentication']
)

@router.post("/login", response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), 
          db: Session = Depends(database.get_db)):

    # Allow login with either email or username
    login_identifier = user_credentials.username.strip()
    user = db.query(models.User).filter(
        or_(
            models.User.email == login_identifier.lower(),
            models.User.username == login_identifier
        )
    ).first()

    if not user or not user.password or not hashing.verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token = oauth2.create_access_token(data={"sub": str(user.id)})

    return {"access_token": access_token, "token_type": "bearer"}


def _google_state() -> str:
    return jwt.encode(
        {"purpose": "google-oauth", "exp": datetime.now(timezone.utc) + timedelta(minutes=10)},
        settings.jwt_secret_key,
        algorithm=settings.jwt_algorithm,
    )


def _unique_username(db: Session, email: str, name: str | None) -> str:
    base = "".join(character if character.isalnum() else "_" for character in (name or email.split("@")[0]).lower()).strip("_") or "google_user"
    candidate = base[:45]
    suffix = 1
    while db.query(models.User).filter(models.User.username == candidate).first():
        suffix += 1
        candidate = f"{base[:40]}_{suffix}"
    return candidate


@router.get("/google")
def google_login():
    if not settings.google_client_id or not settings.google_client_secret:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Google sign-in is not configured.")
    query = urlencode({
        "client_id": settings.google_client_id,
        "redirect_uri": settings.google_redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "state": _google_state(),
        "prompt": "select_account",
    })
    return RedirectResponse(f"https://accounts.google.com/o/oauth2/v2/auth?{query}")


@router.get("/google/callback")
def google_callback(code: str, state: str, db: Session = Depends(database.get_db)):
    try:
        payload = jwt.decode(state, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        if payload.get("purpose") != "google-oauth":
            raise ValueError("Unexpected OAuth state")
        token_response = httpx.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": settings.google_client_id,
                "client_secret": settings.google_client_secret,
                "redirect_uri": settings.google_redirect_uri,
                "grant_type": "authorization_code",
            },
            timeout=10,
        )
        token_response.raise_for_status()
        userinfo_response = httpx.get(
            "https://openidconnect.googleapis.com/v1/userinfo",
            headers={"Authorization": f"Bearer {token_response.json()['access_token']}"},
            timeout=10,
        )
        userinfo_response.raise_for_status()
        info = userinfo_response.json()
        if not info.get("sub") or not info.get("email") or not info.get("email_verified"):
            raise ValueError("Google account has no verified email")
    except Exception as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Google sign-in could not be completed.") from exc

    user = db.query(models.User).filter(models.User.google_id == info["sub"]).first()
    if not user:
        user = db.query(models.User).filter(models.User.email == info["email"].lower()).first()
        if user:
            user.google_id = info["sub"]
        else:
            user = models.User(
                google_id=info["sub"],
                username=_unique_username(db, info["email"], info.get("name")),
                email=info["email"].lower(),
                avatar_url=info.get("picture"),
            )
            db.add(user)
    if not user.avatar_url and info.get("picture"):
        user.avatar_url = info["picture"]
    db.commit()
    db.refresh(user)
    access_token = oauth2.create_access_token(data={"sub": str(user.id)})
    return RedirectResponse(f"{settings.frontend_url.rstrip('/')}/auth/callback#token={access_token}")
