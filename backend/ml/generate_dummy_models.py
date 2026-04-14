import pickle
import os
import sys

# Add backend directory to sys.path for proper module resolution
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

from ml.common import DummyModel

# Ensure we save in the correct directory relative to this script
ARTIFACTS_DIR = os.path.join(BASE_DIR, 'ml', 'artifacts')
os.makedirs(ARTIFACTS_DIR, exist_ok=True)

gpa_model = DummyModel(mode='gpa')
risk_model = DummyModel(mode='risk')

with open(os.path.join(ARTIFACTS_DIR, 'gpa_model.pkl'), 'wb') as f:
    pickle.dump(gpa_model, f)

with open(os.path.join(ARTIFACTS_DIR, 'risk_model.pkl'), 'wb') as f:
    pickle.dump(risk_model, f)

print("Dummy models generated successfully using common.py.")
