import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PredictorForm = () => {
  const [formData, setFormData] = useState({
    IT_Load_kW: '',
    Outdoor_Temp_C: '',
    Indoor_Temp_C: '',
    Fan_Speed_RPM: '',
  });
  
  const [prediction, setPrediction] = useState(null); // New state for storing the prediction result
  const [error, setError] = useState(null); // State for error handling
  const navigate = useNavigate();

  // Handle form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch the prediction. Please try again.');
      }

      const result = await response.json();
      setPrediction(result.Predicted_Water_Flow_GPM); // Store the predicted water flow
      setError(null); // Reset any previous error
    } catch (err) {
      setError(err.message);
      setPrediction(null); // Reset the prediction if there's an error
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Navigate back to the landing page
  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Predict Water Flow (GPM)</h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        {/* IT Load Input */}
        <div className="mb-4">
          <label htmlFor="IT_Load_kW" className="block text-sm font-medium text-gray-700">
            IT Load (kW)
          </label>
          <input
            type="number"
            name="IT_Load_kW"
            value={formData.IT_Load_kW}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Outdoor Temperature Input */}
        <div className="mb-4">
          <label htmlFor="Outdoor_Temp_C" className="block text-sm font-medium text-gray-700">
            Outdoor Temperature (°C)
          </label>
          <input
            type="number"
            name="Outdoor_Temp_C"
            value={formData.Outdoor_Temp_C}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Indoor Temperature Input */}
        <div className="mb-4">
          <label htmlFor="Indoor_Temp_C" className="block text-sm font-medium text-gray-700">
            Indoor Temperature (°C)
          </label>
          <input
            type="number"
            name="Indoor_Temp_C"
            value={formData.Indoor_Temp_C}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Fan Speed Input */}
        <div className="mb-4">
          <label htmlFor="Fan_Speed_RPM" className="block text-sm font-medium text-gray-700">
            Fan Speed (RPM)
          </label>
          <input
            type="number"
            name="Fan_Speed_RPM"
            value={formData.Fan_Speed_RPM}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
          >
            Predict
          </button>

          {/* Back Button */}
          <button
            type="button"
            onClick={goBack}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-300"
          >
            Back
          </button>
        </div>
      </form>

      {/* Show Prediction Result or Error */}
      {prediction && (
        <div className="mt-6 text-lg font-bold text-green-600">
          Predicted Water Flow: {prediction.toFixed(2)} GPM
        </div>
      )}

      {error && (
        <div className="mt-6 text-lg font-bold text-red-600">
          Error: {error}
        </div>
      )}
    </div>
  );
};

export default PredictorForm;
