from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.db import engine, Base
from .routes import auth, appointments
from .seed import seed_data

import time
import logging
from sqlalchemy.exc import OperationalError

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Telemedicine API", root_path="/api")

# CORS FIX
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(appointments.router)


@app.on_event("startup")
def startup_event():
    retries = 5
    while retries > 0:
        try:
            logger.info("Attempting to connect to the database and create tables...")
            Base.metadata.create_all(bind=engine)
            logger.info("Database connection successful and tables created.")
            break
        except Exception as e:
            logger.error(f"Database connection failed: {e}")
            retries -= 1
            if retries == 0:
                logger.error("Could not connect to the database after multiple retries. Exiting...")
                raise Exception("Database connection failed")
            logger.info(f"Retrying in 5 seconds... ({retries} retries left)")
            time.sleep(5)
            
    seed_data()


@app.get("/")
def root():
    return {"message": "Telemedicine API Running"}