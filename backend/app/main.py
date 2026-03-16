from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.db import engine, Base
from .routes import auth, appointments
from .seed import seed_data

Base.metadata.create_all(bind=engine)

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
    seed_data()


@app.get("/")
def root():
    return {"message": "Telemedicine API Running"}