from sqlmodel import SQLModel, Field
from typing import Optional


class JLPTKanji(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    kanji: str
    meaning: str
    onyomi: Optional[str]
    kunyomi: Optional[str]
    jlpt_level: str