from fastapi import APIRouter, Depends
from typing import List

router = APIRouter()

from app.api.deps import (
    SessionDep,
    CurrentUser, 
    get_current_superuser,
    get_current_user
)
from app.models.tag import Tag, Tags, CityTagOut
from app.crud.tag import (
    create_user_tag,
    create_city_tag,
    search_user_tags,
    search_all_user_tags,
    search_all_city_tags,
    search_city_assigned_tags,
    assign_user_tag,
    assign_tag_to_city,
    remove_user_tag,
)


@router.get('/usertag')
async def get_all_user_tags(session: SessionDep) -> List[Tag]:
    tags = search_all_user_tags(session=session)
    return [Tag(name=tag.name) for tag in tags]


@router.post('/usertag', dependencies=[Depends(get_current_superuser)])
async def user_tag_creation(session: SessionDep, tag: Tag) -> Tag:
    user_tag = create_user_tag(session=session, new_tag=tag)
    return Tag(
        name=user_tag.name
    )


@router.get('/usertag/me')
async def get_current_user_tags(session: SessionDep, current_user: CurrentUser) -> Tags:
    tags = search_user_tags(session=session, user_id=current_user.id)
    print(tags)
    tag_list = [Tag(name=tag.name) for tag in tags]
    return Tags(
        tags=tag_list
    )


@router.patch('/usertag/me/add')
async def add_tag_to_user(session: SessionDep, current_user: CurrentUser, new_tags: Tags) -> List[Tag]:
    added_tags = []
    for tag in new_tags.tags:
        added_tag = assign_user_tag(session=session, user_id=current_user.id, tag_name=tag.name)
        if added_tag:
            added_tags.append(Tag(
                name=added_tag.name
            ))
    return added_tags


@router.patch('/usertag/me/remove')
async def remove_tag_from_user(session: SessionDep, current_user: CurrentUser, tags: Tags) -> List[Tag]:
    removed_tags = []
    for tag in tags.tags:
        removed_tag = remove_user_tag(session=session, user_id=current_user.id, tag_name=tag.name)
        if removed_tag:
            removed_tags.append(
                Tag(
                    name=removed_tag.name
                )
            )
    return removed_tags


@router.post('/citytag', dependencies=[Depends(get_current_superuser)])
async def city_tag_creation(session: SessionDep, tag: Tag) -> Tag:
    city_tag = create_city_tag(session=session, new_tag=tag)
    return Tag(
        name=city_tag.name
    )


@router.get('/citytag')
async def get_all_city_tags(session: SessionDep) -> List[Tag]:
    city_tags = search_all_city_tags(session=session)
    return [Tag(name=tag.name) for tag in city_tags]


@router.get('/citytag/{city_id}', dependencies=[Depends(get_current_user)])
async def get_city_tags(session: SessionDep, city_id: int) -> List[CityTagOut]:
    """
    Get city tags assigned to a city
    """
    tags_assigned = search_city_assigned_tags(session=session, city_id=city_id)
    return [CityTagOut(name=tag_name, count=assigned.count) for assigned, tag_name in tags_assigned] 


@router.patch('/citytag/{city_id}', dependencies=[Depends(get_current_user)])
async def assign_citytags(session: SessionDep, city_id: int, city_tags: Tags) -> List[CityTagOut]:
    """
    Assign a list of tags to a city.
    """
    assignations = []

    for tag in city_tags.tags:
        assigned_tag = assign_tag_to_city(session=session, city_id=city_id, new_tag=tag)
        if assigned_tag:
            assignations.append(assigned_tag)

    return assignations
