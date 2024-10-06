import numpy as np
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression

# Load the dataset
data = pd.read_csv('../dataset/DataCenterCoolingData.csv')

# Define features and target variable
X = data[['IT_Load_kW', 'Outdoor_Temp_C', 'Indoor_Temp_C', 'Fan_Speed_RPM']]
y = data['Water_Flow_GPM']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, '../model/model.pkl')

print("Model trained and saved as model.pkl")
