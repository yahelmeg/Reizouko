
import uvicorn
from fastapi import FastAPI

from database.db_init import reset_database
from backend.routes.auth import auth_router
from backend.config import BACK_PORT,BACK_DOMAIN, ALLOWED_ORIGINS
from backend.routes.jlpt_kanji import jlpt_kanji_router
from backend.routes.user_kanji import user_kanji_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
routers = [auth_router, jlpt_kanji_router, user_kanji_router]

for router in routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware, # type: ignore
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host=BACK_DOMAIN, port=BACK_PORT)