from sqlmodel import SQLModel, Field
from typing import Optional

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, index= True)
    username: str
    email: str = Field(unique=True, nullable=False)
    hashed_password: str

