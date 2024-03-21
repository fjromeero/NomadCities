from sqlalchemy.orm import Session
from typing import Any, List
from fastapi import UploadFile

from app.db.models.city_image import CityImage
from app.crud.city import search_city_by_name

async def create_city_images(*, session: Session, city_name: str, images: List[UploadFile]) -> Any:
    for image in images:
        await create_city_image(session=session, city_name=city_name, image=image)

async def create_city_image(*, session: Session, city_name: str, image: UploadFile) -> Any:
    city = search_city_by_name(session=session, city_name=city_name)
    if city:
        try:
            path = "static/images/cities/"+image.filename
            content = await image.read()
            with open(path, 'wb+') as destination:
                destination.write(content)

            city_image = CityImage(
                id_city = city.id,
                path = path,
            )
            session.add(city_image)
            session.commit()
            session.refresh(city_image)
        except Exception as e:
            return {"error": str(e)}
