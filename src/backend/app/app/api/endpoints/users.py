from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Any

from app.core.settings import settings
from app.api.deps import CurrentUser
from app.models.user import UserOnCreate, UserOut
from app.models.token import Token
from app.db.models.user import User
from app.crud.user import create_user, search_user_by_username, search_user_by_email
from app.api.utils import (
    get_db,
    verify_password,
    create_access_token,
)

router = APIRouter()

@router.post("/signup")
async def signup(user_data: UserOnCreate, db: Session = Depends(get_db)):
    """
    Create new user
    """
    user = search_user_by_username(session=db, username=user_data.username)

    if user: 
        raise HTTPException(
            status_code=400,
            detail="This username is alredy linked to an account.",
        )
    
    user = search_user_by_email(session=db, email=user_data.email)
    
    if user:
        raise HTTPException(
            status_code=400,
            detail="This email is alredy linked to an account.",
        )
    
    user = create_user(session=db, user_create=user_data)

    return user.username

@router.post("/login")
async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> Token:
    """
    OAuth2 compatible token login with users credentials, get an access token for future requests.
    """
    user = search_user_by_username(session=db, username=user_credentials.username)

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