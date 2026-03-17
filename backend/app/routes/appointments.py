from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ..database.db import get_db
from ..models.appointment import Appointment

router = APIRouter()

class AppointmentCreate(BaseModel):
    patient_name: str
    doctor_name: str
    date: str


class AppointmentCreate(BaseModel):
    patient_name: str
    doctor_name: str
    date: str


@router.post("/appointment")
def create_appointment(
        appointment: AppointmentCreate,
        db: Session = Depends(get_db)
):

    new_appointment = Appointment(
        patient_name=appointment.patient_name,
        doctor_name=appointment.doctor_name,
        date=appointment.date
    )

    db.add(new_appointment)
    db.commit()
    db.refresh(new_appointment)

    return {"message": "Appointment created"}


@router.get("/appointments")
def get_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()
