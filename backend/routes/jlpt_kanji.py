from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from backend.auth.jwt import get_current_user
from backend.models.jlpt_kanji import JLPTKanji
from backend.dependencies.session import get_session
from backend.models.user_kanji import UserKanjiLink
from backend.schemas.auth import TokenData
from backend.utils.auth import get_user_by_id

jlpt_kanji_router = APIRouter(prefix="/jlpt_kanji", tags=["JLPT_Kanji"])

@jlpt_kanji_router.get("", response_model=list[JLPTKanji], status_code=status.HTTP_200_OK)
def get_all_kanji(session: Session = Depends(get_session)):
    return session.exec(select(JLPTKanji)).all()

@jlpt_kanji_router.get("/{level}", response_model=list[JLPTKanji], status_code=status.HTTP_200_OK)
def get_kanji_by_level(level: str, session: Session = Depends(get_session)):
    valid_levels = ["n1", "n2", "n3", "n4", "n5"]
    jlpt_level = level.lower()
    if jlpt_level not in valid_levels:
        raise HTTPException(status_code=400, detail="Invalid JLPT level. Choose from n1–n5.")
    statement = select(JLPTKanji).where(JLPTKanji.jlpt_level == jlpt_level)
    return session.exec(statement).all()



