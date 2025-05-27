from sqlmodel import Session, select
from backend.models.user import User
from pydantic import EmailStr

def email_exists(email: EmailStr, session : Session ) -> bool:
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    if user:
        return True
    return False

def get_user_by_id( user_id: int, session : Session ) -> User:
    statement = select(User).where(User.id == user_id)
    user = session.exec(statement).first()
    return user

def get_user_by_email( email: EmailStr, session : Session ) -> User:
    statement = select(User).where(User.email == email)
    user = session.exec(statement).first()
    return user