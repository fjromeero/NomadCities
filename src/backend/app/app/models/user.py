from typing import Optional
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