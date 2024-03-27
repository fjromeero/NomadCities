from fastapi import APIRouter, Depends, UploadFile, File, Form
from typing import Any, List, Optional

from app.api.deps import get_current_user ,get_current_superuser, SessionDep
from app.models.city import CityOnCreate, CityInspect, CityOnUpdate
from app.models.city_image import CityImage
from app.crud.city import create_city, search_city_by_id, update_city_data
from app.crud.city_image import create_city_images, search_city_images

router = APIRouter()

@router.post('/city', dependencies=[Depends(get_current_superuser)])
async def city_create(
    session: SessionDep,
    images: List[UploadFile] = File(...),
    city_data: CityOnCreate = Depends(CityOnCreate.as_form),
) -> Any:
    city_created = create_city(session=session, new_city=city_data)
    await create_city_images(session=session, city_id=city_created.id , images=images)

    return city_created.id

@router.get('/city', dependencies=[Depends(get_current_user)])
async def get_city(
    session: SessionDep,
    city_id: int,
) -> Any:
    
    city = search_city_by_id(session=session, city_id=city_id)
    images = search_city_images(session=session, city_id=city_id)
    images_list = [CityImage(path=image.path) for image in images]

    return CityInspect(
        name=city.name,
        country=city.country,
        continent=city.continent,
        description=city.description,
        avg_rating = city.avg_rating,
        avg_price_per_month = city.avg_price_per_month,
        avg_internet_connection = city.avg_internet_connection,
        avg_coworking_spaces = city.avg_coworking_spaces,
        avg_health_service = city.avg_health_service,
        avg_safety = city.avg_safety,
        avg_gastronomy = city.avg_gastronomy,
        avg_means_of_trasnsport = city.avg_means_of_trasnsport,
        avg_foreign_friendly = city.avg_foreign_friendly,
        images=images_list,
    )

@router.put('/city/{id}', dependencies=[Depends(get_current_superuser)])
async def update_city(
    session: SessionDep,
    id: int,
    updated_data: CityOnUpdate = Depends(CityOnUpdate.as_form),
    newImages: Optional[List[UploadFile]] = File(None),
) -> Any:
    update_city_data(session=session, city_id=id, updated_data=updated_data)
    if newImages:
        await create_city_images(session=session, city_id=id, images=newImages)