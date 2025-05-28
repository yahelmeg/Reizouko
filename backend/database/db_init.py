from sqlmodel import SQLModel
from backend.database.db_config import engine

def reset_database():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)