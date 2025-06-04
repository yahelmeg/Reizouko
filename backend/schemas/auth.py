from pydantic import BaseModel, EmailStr

class TokenData(BaseModel):
    id: int

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str

class UserInfo(BaseModel):
    id: int
    username: str
    email: EmailStr