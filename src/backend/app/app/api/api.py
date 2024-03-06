from fastapi import APIRouter
from app.api.endpoints import users
from app.api.endpoints import tag

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(tag.router)