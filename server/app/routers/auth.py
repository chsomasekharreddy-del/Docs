from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import or_

from .. import database, schemas, models
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

    if not user or not hashing.verify_password(user_credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token = oauth2.create_access_token(data={"sub": str(user.id)})

    return {"access_token": access_token, "token_type": "bearer"}