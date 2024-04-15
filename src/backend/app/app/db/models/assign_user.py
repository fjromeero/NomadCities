from sqlalchemy import Column, ForeignKey, Integer
from app.db.engine import Base

class AssignUser(Base):
    __tablename__ = 'assign_user'

    id_user = Column(Integer, ForeignKey('user.id'), primary_key=True, index=True)
    id_user_tag = Column(Integer, ForeignKey('user_tag.id'), primary_key=True, index=True)