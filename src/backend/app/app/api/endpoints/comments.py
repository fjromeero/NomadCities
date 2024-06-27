from fastapi import APIRouter, Depends
from typing import List

from app.api.deps import CurrentUser, SessionDep, get_current_user
from app.models.comment import CommentOnCreate, CommentOut
from app.crud.comment import create_comment, get_city_comments
from app.crud.user import search_user_by_id

router = APIRouter()

@router.post('/comment')
async def comment_create(
    session: SessionDep,
    current_user: CurrentUser,
    new_comment: CommentOnCreate
) -> CommentOut:
    comment = create_comment(session=session, id_user=current_user.id, comment=new_comment)
    return CommentOut(
        id=comment.id,
        username=current_user.username,
        body=comment.body,
        date=comment.date,
        rating=comment.rating,
        stay_length=comment.stay_length,
        polarity=comment.polarity,
    )


@router.get('/comments/{city_id}', dependencies=[Depends(get_current_user)])
async def comment_list(
    session: SessionDep,
    city_id: int,
) -> List[CommentOut]:
    """
    Get a list of comments for the city identified by city_id.

    :param city_id: city id
    :return: list of comments
    """
    comments = get_city_comments(session=session, city_id=city_id)

    return [
        CommentOut(
            id=comment.id,
            username=username,
            date=comment.date,
            body=comment.body,
            rating=comment.rating,
            stay_length=comment.stay_length,
            polarity=comment.polarity,
        )
        for comment, username in comments
    ]
