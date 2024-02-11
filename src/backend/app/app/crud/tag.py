from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import Any

from app.db.models.user_tag import UserTag
from app.db.models.assign_user import AssignUser
from app.models.tag import Tag

def create_user_tag(*, session: Session, new_tag: Tag) -> Any:
    tag = search_tag(session=session, name=new_tag.name)
    if not tag:
        tag = UserTag(
            name = new_tag.name,
        )
        session.add(tag)
        session.commit()
        session.refresh(tag)
        return tag
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="There is alredy a tag with this name",
        )
    
def get_all_user_tags(*, session: Session) -> Any:
    return session.query(UserTag).all();
    
def search_tag(*, session: Session, name: str) -> Any:
    return session.query(UserTag).filter(UserTag.name == name).first()

def search_current_user_tags(*, session: Session, current_user_id: int):
    return session.query(AssignUser.tag_name).filter(AssignUser.id_user == current_user_id).all()

def user_has_tag(*, session: Session, user_id: int, tag_name: str):
    return session.query(AssignUser).filter(AssignUser.id_user == user_id, AssignUser.tag_name == tag_name).first()

def assign_tags_to_user(*, session: Session, user_id: int, tag_name: str):
    tag = search_tag(session=session, name=tag_name)
    alredy_assigned = user_has_tag(session=session, user_id=user_id, tag_name=tag_name)
    
    if tag and not alredy_assigned:
        user_tag = AssignUser(
            id_user=user_id,
            tag_name=tag_name,
        )
        session.add(user_tag)
        session.commit()
        session.refresh(user_tag)
        return user_tag
    
def remove_tags_from_user(*, session: Session, user_id: int, tag_name: str):
    tag = search_tag(session=session, name=tag_name)
    if tag:
        assigned = user_has_tag(session=session, user_id=user_id, tag_name=tag_name)
        if assigned:
            session.delete(assigned)
            session.commit()
            return tag_name
        else:
            raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User has not this tag assigned",
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="There is no user tag with this name",
        )