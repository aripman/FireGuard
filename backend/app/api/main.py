from fastapi import APIRouter

from app.api.routes import items, login, private, users, utils
from app.core.config import settings
from app.api.stedsnavn import router as stedsnavn_router
#from app.api.frcmAPI import router as frcmapi_router
from fastapi import FastAPI

api_router = APIRouter()
api_router.include_router(login.router)
api_router.include_router(users.router)
api_router.include_router(utils.router)
api_router.include_router(items.router)


api_router.include_router(stedsnavn_router, prefix="/geonorge")

if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router)



