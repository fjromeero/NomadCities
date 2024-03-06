from fastapi import APIRouter, Depends
from typing import Any

router = APIRouter()

from app.api.deps import (
    SessionDep,
    CurrentUser, 
    get_current_superuser
)
from app.models.tag import Tag, Tags
from app.crud.tag import (
    create_user_tag,
    get_all_user_tags,
    search_current_user_tags,
    assign_tags_to_user,
    remove_tags_from_user,
)

@router.post('/usertag', dependencies=[Depends(get_current_superuser)])
async def user_tag_create(session: SessionDep, tag: Tag) -> Any:
    return create_user_tag(session=session, new_tag=tag)

@router.get('/usertag')
async def user_tag_get_all(session: SessionDep) -> Any:
    return get_all_user_tags(session=session);

@router.get('/usertag/me')
async def get_current_user_tags(session: SessionDep, current_user: CurrentUser) -> Any:
    tags=search_current_user_tags(session=session, current_user_id=current_user.id)
    tags_list = [Tag(name=item['tag_name']) for item in tags]

    # Inicializar una instancia de Tags con la lista de tags creada
    tags_instance = Tags(tags=tags_list)
    return tags_instance

@router.patch('/usertag/me/add')
async def add_tags_current_user(session: SessionDep, current_user: CurrentUser, new_tags: Tags) -> Any:
    added_tags = []
    for tag in new_tags.tags:
        tag = assign_tags_to_user(session=session, user_id=current_user.id, tag_name=tag.name)
        added_tags.append(tag.tag_name)
    return added_tags

@router.patch('/usertag/me/remove')
async def remove_tags_current_user(session: SessionDep, current_user: CurrentUser, tags: Tags) -> Any:
    removed_tags = []
    for tag in tags.tags:
        tag = remove_tags_from_user(session=session, user_id=current_user.id, tag_name=tag.name)
        removed_tags.append(tag)
    return removed_tags