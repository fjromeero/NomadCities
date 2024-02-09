from fastapi import APIRouter
from typing import Any

router = APIRouter()

from app.api.deps import SessionDep, CurrentSuperUser
from app.models.tag import Tag
from app.crud.tag import (
    create_user_tag,
    get_all_user_tags
)

@router.post('/usertag/create')
async def user_tag_create(session: SessionDep, current_superuser: CurrentSuperUser, tag: Tag) -> Any:
    return create_user_tag(session=session, new_tag=tag)

@router.get('/usertag')
async def user_tag_get_all(session: SessionDep, current_superuser: CurrentSuperUser) -> Any:
    return get_all_user_tags(session=session);