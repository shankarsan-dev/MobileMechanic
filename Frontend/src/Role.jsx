import React from 'react';
import { useNavigate } from 'react-router-dom';

const Role = () => {
  const navigate = useNavigate();

  const handleMechanicClick = () => {
    navigate('/mechanic-login'); // Adjust this path to your mechanic login route
  };

  const handleCustomerClick = () => {
    navigate('/customer-login'); // Path to your customer login route
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="text-center mb-10">
        <h1 className='size-max'>You are?</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-10 md:space-y-0 md:space-x-10">
        <div
          className="max-w-md max-h-md bg-red-500 p-5 hover:bg-red-300 text-center cursor-pointer"
          onClick={handleMechanicClick}
        >
          <img
            className="inline-block"
            src="src/assets/mechanic-2.png"
            alt="image not found"
          />
          <p>Mechanic</p>
        </div>
        <div
          className="max-w-md max-h-md bg-red-500 p-5 hover:bg-red-300 text-center cursor-pointer"
          onClick={handleCustomerClick}
        >
          <img
            className="inline-block"
            src="src/assets/working.png"
            alt="image not found"
          />
          <p>Customer</p>
        </div>
      </div>
    </div>
  );
};

export default Role;
