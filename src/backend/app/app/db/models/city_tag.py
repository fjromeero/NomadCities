from sqlalchemy import Column, String, ForeignKey
from app.db.models.tag import Tag

class CityTag(Tag):
    __tablename__ = 'city_tag'

    name = Column(String, ForeignKey('tag.name'), primary_key=True, index=True)