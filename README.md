# 🎯 Habits vs Marks — Predicting Student Exam Performance

## 📌 Overview
**Habits vs Marks** is a Machine Learning web application that predicts a student's **exam score** based on their lifestyle habits, study patterns, and personal circumstances.  
It’s built with a **FastAPI** backend for ML inference and a **React.js** frontend for a clean, interactive UI.

The goal?  
To explore how daily habits like **study time**, **sleep**, **exercise**, and even **Netflix usage** influence academic performance.

---

## 🧠 Inspiration
We’ve all heard advice like _"Sleep early"_ or _"Cut down on social media"_. But how much do these actually matter for marks?  
This project takes real-world data, trains a regression model, and lets users simulate different lifestyles to **instantly see predicted marks**.

---

## ⚙️ Tech Stack

**Machine Learning**
- **Python**
- **Pandas**, **NumPy** — data handling
- **Scikit-learn** — model building & evaluation (Lasso Regression)
- **Joblib** — saving/loading trained pipeline

**Backend**
- **FastAPI** — lightweight, high-performance API
- **pydantic** — request validation
- **CORS Middleware** — enable frontend-backend communication

**Frontend**
- **React.js** — dynamic UI
- **Vite** — fast dev server & build tool
- **Fetch API** — sending data to FastAPI backend

---


---

## 📊 Features
✅ **Interactive Input Form** — enter age, gender, study hours, lifestyle choices, and more  
✅ **Instant Prediction** — backend calculates score using trained ML model  
✅ **Score Normalization** — outputs score between **0–100**  
✅ **Validation** — backend ensures only valid categorical options are accepted  
✅ **CORS-Enabled** — smooth frontend-backend communication

---

## 🛠 How It Works

### 1. Data Preprocessing & Model Training (`habits_vs_marks.ipynb`)
- Loaded dataset of students’ habits and exam scores
- Handled categorical encoding & scaling
- Trained **Lasso Regression** to avoid overfitting
- Evaluated model performance with accuracy metrics
- Saved entire preprocessing + model pipeline with `joblib`

### 2. Backend API (`app.py`)
- Loads trained model pipeline at startup
- Accepts POST requests at `/predict` with student details
- Validates categorical fields (e.g., `"gender"` must be `"Male"`, `"Female"`, or `"Other"`)
- Returns predicted score (scaled 0–100)

### 3. Frontend (`App.jsx`)
- User-friendly form for entering inputs
- Sends data to backend via Fetch API
- Displays prediction result dynamically

---

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/Habits_vs_Marks.git
cd Habits_vs_Marks
```
### 2️⃣ Backend 
```bash  
cd backend
pip install -r requirements.txt
uvicorn app:app --reload`
```
Runs on `http://127.0.0.1:8000` 
### 3️⃣ Frontend 
``` bash CopyEdit 
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`

## 📡 Example API Call

**POST** `http://127.0.0.1:8000/predict`

**Request JSON**
```json
{
  "age": 20,
  "gender": "Male",
  "study_hours_per_day": 3,
  "social_media_hours": 1.5,
  "netflix_hours": 1,
  "part_time_job": "No",
  "attendance_percentage": 92,
  "sleep_hours": 7,
  "diet_quality": "Good",
  "exercise_frequency": 3,
  "parental_education_level": "Bachelor",
  "internet_quality": "Good",
  "mental_health_rating": 8,
  "extracurricular_participation": "Yes"
}
```
**Response JSON**
```json
{
  "predicted_exam_score": 78.35
}
```

### 🛠 Technologies used
-Python (Pandas, Scikit-learn, Matplotlib, Joblib)
-FastAPI
-React + Vite
-Git & GitHub


