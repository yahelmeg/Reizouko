from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from backend.dependencies.session import get_session
from backend.auth.jwt import get_current_user
from backend.utils.auth import get_user_by_id
from backend.schemas.auth import TokenData
from backend.models.jlpt_kanji import JLPTKanji
from backend.models.user_kanji import UserKanjiLink

user_kanji_router = APIRouter(prefix="/user/me/kanji", tags=["User_Kanji"])

@user_kanji_router.get("", response_model=list[JLPTKanji])
def get_learned_kanji(current_user: TokenData = Depends(get_current_user), session: Session = Depends(get_session)):
    user = get_user_by_id(current_user.id, session)
    statement = (select(JLPTKanji).join(UserKanjiLink).where(UserKanjiLink.user_id == user.id))
    return session.exec(statement).all()


@user_kanji_router.post("/{kanji_id}", status_code=status.HTTP_204_NO_CONTENT)
def mark_kanji_learned(
        kanji_id: int,
        current_user: TokenData = Depends(get_current_user),
        session: Session = Depends(get_session)
):
    user = get_user_by_id(user_id=current_user.id, session=session)
    statement = select(JLPTKanji).where(JLPTKanji.id == kanji_id)
    kanji = session.exec(statement).first()
    if not kanji:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Kanji not found")

    link = UserKanjiLink(user_id = user.id, kanji_id= kanji.id)
    session.add(link)
    session.commit()


@user_kanji_router.delete("/{kanji_id}", status_code=status.HTTP_204_NO_CONTENT)
def unmark_kanji_learned(
    kanji_id: int,
    current_user: TokenData = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    user = get_user_by_id(current_user.id, session)
    statement = select(UserKanjiLink).where(
            (UserKanjiLink.user_id == user.id) & (UserKanjiLink.kanji_id == kanji_id))
    link = session.exec(statement).first()

    if not link:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="not marked as learned")

    session.delete(link)
    session.commit()
