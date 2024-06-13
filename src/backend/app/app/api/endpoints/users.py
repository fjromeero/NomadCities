from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from typing import Any

from app.core.settings import settings
from app.api.deps import CurrentUser, SessionDep, get_current_user
from app.models.city import CityOut
from app.models.city_image import CityImage
from app.models.user import UserOnCreate, UserOut, UserOnUpdate, UserOnUpdatePassword
from app.models.token import Token
from app.crud.city import search_city_by_id
from app.crud.city_image import search_city_images
from app.crud.recommendations import get_user_suggested_cities
from app.crud.user import (
    create_user,
    search_user_by_username, 
    search_user_by_email,
    update_user_profile, 
    update_user_password,
    update_user_image,
)

from app.api.utils import (
    get_db,
    verify_password,
    create_access_token,
)

router = APIRouter()

@router.post("/signup")
async def signup(user_data: UserOnCreate, db: Session = Depends(get_db)):
    """
    Create new user
    """
    user = search_user_by_username(session=db, username=user_data.username)

    if user: 
        raise HTTPException(
            status_code=400,
            detail="This username is alredy linked to an account.",
        )
    
    user = search_user_by_email(session=db, email=user_data.email)
    
    if user:
        raise HTTPException(
            status_code=400,
            detail="This email is alredy linked to an account.",
        )
    
    user = create_user(session=db, user_create=user_data)

    return user.username

@router.post("/login")
async def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> Token:
    """
    OAuth2 compatible token login with users credentials, get an access token for future requests.
    """
    user = search_user_by_username(session=db, username=user_credentials.username)

    if not user or not verify_password(user_credentials.password, user.hashed_password):
        raise HTTPException(
            status_code= 401,
            detail= "Incorrect username or password.",
        )
    
    access_token_expires = timedelta(settings.ACCESS_TOKEN_EXPIRATION_MINUTES)

    return Token(
        access_token = create_access_token(
            user.id , expires_delta=access_token_expires
        )
    )

@router.get("/me")
async def me(current_user: CurrentUser) -> Any:
    """
    Get current user.
    """
    return UserOut(
        username=current_user.username,
        email=current_user.email,
        is_admin=current_user.is_admin,
    )

@router.get("/me/img")
async def me_img(current_user: CurrentUser) -> Any:
    return current_user.img

@router.post("/me/img")
async def update_me_img(session: SessionDep ,current_user: CurrentUser, image: UploadFile):
    try:
        path = "static/images/users/"+image.filename
        content = await image.read()
        with open(path, 'wb+') as destination:
            destination.write(content)
        update_user_image(session=session, user_id=current_user.id, path=path)
        return path
    except Exception as e:
        return {"error": str(e)}


@router.put("/me")
async def update_me(session: SessionDep ,current_user: CurrentUser, user_update: UserOnUpdate) -> Any:

    errors = {
        "username" : "",
        "email": "", 
    }

    if(user_update.username != current_user.username):
        user = search_user_by_username(session=session, username=user_update.username)

        if user: 
            errors["username"] = "This username is alredy linked to an account."
            raise HTTPException(
                status_code=400,
                detail=errors,
            )
    
    if(user_update.email != current_user.email):
        user = search_user_by_email(session=session, email=user_update.email)

        if user:
            errors["email"] = "This email is alredy linked to an account."
            raise HTTPException(
                status_code=400,
                detail=errors,
            )

    update_user_profile(session=session, user_id=current_user.id, changes=user_update)

@router.patch('/me/change-password')
async def change_password_me(session: SessionDep, current_user: CurrentUser, password_changes: UserOnUpdatePassword) -> Any:
    update_user_password(session=session, user_id=current_user.id, password_changes=password_changes)
    
    
@router.get('/me/recommendations', dependencies=[Depends(get_current_user)])
async def get_recommendations(session: SessionDep, current_user: CurrentUser) -> list[CityOut]:
    suggestions = get_user_suggested_cities(session=session, id_user=current_user.id)
    cities = []
    if suggestions:
        for suggestion in suggestions:
            city = search_city_by_id(session=session, city_id=suggestion.id_city)
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