from fastapi import APIRouter

from app.api.routes import items, login, private, users, utils
from app.core.config import settings
from app.api.stedsnavn import router as stedsnavn_router
#from app.api.frcmAPI import router as frcmapi_router
from fastapi import FastAPI

api_router = APIRouter()
api_router.include_router(login.router, prefix="/login", tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(stedsnavn_router, prefix="/geonorge", tags=["locations"])

if settings.ENVIRONMENT == "local":
    api_router.include_router(private.router, prefix="/private", tags=["private"])



