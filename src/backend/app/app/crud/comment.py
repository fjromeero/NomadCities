from datetime import timedelta, datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.comment import CommentOnCreate
from app.db.models.comment import Comment
from app.crud.city import search_city_by_id


def can_post_comment(*, session: Session, id_user: int, city_id: int) -> bool:
    """
    Check if the user can post a comment for the city.
    The user can post a comment if:
    - the user has never posted a comment for the city
    - the user has posted a comment for the city but it was posted more than 6 months ago

    :param session: SQLAlchemy session
    :param id_user: user id
    :param city_id: city id
    :return: True if the user can post a comment, False otherwise
    """
    comment = session.query(Comment).filter(Comment.id_user == id_user, Comment.id_city == city_id).first()
    return comment is None or datetime.now(timezone.utc) > comment.date + timedelta(days=30*6)


def create_comment(*, session: Session, id_user: int, comment: CommentOnCreate) -> Comment:
    city = search_city_by_id(session=session, city_id=comment.id_city)
    can = can_post_comment(session=session, id_user=id_user, city_id=comment.id_city)
    if city and can:
        comment = Comment(
            id_city = comment.id_city,
            id_user = id_user,
            body = comment.body,
            rating = comment.rating,
            price_per_month = comment.price_per_month ,
            internet_connection = comment.internet_connection,
            coworking_spaces = comment.coworking_spaces,
            health_service = comment.health_service,
            safety = comment.safety,
            gastronomy = comment.gastronomy,
            means_of_trasnsport = comment.means_of_trasnsport,
            foreign_friendly = comment.foreign_friendly,
            stay_length = comment.stay_length,
        )

        session.add(comment)
        session.commit()
        session.refresh(comment)

        return comment
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='You cannot post a comment for this city at the moment.'
        )

