import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor, RandomForestClassifier
from sklearn.metrics import mean_squared_error, accuracy_score

def train_models():
    # 1. Load data
    data_path = os.path.join('ml', 'student_data_large.csv')
    df = pd.read_csv(data_path)
    
    X = df[['attendance_rate', 'assignment_score', 'study_hours_weekly', 'extracurricular_hours', 'previous_gpa']]
    y_gpa = df['target_gpa']
    y_risk = df['risk_level']
    
    # 2. Train/Test Split
    X_train, X_test, y_gpa_train, y_gpa_test = train_test_split(X, y_gpa, test_size=0.2, random_state=42)
    _, _, y_risk_train, y_risk_test = train_test_split(X, y_risk, test_size=0.2, random_state=42)
    
    print("Training Regressor for GPA...")
    regressor = RandomForestRegressor(n_estimators=100, random_state=42)
    regressor.fit(X_train, y_gpa_train)
    
    gpa_preds = regressor.predict(X_test)
    mse = mean_squared_error(y_gpa_test, gpa_preds)
    print(f"Regressor MSE: {mse:.4f}")
    
    print("Training Classifier for Risk Level...")
    classifier = RandomForestClassifier(n_estimators=100, random_state=42)
    classifier.fit(X_train, y_risk_train)
    
    risk_preds = classifier.predict(X_test)
    acc = accuracy_score(y_risk_test, risk_preds)
    print(f"Classifier Accuracy: {acc:.4f}")
    
    # 3. Save Models
    os.makedirs('ml/artifacts', exist_ok=True)
    with open('ml/artifacts/gpa_model.pkl', 'wb') as f:
        pickle.dump(regressor, f)
    with open('ml/artifacts/risk_model.pkl', 'wb') as f:
        pickle.dump(classifier, f)
        
    print("Models saved successfully in ml/artifacts/")

if __name__ == "__main__":
    train_models()
