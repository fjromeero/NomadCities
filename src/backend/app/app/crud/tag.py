from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List

from app.db.models.user_tag import UserTag
from app.db.models.city_tag import CityTag
from app.db.models.assign_user import AssignUser
from app.db.models.assign_city import AssignCity
from app.models.tag import Tag, CityTagOut
from app.crud.user import search_user_by_id
from app.crud.city import search_city_by_id


def search_all_user_tags(*, session: Session) -> List[UserTag]:
    return session.query(UserTag).all()


def search_user_tag_by_name(*, session: Session, tag_name: str) -> UserTag | None:
    return session.query(UserTag).filter(tag_name == UserTag.name).first();


def create_user_tag(*, session: Session, new_tag: Tag):
    tag = search_user_tag_by_name(session=session, tag_name= new_tag.name)
    if tag:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="There is a user tag with this name alredy",
        )
    else:
        tag = UserTag(
            name=new_tag.name
        )
        session.add(tag)
        session.commit()
        session.refresh(tag)
        return tag


def search_user_tags(*, session: Session, user_id: int) -> List[UserTag]:
    if not search_user_by_id(session=session, id=user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"There is not a user with id {user_id}"
        )
    else:
        return session.query(UserTag.name)\
            .join(AssignUser, UserTag.id == AssignUser.id_user_tag)\
            .filter(AssignUser.id_user == user_id)\
            .all()
    

def user_has_tag_assigned(*, session: Session, user_id: int, tag_name: str) -> AssignUser:
    return session.query(AssignUser)\
        .join(UserTag)\
        .filter(AssignUser.id_user == user_id, UserTag.name == tag_name)\
        .first()
    

def assign_user_tag(*, session: Session, user_id: int, tag_name: str) -> UserTag | None:
    tag = search_user_tag_by_name(session=session, tag_name=tag_name)
    alredy_assigned = user_has_tag_assigned(session=session, user_id=user_id, tag_name=tag_name)

    if tag and not alredy_assigned:
        user_tag = AssignUser(
            id_user=user_id,
            id_user_tag = tag.id,
        )
        session.add(user_tag)
        session.commit()
        session.refresh(user_tag)
        return tag
    

def remove_user_tag(*, session: Session, user_id, tag_name: str) -> UserTag | None: 
    tag = search_user_tag_by_name(session=session, tag_name=tag_name)
    assigned = user_has_tag_assigned(session=session, user_id=user_id, tag_name=tag_name)

    if tag and assigned:
        session.delete(assigned)
        session.commit()
        return tag


def search_city_tag_by_name(*, session: Session, tag_name: str) -> CityTag | None:
    return session.query(CityTag).filter(tag_name == CityTag.name).first();


def create_city_tag(*, session: Session, new_tag: Tag):
    tag = search_city_tag_by_name(session=session, tag_name= new_tag.name)
    if tag:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="There is a city tag with this name alredy",
        )
    else:
        tag = CityTag(
            name=new_tag.name
        )
        session.add(tag)
        session.commit()
        session.refresh(tag)
        return tag
    

def search_all_city_tags(*, session: Session) -> List[CityTag]:
    return session.query(CityTag).all()


def assign_tag_to_city(*, session: Session, city_id: int, new_tag: Tag) -> CityTagOut:
    """
    Assign a tag to a city if it is not already assigned. In other case, increment the count of the assignation.

    :param session: SQLAlchemy session
    :param city_id: city id
    :param new_tag: tag to assign
    """
    tag = search_city_tag_by_name(session=session, tag_name=new_tag.name)
    city = search_city_by_id(session=session, city_id=city_id)
    if not tag:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"There is not a city tag with name {new_tag.name}",
        )
    
    assignation = session.query(AssignCity).filter(AssignCity.id_city == city_id, AssignCity.id_city_tag == tag.id).first()
    if not assignation:
        assignation = AssignCity(
            id_city=city_id,
            id_city_tag=tag.id,
        )
        session.add(assignation)
    else:
        setattr(assignation, "count", assignation.count+1)

    session.commit()
    session.refresh(assignation)
    return CityTagOut(
        name=tag.name,
        count=assignation.count,
    )
    

def search_city_assigned_tags(*, session: Session, city_id: int):
    """
    Get all assigned tags to a city
    """
    return session.query(AssignCity, CityTag.name)\
                  .join(CityTag, AssignCity.id_city_tag == CityTag.id)\
                  .filter(AssignCity.id_city == city_id)\
                  .order_by(AssignCity.count.desc())\
                  .all()
