from pydantic import BaseModel
from typing import Optional

class JLPTKanjiResponse(BaseModel):
    kanji: str
    meaning: str
    onyomi: Optional[str] = ""
    kunyomi: Optional[str] = ""
    jlpt_level: str