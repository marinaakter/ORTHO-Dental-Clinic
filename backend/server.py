from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class AppointmentCreate(BaseModel):
    fullName: str
    phone: str
    email: Optional[str] = ""
    doctorId: str
    doctorName: str
    serviceId: str
    serviceName: str
    date: str
    timeSlot: str
    notes: Optional[str] = ""


class Appointment(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    fullName: str
    phone: str
    email: Optional[str] = ""
    doctorId: str
    doctorName: str
    serviceId: str
    serviceName: str
    date: str
    timeSlot: str
    notes: Optional[str] = ""
    status: Literal["pending", "confirmed", "cancelled"] = "pending"
    createdAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updatedAt: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class AppointmentStatusUpdate(BaseModel):
    status: Literal["confirmed", "cancelled"]

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


@api_router.post("/appointments", response_model=Appointment)
async def create_appointment(input: AppointmentCreate):
    now = datetime.now(timezone.utc)
    appointment_obj = Appointment(
        **input.model_dump(),
        status="pending",
        createdAt=now,
        updatedAt=now,
    )

    doc = appointment_obj.model_dump()
    doc["createdAt"] = doc["createdAt"].isoformat()
    doc["updatedAt"] = doc["updatedAt"].isoformat()

    _ = await db.appointments.insert_one(doc)
    return appointment_obj


@api_router.get("/appointments", response_model=List[Appointment])
async def get_appointments():
    appointments = await db.appointments.find({}, {"_id": 0}).to_list(1000)

    for appointment in appointments:
        if isinstance(appointment.get("createdAt"), str):
            appointment["createdAt"] = datetime.fromisoformat(appointment["createdAt"])
        if isinstance(appointment.get("updatedAt"), str):
            appointment["updatedAt"] = datetime.fromisoformat(appointment["updatedAt"])

    appointments.sort(key=lambda x: x.get("createdAt", datetime.min), reverse=True)
    return appointments


@api_router.patch("/appointments/{appointment_id}/status", response_model=Appointment)
async def update_appointment_status(appointment_id: str, input: AppointmentStatusUpdate):
    existing = await db.appointments.find_one({"id": appointment_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Appointment not found")

    now = datetime.now(timezone.utc).isoformat()
    await db.appointments.update_one(
        {"id": appointment_id},
        {"$set": {"status": input.status, "updatedAt": now}},
    )

    updated = await db.appointments.find_one({"id": appointment_id}, {"_id": 0})
    if isinstance(updated.get("createdAt"), str):
        updated["createdAt"] = datetime.fromisoformat(updated["createdAt"])
    if isinstance(updated.get("updatedAt"), str):
        updated["updatedAt"] = datetime.fromisoformat(updated["updatedAt"])
    return Appointment(**updated)


@api_router.delete("/appointments/{appointment_id}")
async def delete_appointment(appointment_id: str):
    result = await db.appointments.delete_one({"id": appointment_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return {"deleted": True, "id": appointment_id}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()