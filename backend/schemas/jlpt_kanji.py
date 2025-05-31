from pydantic import BaseModel
from typing import Sequence
from backend.models.jlpt_kanji import JLPTKanji

class PaginatedResponse(BaseModel):
    data: Sequence[JLPTKanji]
    total: int
    page: int
    limit: int
    total_pages: int