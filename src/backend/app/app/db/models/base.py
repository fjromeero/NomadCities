# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.engine import Base
from app.db.models.user import User
from app.db.models.city import City
from app.db.models.comment import Comment
from app.db.models.tag import Tag
from app.db.models.user_tag import UserTag
from app.db.models.city_tag import CityTag
from app.db.models.user_suggested import UserSuggested
from app.db.models.city_suggested import CitySuggested
from app.db.models.assign_user import AssignUser
from app.db.models.assign_city import AssignCity