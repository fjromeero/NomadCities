from fastapi import APIRouter
from app.api.endpoints import users, tag, city

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(tag.router)
api_router.include_router(city.router)