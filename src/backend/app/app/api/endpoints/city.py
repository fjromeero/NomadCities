from fastapi import APIRouter, Depends
from typing import Any

from app.api.deps import get_current_superuser, SessionDep
from app.models.city import CityOnCreate
from app.crud.city import create_city

router = APIRouter()

@router.post('/city', dependencies=[Depends(get_current_superuser)])
async def city_create(session: SessionDep, city: CityOnCreate) -> Any:
    city_created = create_city(session=session, new_city=city)
    return city_created.name