from sqlmodel import Session

from backend.database.db_config import engine

def get_session():
    with Session(engine) as session:
        yield session