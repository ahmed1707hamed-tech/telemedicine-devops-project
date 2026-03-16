from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..database.db import get_db
from ..models.user import User

router = APIRouter()


class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str


@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):

    # check if email exists
    existing_user = db.query(User).filter(User.email == request.email).first()

    if existing_user:
        return {"error": "Email already registered"}

    user = User(
        name=request.name,
        email=request.email,
        password=request.password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User registered successfully",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }