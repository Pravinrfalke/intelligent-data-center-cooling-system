import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-blue-500 flex flex-col justify-center items-center text-center">
      <h1 className="text-white text-5xl font-bold mb-6">Welcome to Data Center Cooling Predictor</h1>
      <p className="text-white text-xl mb-12">
        Predict water flow (GPM) based on your data center’s IT load, temperature, and fan speed.
      </p>
      <Link to="/predict" className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-blue-100 transition duration-300">
        Calculate
      </Link>
    </div>
  );
};

export default LandingPage;
