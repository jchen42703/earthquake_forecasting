from fastapi import FastAPI, Request
import fastapi
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import all

origins = [
    "http://localhost",
    "http://localhost:3006",
]


def get_application(api_prefix: str) -> FastAPI:
    """Actually creates the FastAPI app

    From:
    https://github.com/nsidnev/fastapi-realworld-example-app/blob/master/app/main.py
    """

    application = FastAPI()

    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(all.router, prefix=api_prefix)

    return application


app = get_application("/api")
