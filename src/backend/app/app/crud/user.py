from sqlalchemy.orm import Session

from typing import Any
from app.models.user import UserOnCreate
from app.db.models.user import User
from app.api.utils import hash_password

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