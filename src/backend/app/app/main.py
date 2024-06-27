from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

from app.api.api import api_router
from app.classes.elasticsearch import ElasticSearch
from app.core.settings import settings

app = FastAPI()

@app.on_event("startup")
async def app_startup():
    await ElasticSearch.create_index("cities", settings.CITY_ANALISER)

@app.on_event("shutdown")
async def app_shutdown():
    await ElasticSearch.shutdown()

app.include_router(api_router)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )