from fastapi import APIRouter, Depends, UploadFile, File, Form
from typing import Any, List, Optional

from app.api.deps import get_current_user, get_current_superuser, CurrentUser, SessionDep
from app.models.city import CityOnCreate, CityInspect, CityOnUpdate, Cities, CityOut
from app.models.city_image import CityImage
from app.crud.city import create_city, search_city_by_id, update_city_data, get_all_cities
from app.crud.city_image import create_city_images, search_city_images
from app.crud.comment import can_post_comment
from app.crud.recommendations import get_city_suggested_cities
from app.classes.elasticsearch import ElasticSearch

router = APIRouter()

@router.post('/city', dependencies=[Depends(get_current_superuser)])
async def city_create(
    session: SessionDep,
    images: List[UploadFile] = File(...),
    city_data: CityOnCreate = Depends(CityOnCreate.as_form),
) -> Any:
    city_created = create_city(session=session, new_city=city_data)
    await create_city_images(session=session, city_id=city_created.id , images=images)
    await ElasticSearch.add_document(
        index_name='cities',
        id=city_created.id,
        document={
            'description': city_created.description,
        }
    )

    return city_created.id

@router.get('/city')
async def get_city(
    session: SessionDep,
    current_user: CurrentUser,
    city_id: int,
) -> Any:
    
    city = search_city_by_id(session=session, city_id=city_id)
    images = search_city_images(session=session, city_id=city_id)
    images_list = [CityImage(path=image.path) for image in images]


    return CityInspect(
        name=city.name,
        country=city.country,
        user_can_rate=can_post_comment(session=session, id_user=current_user.id, city_id=city.id),
        continent=city.continent,
        description=city.description,
        avg_rating = round(city.avg_rating,2),
        avg_price_per_month = round(city.avg_price_per_month, 2),
        avg_internet_connection = round(city.avg_internet_connection, 1),
        avg_coworking_spaces = round(city.avg_coworking_spaces, 1),
        avg_health_service = round(city.avg_health_service, 1),
        avg_safety = round(city.avg_safety, 1),
        avg_gastronomy = round(city.avg_gastronomy, 1),
        avg_means_of_transport = round(city.avg_means_of_transport, 1),
        avg_foreign_friendly = round(city.avg_foreign_friendly, 1),
        images=images_list,
    )

@router.put('/city/{id}', dependencies=[Depends(get_current_superuser)])
async def update_city(
    session: SessionDep,
    id: int,
    updated_data: CityOnUpdate = Depends(CityOnUpdate.as_form),
    newImages: Optional[List[UploadFile]] = File(None),
) -> Any:

    city = search_city_by_id(session=session, city_id=id)

    if city.description != updated_data.description:
        await ElasticSearch.update_document(
            index_name='cities',
            id=city.id,
            document={
                'description': updated_data.description,
            }
        )

    update_city_data(session=session, city_id=id, updated_data=updated_data)

    if newImages:
        await create_city_images(session=session, city_id=id, images=newImages)

@router.get('/cities')
async def cities(session: SessionDep) -> Cities:
    cities = get_all_cities(session=session)
    cities_list = []
    for city in cities:
        images = search_city_images(session=session, city_id=city.id)
        image_path = images[0].path if images else ''
        cities_list.append(
            CityOut(
                id= city.id,
                name=city.name,
                country=city.country,
                avg_rating= round(city.avg_rating,2),
                avg_price_per_month= round(city.avg_price_per_month, 2),
                image=CityImage(path=image_path),
            )
        )

    return Cities(cities=cities_list)


@router.get('/search')
async def search_city(
    session: SessionDep,
    query: str,
) -> list[CityOut]:
    city_ids = await ElasticSearch.search(index_name='cities', field='description', query_value=query)
    cities = []
    
    for city_id in city_ids:
        city = search_city_by_id(session=session, city_id=city_id)
        images = search_city_images(session=session, city_id=city_id)
        image_path = images[0].path if images else ''
        cities.append(
            CityOut(
                id= city.id,
                name=city.name,
                country=city.country,
                avg_rating= round(city.avg_rating,2),
                avg_price_per_month= round(city.avg_price_per_month, 2),
                image=CityImage(path=image_path),
            )
        )
        
    return cities


@router.get('/city/{id}/recommendations', dependencies=[Depends(get_current_user)])
async def get_city_recommendations(
    session: SessionDep,
    id: int,
)-> list[CityOut]:
    search_city_by_id(session=session, city_id=id)
    suggestions = get_city_suggested_cities(session=session, id_city=id)
    cities = []
    for suggestion in suggestions:
        city = search_city_by_id(session=session, city_id=suggestion.id_suggestion)
        images = search_city_images(session=session, city_id=city.id)
        image_path = images[0].path if images else ''
        cities.append(
            CityOut(
                id= city.id,
                name=city.name,
                country=city.country,
                avg_rating= round(city.avg_rating,2),
                avg_price_per_month= round(city.avg_price_per_month, 2),
                image=CityImage(path=image_path),
            )
        )
    return cities