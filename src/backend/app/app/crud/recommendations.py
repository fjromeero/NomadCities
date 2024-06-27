from app.db.models.city_suggested import CitySuggested
from app.db.models.user_suggested import UserSuggested
from sqlalchemy.orm import Session

def get_city_suggested_cities(session: Session, id_city: int) -> list[CitySuggested]:
    return session.query(CitySuggested).filter(CitySuggested.id_city == id_city).all()


def get_user_suggested_cities(session: Session, id_user: int) -> list[UserSuggested]:
    return session.query(UserSuggested).filter(UserSuggested.id_user == id_user).all()