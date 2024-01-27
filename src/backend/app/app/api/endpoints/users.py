from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.models.user import UserOnCreate
from app.db.models.user import User
from app.api.utils import (
    get_db,
    hash_password
)

router = APIRouter()

@router.post("/signup")
async def signup(user_data: UserOnCreate, db: Session = Depends(get_db)):
    """
    Create new user
    """
    user = db.query(User).filter(User.username == user_data.username).first()

    if user: 
        raise HTTPException(
            status_code=400,
            detail="This username is alredy linked to an account.",
        )
    
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if user:
        raise HTTPException(
            status_code=400,
            detail="This email is alredy linked to an account.",
        )
    
    user = User(
        username = user_data.username,
        email = user_data.email,
        hashed_password = hash_password(user_data.password),
        is_admin = user_data.is_admin,
        img = user_data.img,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user.username