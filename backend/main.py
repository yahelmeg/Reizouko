import uvicorn
from fastapi import FastAPI

from backend.database.db_config import init_db
from backend.routes.auth import auth_router
from backend.config import BACK_PORT,BACK_DOMAIN


app = FastAPI()
routers = [auth_router]

for router in routers:
    app.include_router(router)

init_db()

if __name__ == "__main__":
    uvicorn.run(app, host=BACK_DOMAIN, port=BACK_PORT)