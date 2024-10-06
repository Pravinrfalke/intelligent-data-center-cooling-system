# Data Center Cooling Prediction App

This is a web application for predicting water flow (GPM) in data centers using a Linear Regression model. The backend is built with **Node.js** and **Express**, and the machine learning model is implemented in **Python**. The frontend is built using **React** (with Vite) and **Tailwind CSS** for styling.

## Table of Contents
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Overview](#api-overview)
- [How to Run](#how-to-run)
- [Technologies Used](#technologies-used)

## Project Structure

```bash
    project-root/
    ├── backend/
    │   ├── dataset/
    │   │   └── DataCenterCoolingData.csv       # Dataset for reference
    │   ├── model/
    │   │   └── model.pkl                       # Trained model serialized using joblib
    │   ├── python-scripts/
    │   │   └── predict.py                      # Python script for making predictions
    │   ├── server.js                           # Express server file for API endpoints
    │   └── package.json                        # Backend dependencies
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── LandingPage.jsx             # Landing page component
    │   │   │   └── PredictorForm.jsx           # Form component to collect inputs for prediction
    │   │   ├── App.jsx                         # Main App component
    │   │   ├── index.css                       # Tailwind CSS
    │   │   └── main.jsx                        # Vite entry point
    │   ├── index.html                          # Main HTML template
    │   └── package.json                        # Frontend dependencies
    ├── README.md                               # Project documentation

 ```


## Backend Setup

1. **Install Dependencies**
   - Navigate to the `backend/` folder and run:
     ```bash
     npm install
     ```

2. **Prepare the Python Model**
   - Ensure that you have `model.pkl` and `predict.py` in the `python-scripts/` directory.
   - The Python environment should have the necessary dependencies installed:
     ```bash
     pip install -r requirements.txt
     ```
   - Train your model if needed using `model.py` and save it as `model.pkl`.

3. **Run the Backend**
   - To start the backend server, run:
     ```bash
     node server.js
     ```

## Frontend Setup

1. **Install Dependencies**
   - Navigate to the `frontend/` folder and run:
     ```bash
     npm install
     ```

2. **Run the Frontend**
   - To start the frontend React application, run:
     ```bash
     npm run dev
     ```
   - The app will be available at `http://localhost:3000`.

## API Overview

### Prediction Endpoint
- **Method**: `POST`
- **URL**: `/predict`
- **Request Body**: JSON with the following fields:
  ```json
  {
      "IT_Load_kW": 330,
      "Outdoor_Temp_C": 35,
      "Indoor_Temp_C": 25,
      "Fan_Speed_RPM": 1300
  }
- **Response Body**: JSON with the following fields:
  The backend API returns a JSON response with the predicted water flow in GPM:

    ```json
    {
        "Predicted_Water_Flow_GPM": 540.25
    }
