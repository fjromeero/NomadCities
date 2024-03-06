from sqlalchemy import Column, String, ForeignKey
from app.db.models.tag import Tag

class UserTag(Tag):
    __tablename__ = 'user_tag'

    name = Column(String, ForeignKey('tag.name'), primary_key=True, index=True)