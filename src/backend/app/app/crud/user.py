from sqlalchemy.orm import Session

from typing import Any, Union, Dict
from app.models.user import UserOnCreate, UserOnUpdate
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