from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database.db import get_db
from ..models.appointment import Appointment

router = APIRouter()


@router.post("/appointment")
def create_appointment(
        patient_name: str,
        doctor_name: str,
        date: str,
        db: Session = Depends(get_db)
):

    appointment = Appointment(
        patient_name=patient_name,
        doctor_name=doctor_name,
        date=date
    )

    db.add(appointment)

    db.commit()

    db.refresh(appointment)

    return {"message": "Appointment created"}


@router.get("/appointments")
def get_appointments(db: Session = Depends(get_db)):

    appointments = db.query(Appointment).all()

    return appointments