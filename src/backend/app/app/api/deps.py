from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import ValidationError

from app.db.engine import Session
from app.api.utils.db import get_db
from app.db.models.user import User
from app.core.settings import settings
from app.api.utils import security
from app.models.token import TokenPayload

oauth2 = OAuth2PasswordBearer(tokenUrl='login')

SessionDep = Annotated[Session, Depends(get_db)]
TokenDep = Annotated[str, Depends(oauth2)]

def get_current_user(session: SessionDep, token: TokenDep) -> User:
    try:
        payload = jwt.decode(
            token=token, key=settings.SECRET_KEY, algorithms=[security.ALGORITHM], 
        )
        token_data = TokenPayload(**payload)
    except (JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = session.query(User).filter(User.id == token_data.sub).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

CurrentUser = Annotated[User, Depends(get_current_user)]

def get_current_superuser(current: CurrentUser) -> User:
    if not current.is_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User must be a superuser"
        )
    return current

CurrentSuperUser = Annotated[User, Depends(get_current_superuser)]