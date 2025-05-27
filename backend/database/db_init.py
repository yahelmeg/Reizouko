from sqlmodel import SQLModel
from db_config import engine

def create_tables():
    SQLModel.metadata.create_all(engine)