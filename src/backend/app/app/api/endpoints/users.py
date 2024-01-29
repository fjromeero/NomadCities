from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.settings import settings
from app.models.user import UserOnCreate
from app.models.token import Token
from app.db.models.user import User
from app.api.utils import (
    get_db,
    hash_password,
    verify_password,
    create_access_token,
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

@router.post("/login")
async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> Token:
    """
    OAuth2 compatible token login with users credentials, get an access token for future requests.
    """
    user = db.query(User).filter(User.username == user_credentials.username).first()

    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code= 401,
            detail= "Incorrect username or password.",
        )
    
    access_token_expires = timedelta(settings.ACCESS_TOKEN_EXPIRATION_MINUTES)

    return Token(
        access_token = create_access_token(
            user.id, expires_delta=access_token_expires
        )
    )