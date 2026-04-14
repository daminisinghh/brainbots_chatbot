import pickle
import os
import numpy as np

class DummyModel:
    def __init__(self, mode='gpa'):
        self.mode = mode
    
    def predict(self, X):
        if self.mode == 'gpa':
            # Returns a value between 0 and 4.0
            return np.array([3.85])
        else:
            # Returns 0 (Low), 1 (Medium), or 2 (High)
            return np.array([0])

os.makedirs('ml/artifacts', exist_ok=True)

gpa_model = DummyModel(mode='gpa')
risk_model = DummyModel(mode='risk')

with open('ml/artifacts/gpa_model.pkl', 'wb') as f:
    pickle.dump(gpa_model, f)

with open('ml/artifacts/risk_model.pkl', 'wb') as f:
    pickle.dump(risk_model, f)

print("Dummy models generated successfully.")
