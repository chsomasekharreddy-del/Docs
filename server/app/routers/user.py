from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, status, HTTPException, Depends, File, UploadFile
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db
from ..utils import hashing, oauth2

router = APIRouter(
    prefix="/users",
    tags=['Users']
)

UPLOADS_DIR = Path(__file__).resolve().parents[2] / "uploads"
MAX_AVATAR_BYTES = 2 * 1024 * 1024
AVATAR_EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}


def _is_valid_image(image_data: bytes, content_type: str) -> bool:
    if content_type == "image/jpeg":
        return image_data.startswith(b"\xff\xd8\xff")
    if content_type == "image/png":
        return image_data.startswith(b"\x89PNG\r\n\x1a\n")
    if content_type == "image/webp":
        return image_data.startswith(b"RIFF") and image_data[8:12] == b"WEBP"
    return False

@router.post("", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    normalized_email = user.email.lower().strip()
    normalized_username = user.username.strip()

    existing_email = db.query(models.User).filter(models.User.email == normalized_email).first()
    existing_username = db.query(models.User).filter(models.User.username == normalized_username).first()

    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered!"
        )

    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, 
            detail="Username is already taken!"
        )

    hashed_password = hashing.hash_password(user.password)
    new_user = models.User(
        username=normalized_username,
        email=normalized_email,
        password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get("/me", response_model=schemas.UserResponse)
def get_current_user(current_user: models.User = Depends(oauth2.get_current_user)):
    return current_user


@router.patch("/me", response_model=schemas.UserResponse)
def update_current_user(
    updates: schemas.UserUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(oauth2.get_current_user),
):
    if updates.username is not None:
        username = updates.username.strip()
        if not username:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Username cannot be blank.")
        existing = db.query(models.User).filter(models.User.username == username, models.User.id != current_user.id).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Username is already taken!")
        current_user.username = username

    if updates.email is not None:
        email = updates.email.lower().strip()
        existing = db.query(models.User).filter(models.User.email == email, models.User.id != current_user.id).first()
        if existing:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered!")
        current_user.email = email

    db.commit()
    db.refresh(current_user)
    return current_user


@router.post("/me/avatar", response_model=schemas.UserResponse)
def upload_avatar(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(oauth2.get_current_user),
):
    extension = AVATAR_EXTENSIONS.get(file.content_type or "")
    if not extension:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Choose a JPG, PNG, or WebP image.",
        )

    image_data = file.file.read(MAX_AVATAR_BYTES + 1)
    if not image_data:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Choose an image to upload.")
    if len(image_data) > MAX_AVATAR_BYTES:
        raise HTTPException(status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE, detail="Image must be 2 MB or smaller.")
    if not _is_valid_image(image_data, file.content_type or ""):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="The uploaded file is not a valid image.")

    UPLOADS_DIR.mkdir(exist_ok=True)
    filename = f"user-{current_user.id}-{uuid4().hex}{extension}"
    destination = UPLOADS_DIR / filename
    destination.write_bytes(image_data)

    previous_avatar = current_user.avatar_url
    current_user.avatar_url = f"/uploads/{filename}"
    db.commit()
    db.refresh(current_user)

    if previous_avatar and previous_avatar.startswith("/uploads/"):
        previous_file = UPLOADS_DIR / Path(previous_avatar).name
        if previous_file.exists():
            previous_file.unlink()

    return current_user

@router.get("/{id}", response_model=schemas.UserResponse)
def get_user(
    id: int, 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(oauth2.get_current_user)
):
    user = db.query(models.User).filter(models.User.id == id).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id: {id} does not exist!"
        )

    return user
