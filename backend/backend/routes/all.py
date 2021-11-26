from fastapi import APIRouter
from backend.routes import basic, predict

router = APIRouter()
router.include_router(basic.router, tags=["test"], prefix="/test")
router.include_router(predict.router, tags=["predict"])
