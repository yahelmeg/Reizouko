from sqlmodel import SQLModel, Field

class UserKanjiLink(SQLModel, table=True):
    user_id: int = Field(default=None, foreign_key="user.id", ondelete="CASCADE", primary_key=True)
    kanji_id: int = Field(default=None, foreign_key="jlptkanji.id", ondelete="CASCADE", primary_key=True)

