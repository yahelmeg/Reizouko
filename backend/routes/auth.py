from fastapi import APIRouter, HTTPException, Depends, status, Response, Request
from sqlmodel import Session

from backend.auth.encryption import hash_password, verify_password
from backend.auth.jwt import create_access_token, create_refresh_token, verify_token, get_current_user
from backend.schemas.auth import TokenData,UserCreate, UserLogin
from backend.utils.auth import get_user_by_email, get_user_by_id
from backend.models.user import User
from backend.dependencies.session import get_session

auth_router = APIRouter(prefix="", tags=['Auth'])

@auth_router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, response: Response, session: Session = Depends(get_session)):
    existing_email = get_user_by_email(email=user_data.email, session=session)
    if existing_email:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email already taken")

    hashed_password = hash_password(password=user_data.password)
    new_user = User(email=user_data.email, hashed_password=hashed_password,username= user_data.username )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)

    access_token = create_access_token({"sub": str(new_user.id)})
    refresh_token = create_access_token({"sub": str(new_user.id)})

    response.set_cookie("access_token", access_token, httponly=True, secure=True, samesite="strict", max_age=900)
    response.set_cookie("refresh_token", refresh_token, httponly=True, secure=True, samesite="strict", max_age=604800)

    return {"message": "User registered successfully"}

@auth_router.post("/login", status_code=status.HTTP_200_OK)
def login(user_data: UserLogin, response: Response, session: Session = Depends(get_session)):

    user = get_user_by_email(email=user_data.email, session=session)

    if (
        not user
        or not user.hashed_password or not
        verify_password(password=user_data.password,hashed_password=user.hashed_password )
    ):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access_token = create_access_token({"sub": str(user.id)})
    refresh_token = create_refresh_token({"sub": str(user.id)})

    response.set_cookie("access_token", access_token, httponly=True, secure=True, samesite="strict", max_age=900)
    response.set_cookie("refresh_token", refresh_token, httponly=True, secure=True, samesite="strict", max_age=604800)

    return {"message": "Login successful"}

@auth_router.post("/refresh", status_code=status.HTTP_200_OK)
def refresh_token(request: Request, response: Response):
    token = request.cookies.get("refresh_token")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="missing refresh token")

    payload= verify_token(token)
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

    new_access_token = create_access_token({"sub": str(user_id)})

    response.set_cookie(
        key="access_token",
        value=new_access_token,
        httponly=True,
        secure=True,
        samesite="strict",
        max_age=900
    )

    return {"message": "Access token refreshed"}

@auth_router.post("/logout", status_code= status.HTTP_204_NO_CONTENT)
def logout( response: Response):
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"message": "Logged out successfully"}

@auth_router.get("/me", status_code= status.HTTP_200_OK)
def get_me(user: TokenData = Depends(get_current_user),  session: Session = Depends(get_session)):
    user = get_user_by_id(user_id=user.id, session=session)
    return {"id": user.id,"username": user.username}


