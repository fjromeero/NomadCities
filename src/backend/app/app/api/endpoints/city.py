from fastapi import APIRouter, Depends, UploadFile, File, Form
from typing import Any, List

from app.api.deps import get_current_superuser, SessionDep
from app.models.city import CityOnCreate
from app.crud.city import create_city
from app.crud.city_image import create_city_images

router = APIRouter()

@router.post('/city', dependencies=[Depends(get_current_superuser)])
async def city_create(
    session: SessionDep,
    images: List[UploadFile] = File(...),
    city_data: CityOnCreate = Depends(CityOnCreate.as_form),
) -> Any:
    city_created = create_city(session=session, new_city=city_data)
    await create_city_images(session=session, city_name=city_created.name, images=images)

    return city_created.name