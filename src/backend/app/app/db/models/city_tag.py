from sqlalchemy import Column, Integer, String, ForeignKey
from app.db.models.tag import Tag

class CityTag(Tag):
    __tablename__ = 'city_tag'

    id = Column(Integer, ForeignKey('tag.id'), primary_key=True, index=True)

    __mapper_args__ = {
        "polymorphic_identity": "name",
    }
