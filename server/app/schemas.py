from pydantic import BaseModel, EmailStr, Field, ConfigDict
from datetime import datetime
from typing import Optional

# User Schema

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str = Field(min_length=8)

class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class UserOut(BaseModel):
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# TokenData is a schema that holds the user's identity (usually their ID) extracted from a 
# verified JWT so the server knows which user is making the request. 🔐
class TokenData(BaseModel):
    id: Optional[int] = None