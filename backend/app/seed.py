from sqlalchemy.orm import Session
from faker import Faker
import random

from .database.db import SessionLocal
from .models.user import User
from .models.appointment import Appointment

fake = Faker()


def seed_data():

    db: Session = SessionLocal()

    # لو فيه بيانات خلاص
    if db.query(User).count() > 50:
        print("Database already seeded")
        db.close()
        return

    users = []
    appointments = []

    # create users
    for _ in range(100):

        user = User(
            name=fake.name(),
            email=fake.email(),
            password="123456"
        )

        users.append(user)

    db.add_all(users)
    db.commit()

    doctors = [
        "Dr. Ahmed",
        "Dr. Sara",
        "Dr. Ali",
        "Dr. Mohamed",
        "Dr. Youssef"
    ]

    # create appointments
    for _ in range(300):

        appointment = Appointment(
            patient_name=fake.name(),
            doctor_name=random.choice(doctors),
            date=str(fake.date_this_year())
        )

        appointments.append(appointment)

    db.add_all(appointments)
    db.commit()

    db.close()

    print("Database seeded with large dataset")