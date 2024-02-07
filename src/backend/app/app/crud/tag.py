from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from typing import Any
from app.db.models.user_tag import UserTag
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
    
def search_tag(*, session: Session, name: str) -> Any:
    return session.query(UserTag).filter(UserTag.name == name).first()