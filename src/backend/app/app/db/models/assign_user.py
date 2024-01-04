from sqlalchemy import Column, ForeignKey, String, Integer
from app.db.engine import Base

class AssignUser(Base):
    __tablename__ = 'assign_user'

    id_user = Column(Integer, ForeignKey('user.id'), primary_key=True, index=True)
    tag_name = Column(String, ForeignKey('user_tag.name'), primary_key=True, index=True)