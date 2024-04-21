from fastapi import APIRouter
from app.api.deps import CurrentUser, SessionDep
from app.models.comment import CommentOnCreate, CommentOut
from app.crud.comment import create_comment

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
    )
    