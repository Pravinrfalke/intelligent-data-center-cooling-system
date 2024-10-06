import numpy as np
import joblib
import sys
import json

# Load the model
model = joblib.load('../model/model.pkl')

# Check if input arguments are provided
if len(sys.argv) != 5:
    print("Usage: python predict.py <IT_Load_kW> <Outdoor_Temp_C> <Indoor_Temp_C> <Fan_Speed_RPM>")
    sys.exit(1)

# Read input arguments
IT_Load_kW = float(sys.argv[1])
Outdoor_Temp_C = float(sys.argv[2])
Indoor_Temp_C = float(sys.argv[3])
Fan_Speed_RPM = float(sys.argv[4])

# Prepare the input data
input_data = np.array([[IT_Load_kW, Outdoor_Temp_C, Indoor_Temp_C, Fan_Speed_RPM]])

# Make a prediction
predicted_water_flow = model.predict(input_data)

# Output the result as JSON
print(json.dumps({'Predicted_Water_Flow_GPM': predicted_water_flow[0]}))
