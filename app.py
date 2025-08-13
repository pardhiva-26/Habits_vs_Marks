from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StudentInput(BaseModel):
    age: int
    gender: str
    study_hours_per_day: float
    social_media_hours: float
    netflix_hours: float
    part_time_job: str
    attendance_percentage: float
    sleep_hours: float
    diet_quality: str
    exercise_frequency: int
    parental_education_level: str
    internet_quality: str
    mental_health_rating: int
    extracurricular_participation: str

# Load fitted pipeline
model = joblib.load("model/habits_vs_marks_pipeline.pkl")

@app.post("/predict")
def predict_score(data: StudentInput):
    try:
        allowed_values = {
            "gender": ["Male", "Female", "Other"],
            "part_time_job": ["Yes", "No"],
            "diet_quality": ["Poor", "Fair", "Good"],
            "internet_quality": ["Poor", "Average", "Good"],
            "extracurricular_participation": ["Yes", "No"],
            "parental_education_level": ["High School", "Bachelor", "Master", "no_education"]
        }

        # Validate categorical inputs
        for key, valid_options in allowed_values.items():
            value = getattr(data, key)
            if value not in valid_options:
                raise ValueError(f"Invalid value for '{key}'. Allowed: {valid_options}")

        # Convert to DataFrame
        df = pd.DataFrame([data.dict()])

        # Predict
        prediction = model.predict(df)[0]

        # Clamp between 0 and 100, round to 2 decimals
        prediction = round(max(0, min(100, float(prediction))), 2)

        return {"predicted_exam_score": prediction}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
