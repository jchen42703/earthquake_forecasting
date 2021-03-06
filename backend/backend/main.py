from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import all
from typing import List


def get_origins() -> List[str]:
    env = os.environ.get("ENV_TYPE")
    isProd = env == "production"

    if isProd:
        origins = ["https://earthquakedamageforecast.com/"]
    else:
        origins = [
            "http://localhost",
            "http://localhost:3006",
        ]
    print("origins: ", origins)
    return origins


def get_application(api_prefix: str) -> FastAPI:
    """Actually creates the FastAPI app

    From:
    https://github.com/nsidnev/fastapi-realworld-example-app/blob/master/app/main.py
    """

    application = FastAPI()

    application.add_middleware(
        CORSMiddleware,
        allow_origins=get_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.include_router(all.router, prefix=api_prefix)

    return application


app = get_application("/api")
