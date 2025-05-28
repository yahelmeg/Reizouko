import uvicorn
from fastapi import FastAPI

from database.db_init import reset_database
from backend.routes.auth import auth_router
from backend.config import BACK_PORT,BACK_DOMAIN
from backend.routes.jlpt_kanji import jlpt_kanji_router
from backend.routes.user_kanji import user_kanji_router


app = FastAPI()
routers = [auth_router, jlpt_kanji_router, user_kanji_router]

for router in routers:
    app.include_router(router)

# reset_database()

if __name__ == "__main__":
    uvicorn.run(app, host=BACK_DOMAIN, port=BACK_PORT)