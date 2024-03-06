from sqlalchemy.orm import Session

from app.core.settings import settings
from app.db.models.user import User
from app.api.utils import hash_password

def init_db(session: Session) -> None:
    user = session.query(User).filter(User.username == settings.FIRST_SUPERUSER).first()

    if not user:
        user_in = User(
            username=settings.FIRST_SUPERUSER,
            hashed_password=hash_password(settings.FIRST_SUPERUSER_PASSWD),
            is_admin=True,
            email=f"{settings.FIRST_SUPERUSER}@email.com",
            img="/"
        )

        session.add(user_in)
        session.commit()
        session.refresh(user_in)