import pandas as pd
import numpy as np
import os

def generate_student_data(num_samples=50000):
    np.random.seed(42)
    
    # 1. Base features
    attendance_rate = np.random.uniform(0.4, 1.0, num_samples)
    assignment_score = np.random.uniform(30, 100, num_samples)
    study_hours_weekly = np.random.uniform(2, 40, num_samples)
    extracurricular_hours = np.random.uniform(0, 20, num_samples)
    previous_gpa = np.random.uniform(1.5, 4.0, num_samples)
    
    # 2. Logic for Predicted GPA (Synthetic Ground Truth)
    # GPA is influenced by attendance, scores, and study hours.
    noise = np.random.normal(0, 0.1, num_samples)
    target_gpa = (
        (attendance_rate * 1.5) + 
        (assignment_score / 100 * 1.5) + 
        (study_hours_weekly / 40 * 1.0) 
    ) / 4.0 * 4.0 # Scale to 4.0
    
    target_gpa = np.clip(target_gpa + noise, 0, 4.0)
    
    # 3. Logic for Risk Level
    # Risk is high if attendance is low OR scores are low.
    risk_score = (1 - attendance_rate) * 0.6 + (1 - (assignment_score/100)) * 0.4
    risk_level = []
    for score in risk_score:
        if score > 0.45:
            risk_level.append(2) # High
        elif score > 0.25:
            risk_level.append(1) # Medium
        else:
            risk_level.append(0) # Low
            
    df = pd.DataFrame({
        'attendance_rate': attendance_rate,
        'assignment_score': assignment_score,
        'study_hours_weekly': study_hours_weekly,
        'extracurricular_hours': extracurricular_hours,
        'previous_gpa': previous_gpa,
        'target_gpa': target_gpa,
        'risk_level': risk_level
    })
    
    output_path = os.path.join('ml', 'student_data_large.csv')
    df.to_csv(output_path, index=False)
    print(f"Generated {num_samples} records at {output_path}")

if __name__ == "__main__":
    generate_student_data()
