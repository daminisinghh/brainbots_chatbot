from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    
    # Relationship to student data
    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)

class StudentProfile(Base):
    __tablename__ = "student_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    # Academic Features for AI
    attendance_rate = Column(Float, default=0.85)
    assignment_score = Column(Float, default=75.0)
    study_hours_weekly = Column(Float, default=15.0)
    extracurricular_hours = Column(Float, default=5.0)
    previous_gpa = Column(Float, default=3.2)
    
    user = relationship("User", back_populates="student_profile")
