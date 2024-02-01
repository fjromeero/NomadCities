from typing import Optional, Union
from pydantic import BaseModel, EmailStr

# Base model - Shared properties
class UserBase(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    is_admin: Optional[bool] = True
    img: Optional[str] = "path"

# Properties to receive via API on creation
class UserOnCreate(UserBase):
    username: str
    email: EmailStr
    password: str

class UserOut(BaseModel):
    username: str
    email: EmailStr

class UserOnUpdate(BaseModel):
    email: Union[EmailStr, None] = None
    username: Union[str, None] = None