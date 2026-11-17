import joblib
import pandas as pd

from pathlib import Path
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(
    title="Campus Crowd Prediction API",
    description="Random Forest based campus crowd prediction service",
    version="1.0.0",
)

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models" / "random_forest_crowd.joblib"

FACILITY_CAPACITIES = {
    "Central Library": 80,
    "Campus Cafeteria": 120,
    "Administration Block": 35,
    "Main Academic Block": 150,
    "Medical Center": 20,
    "Hostel Block A": 100,
}

model = None


class CrowdRequest(BaseModel):
    day_of_week: int = Field(ge=0, le=6, description="Monday=0, Sunday=6")
    hour: int = Field(ge=0, le=23)
    facility: str
    previous_occupancy: int = Field(ge=0)
    event: bool = False


@app.on_event("startup")
def load_model():
    global model

    if MODEL_PATH.exists():
        model = joblib.load(MODEL_PATH)


@app.get("/")
def home():
    return {
        "message": "Campus Crowd Prediction API is running",
        "model_loaded": model is not None,
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model_loaded": model is not None,
    }


@app.post("/predict-crowd")
def predict_crowd(request: CrowdRequest):
    if model is None:
        raise HTTPException(
            status_code=503,
            detail="Model not found. Train the model first.",
        )

    if request.facility not in FACILITY_CAPACITIES:
        raise HTTPException(
            status_code=400,
            detail="Unknown facility. Please provide a supported campus facility.",
        )

    input_data = pd.DataFrame([{
        "day_of_week": request.day_of_week,
        "hour": request.hour,
        "facility": request.facility,
        "previous_occupancy": request.previous_occupancy,
        "event": int(request.event),
    }])

    prediction = float(model.predict(input_data)[0])

    capacity = FACILITY_CAPACITIES[request.facility]
    estimated_occupancy = max(0, min(round(prediction), capacity))
    crowd_percentage = (estimated_occupancy / capacity) * 100

    if crowd_percentage < 35:
        crowd_level = "Low"
    elif crowd_percentage < 70:
        crowd_level = "Medium"
    else:
        crowd_level = "High"

    return {
        "facility": request.facility,
        "estimated_occupancy": estimated_occupancy,
        "facility_capacity": capacity,
        "crowd_percentage": round(crowd_percentage, 2),
        "crowd_level": crowd_level,
        "data_type": "synthetic_demo",
        "note": "Demonstration prediction based on synthetic training data.",
    }
