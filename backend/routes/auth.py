from fastapi import APIRouter, HTTPException, Depends, status
from sqlmodel import Session

from backend.auth.encryption import hash_password, verify_password
from backend.auth.jwt import create_access_token
from backend.schemas.auth import TokenResponse, UserCreate, UserLogin
from backend.utils.auth import get_user_by_email
from backend.models.user import User
from backend.dependencies.session import get_session

auth_router = APIRouter(prefix="", tags=['Auth'])

@auth_router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, session: Session = Depends(get_session)):
    existing_email = get_user_by_email(email=user_data.email, session=session)
    if existing_email:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already taken")

    hashed_password = hash_password(password=user_data.password)
    new_user = User(email=user_data.email, hashed_password=hashed_password,username= user_data.username )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    token = create_access_token({"sub": str(new_user.id)})

    return {"access_token": token, "token_type": "bearer"}

@auth_router.post("/login", response_model=TokenResponse, status_code=status.HTTP_200_OK)
def login(user_data: UserLogin, session: Session = Depends(get_session)):

    user = get_user_by_email(email=user_data.email, session=session)

    if (
        not user
        or not user.hashed_password or not
        verify_password(password=user_data.password,hashed_password=user.hashed_password )
    ):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}

