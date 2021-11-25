from fastapi import APIRouter
from backend.routes import basic

router = APIRouter()
router.include_router(basic.router, tags=["test"], prefix="/test")
