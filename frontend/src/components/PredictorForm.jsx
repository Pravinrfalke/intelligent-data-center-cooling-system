import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const PredictorForm = () => {
  const [formData, setFormData] = useState({
    IT_Load_kW: '',
    Outdoor_Temp_C: '',
    Indoor_Temp_C: '',
    Fan_Speed_RPM: '',
  });
  
  const [prediction, setPrediction] = useState(null); // State for storing the prediction result
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(false); // State for tracking loading
  const [notification, setNotification] = useState(''); // State for notification messages
  const navigate = useNavigate();

  // Handle form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading before fetching data
    setPrediction(null); // Reset previous prediction
    setError(null); // Reset any previous error

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
      setNotification('Prediction successful!'); // Notify success
    } catch (err) {
      setError(err.message);
      setNotification('An error occurred. Please check the inputs or try again later.'); // Notify error
    } finally {
      setLoading(false); // Stop loading after fetching data
      setTimeout(() => setNotification(''), 5000); // Remove notification after 5 seconds
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
    
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center ">
      <h1 className="text-3xl font-bold mb-6">Predict Water Flow (GPM)</h1>

      {/* Notification Message */}
      {notification && (
        <div className="mb-4 p-2 bg-blue-500 text-white font-semibold text-center rounded-lg">
          {notification}
        </div>
      )}

      {loading ? (
        // Loading Spinner
        <div className="flex justify-center items-center ">
          <svg
            className="animate-spin h-10 w-10 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <span className="ml-2 text-lg font-semibold text-gray-600">Loading...</span>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md" style={{ backgroundColor: 'lightgreen' }}> 
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
                placeholder='Enter In Range of 50 KW to 1000 KW .'
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
                placeholder='Enter In Range of 10 °C to 50°C .'
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
                placeholder='Enter In Range of 10 °C to 27°C .'
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
                placeholder='Enter In Range of 800 RPM to 2500 RPM'
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
        </>
      )}
    </div>
  );
};

export default PredictorForm;
