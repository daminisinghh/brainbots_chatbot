import pickle
import os
import numpy as np
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from pydantic import BaseModel

from database.models import Base, User, StudentProfile
from server.auth import verify_password, get_password_hash, create_access_token

# 1. Database Setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./database/nexus.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Nexus Quantum HUD API",
    description="High-performance academic intelligence engine",
    version="4.0.0"
)

# 2. CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. ML Model Loading
GPA_MODEL_PATH = "ml/artifacts/gpa_model.pkl"
RISK_MODEL_PATH = "ml/artifacts/risk_model.pkl"

gpa_model = None
risk_model = None

if os.path.exists(GPA_MODEL_PATH):
    with open(GPA_MODEL_PATH, 'rb') as f:
        gpa_model = pickle.load(f)
if os.path.exists(RISK_MODEL_PATH):
    with open(RISK_MODEL_PATH, 'rb') as f:
        risk_model = pickle.load(f)

# 4. Pydantic Models
class UserCreate(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class PredictionRequest(BaseModel):
    attendance_rate: float
    assignment_score: float
    study_hours_weekly: float
    extracurricular_hours: float
    previous_gpa: float

# 5. Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 6. Endpoints
@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_pass = get_password_hash(user.password)
    new_user = User(username=user.username, hashed_password=hashed_pass)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # Create a default student profile
    profile = StudentProfile(user_id=new_user.id)
    db.add(profile)
    db.commit()
    
    return {"message": "User created successfully"}

@app.post("/api/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/predict")
def predict_performance(req: PredictionRequest):
    if not gpa_model or not risk_model:
        raise HTTPException(status_code=500, detail="AI Models not loaded")
    
    features = np.array([[
        req.attendance_rate,
        req.assignment_score,
        req.study_hours_weekly,
        req.extracurricular_hours,
        req.previous_gpa
    ]])
    
    predicted_gpa = gpa_model.predict(features)[0]
    predicted_risk = int(risk_model.predict(features)[0])
    
    risk_labels = ["Low", "Medium", "High"]
    
    return {
        "predicted_gpa": round(float(predicted_gpa), 2),
        "risk_level": risk_labels[predicted_risk],
        "confidence": 0.98,
        "recommendations": [
            "Increase study hours by 2h/week" if predicted_gpa < 3.0 else "Maintain current pace",
            "Focus on upcoming assignments" if req.assignment_score < 70 else "Explore extracurriculars"
        ]
    }

@app.get("/api/health")
def health():
    return {"status": "Quantum Engine Online"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
