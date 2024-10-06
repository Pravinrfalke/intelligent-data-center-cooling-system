import { useState } from 'react';

const PredictorForm = () => {
  const [formData, setFormData] = useState({
    IT_Load_kW: '',
    Outdoor_Temp_C: '',
    Indoor_Temp_C: '',
    Fan_Speed_RPM: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setPrediction(result.Predicted_Water_Flow_GPM);
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred while making the prediction.');
    }
  };

  return (
    <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Predict Water Flow</h2>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="IT_Load_kW">IT Load (kW)</label>
        <input
          type="number"
          name="IT_Load_kW"
          value={formData.IT_Load_kW}
          onChange={handleChange}
          placeholder="Enter IT Load in kW"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="Outdoor_Temp_C">Outdoor Temp (°C)</label>
        <input
          type="number"
          name="Outdoor_Temp_C"
          value={formData.Outdoor_Temp_C}
          onChange={handleChange}
          placeholder="Enter Outdoor Temp in °C"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="Indoor_Temp_C">Indoor Temp (°C)</label>
        <input
          type="number"
          name="Indoor_Temp_C"
          value={formData.Indoor_Temp_C}
          onChange={handleChange}
          placeholder="Enter Indoor Temp in °C"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="Fan_Speed_RPM">Fan Speed (RPM)</label>
        <input
          type="number"
          name="Fan_Speed_RPM"
          value={formData.Fan_Speed_RPM}
          onChange={handleChange}
          placeholder="Enter Fan Speed in RPM"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 shadow-sm"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
      >
        Predict Water Flow
      </button>

      {prediction && (
        <div className="mt-6 p-4 bg-green-100 text-green-900 rounded-lg text-center">
          Predicted Water Flow (GPM): {prediction}
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-100 text-red-900 rounded-lg text-center">
          {error}
        </div>
      )}
    </form>
  );
};

export default PredictorForm;
