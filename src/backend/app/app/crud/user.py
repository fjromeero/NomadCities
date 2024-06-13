from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from typing import Any, Union, Dict
from app.models.user import UserOnCreate, UserOnUpdate, UserOnUpdatePassword
from app.db.models.user import User
from app.api.utils import hash_password, verify_password

def create_user(*, session:Session, user_create: UserOnCreate) -> User:
    db_obj = User(
        username = user_create.username,
        email = user_create.email,
        hashed_password = hash_password(user_create.password),
        img = user_create.img,
        is_admin = user_create.is_admin,
    )

    session.add(db_obj)
    session.commit()
    session.refresh(db_obj)
    return db_obj

def search_user_by_username(*, session: Session, username: str) -> Any:
    return session.query(User).filter(User.username == username).first()

def search_user_by_email(*, session: Session, email: str) -> Any:
    return session.query(User).filter(User.email == email).first()


def search_user_by_id(*, session: Session, id: int) -> User | None:
    return session.query(User).filter(User.id == id).first()


def update_user_profile(*, session: Session, user_id: int, changes: Union[UserOnUpdate, Dict[str, Any]]) -> User:
    user = session.query(User).filter(User.id == user_id).first()

    if isinstance(changes, dict):
        updated_data = changes
    else:
        updated_data = changes.dict(exclude_unset=True)

    if user:
        for key, value in updated_data.items():
            setattr(user, key, value)

    session.commit()

    session.refresh(user)

def update_user_password(*, session: Session, user_id: int, password_changes: UserOnUpdatePassword) -> User:
    user = session.query(User).filter(User.id == user_id).first()

    if user:
        if verify_password(password_changes.current_password, user.hashed_password):
            setattr(user, "hashed_password", hash_password(password_changes.new_password))
            session.commit()
            session.refresh(user)
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect password",
            )

def update_user_image(*, session: Session, user_id: int, path: str) -> Any:
    user = session.query(User).filter(User.id == user_id).first()
    if user:
        setattr(user, "img", path)
        session.commit()
        session.refresh(user)
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password",
        )