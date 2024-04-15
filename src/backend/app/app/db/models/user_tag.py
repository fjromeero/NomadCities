from sqlalchemy import Column, Integer,String, ForeignKey
from app.db.models.tag import Tag

class UserTag(Tag):
    __tablename__ = 'user_tag'

    id = Column(Integer, ForeignKey('tag.id'), primary_key=True, index=True)

    __mapper_args__ = {
        "polymorphic_identity": "name",
    }