from sqlmodel import SQLModel
from backend.database.db_config import engine
from backend.models.user import User
from backend.models.user_kanji import UserKanjiLink

def reset_database():
    SQLModel.metadata.create_all(engine)

    UserKanjiLink.__table__.drop(engine, checkfirst=True)
    User.__table__.drop(engine, checkfirst=True)

    User.__table__.create(engine)
    UserKanjiLink.__table__.create(engine)
