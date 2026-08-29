from fastapi import APIRouter, status, HTTPException, Depends
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from ..import database, schemas, models
from ..utils import oauth2, hashing

router = APIRouter(
    prefix="/auth",
    tags = ['Authentication']
)

@router.post("/login", response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), 
          db: Session = Depends(database.get_db)):

    user = db.query(models.User).filter(models.User.email==user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, 
                            detail=f'Invalid credentials')

    if not hashing.verify_password(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, 
                            detail=f'Invalid Credentails')

    access_token = oauth2.create_access_token(data = {"sub": str(user.id)})

    return {'access_token': access_token, 'token_type': 'bearer'}