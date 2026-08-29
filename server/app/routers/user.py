from fastapi import APIRouter, status, HTTPException, Depends

from ..import models, schemas
from sqlalchemy.orm import Session 
from ..database import get_db

from ..utils import hashing, oauth2

router = APIRouter(
    prefix = "/users",
    tags = ['Users']
)

@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_email = db.query(models.User).filter(models.User.email==user.email).first()
    existing_username = db.query(models.User).filter(models.User.username==user.username).first()

    if existing_email:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail='Email already registered!')

    if existing_username:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, 
                            detail=f'Username is already taken!')

    hashed_password = hashing.hash_password(user.password)
    new_user = models.User(
        username = user.username,
        email = user.email,
        password = hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@router.get("/me", response_model=schemas.UserResponse)
def get_current_user(current_user: models.User = Depends(oauth2.get_current_user)):
    return current_user


@router.get("/{id}", response_model=schemas.UserResponse)
def get_user(id: int, db: Session = Depends(get_db),
             current_user: models.User = Depends(oauth2.get_current_user),
):

    user = db.query(models.User).filter(models.User.id==id).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f'User with id: {id} does not exist!')

    return user