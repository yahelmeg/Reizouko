import math
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select, func
from fastapi.responses import JSONResponse

from backend.auth.jwt import get_current_user
from backend.models.jlpt_kanji import JLPTKanji
from backend.dependencies.session import get_session
from backend.models.user_kanji import UserKanjiLink
from backend.schemas.auth import TokenData
from backend.schemas.jlpt_kanji import PaginatedResponse

jlpt_kanji_router = APIRouter(prefix="/jlpt_kanji", tags=["JLPT_Kanji"])

@jlpt_kanji_router.get("", response_model=PaginatedResponse, status_code=status.HTTP_200_OK)
def get_all_kanji(offset: int = 0 , limit: int = 20, session: Session = Depends(get_session)):
    total = session.exec(select(func.count(JLPTKanji.id))).one()
    page = offset // limit
    statement = select(JLPTKanji).offset(offset).limit(limit)
    data = session.exec(statement).all()
    total_pages =  math.ceil(total / limit )
    return PaginatedResponse(
        data=data,
        total=total,
        page=page,
        limit=limit,
        total_pages=total_pages
    )

@jlpt_kanji_router.get("/level", response_model=PaginatedResponse, status_code=status.HTTP_200_OK)
def get_kanji_by_level(level: str,
                       offset: int = 0,
                       limit: int = 20,
                       session: Session = Depends(get_session)):
    valid_levels = ["n1", "n2", "n3", "n4", "n5"]
    jlpt_level = level.lower()
    if jlpt_level not in valid_levels:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JLPT level. Choose from n1–n5.")

    total = session.exec(
        select(func.count(JLPTKanji.id)).where(JLPTKanji.jlpt_level == jlpt_level)
    ).one()

    page = offset // limit
    total_pages = math.ceil(total / limit)

    statement = select(JLPTKanji).where(JLPTKanji.jlpt_level == jlpt_level).offset(offset).limit(limit)
    data = session.exec(statement).all()

    return PaginatedResponse(
        data=data,
        total=total,
        page=page,
        limit=limit,
        total_pages=total_pages
    )

@jlpt_kanji_router.get("/random", status_code=status.HTTP_200_OK)
def get_random_unlearned_kanji(
    level:str,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    valid_levels = ["n1", "n2", "n3", "n4", "n5"]
    jlpt_level = level.lower()
    if jlpt_level not in valid_levels:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JLPT level. Choose from n1–n5.")

    learned_id_stmt = select(UserKanjiLink.kanji_id).where(UserKanjiLink.user_id == current_user.id)
    statement = select(JLPTKanji).where(
        JLPTKanji.jlpt_level == jlpt_level).where(JLPTKanji.id.not_in(learned_id_stmt)).order_by(func.random()).limit(1)

    random_kanji = session.exec(statement).first()

    if not random_kanji:
        return JSONResponse(
            status_code=200,
            content={"detail": "You have learned all kanji of this level", "kanji": None}
        )

    return {"kanji": random_kanji}






