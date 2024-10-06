import numpy as np
import joblib
import sys
import json
import os
import pandas as pd

# Get the directory of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Load the model using an absolute path
model_path = os.path.join(current_dir, '../model/model.pkl')
model = joblib.load(model_path)

# Check if input arguments are provided
if len(sys.argv) != 5:
    print("Usage: python predict.py <IT_Load_kW> <Outdoor_Temp_C> <Indoor_Temp_C> <Fan_Speed_RPM>")
    sys.exit(1)

# Read input arguments
IT_Load_kW = float(sys.argv[1])
Outdoor_Temp_C = float(sys.argv[2])
Indoor_Temp_C = float(sys.argv[3])
Fan_Speed_RPM = float(sys.argv[4])

# Prepare the input data as a DataFrame with column names
input_data = pd.DataFrame([[IT_Load_kW, Outdoor_Temp_C, Indoor_Temp_C, Fan_Speed_RPM]],
                          columns=['IT_Load_kW', 'Outdoor_Temp_C', 'Indoor_Temp_C', 'Fan_Speed_RPM'])

# Make a prediction
predicted_water_flow = model.predict(input_data)

# Output the result as JSON
print(json.dumps({'Predicted_Water_Flow_GPM': predicted_water_flow[0]}))
