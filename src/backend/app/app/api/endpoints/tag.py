from fastapi import APIRouter, Depends
from typing import Any

router = APIRouter()

from app.api.deps import (
    SessionDep,
    get_current_superuser
)
from app.models.tag import Tag, Tags
from app.crud.tag import (
    create_user_tag,
    get_all_user_tags,
)

@router.post('/usertag', dependencies=[Depends(get_current_superuser)])
async def user_tag_create(session: SessionDep, tag: Tag) -> Any:
    return create_user_tag(session=session, new_tag=tag)

@router.get('/usertag')
async def user_tag_get_all(session: SessionDep) -> Any:
    return get_all_user_tags(session=session);