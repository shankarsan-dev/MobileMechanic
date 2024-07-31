
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
  return (<><div className='text-center' ><h1 className="">You are?</h1></div>
    <div className="flex justify-evenly mt-20" >
      <div className="max-w-md max-h-md bg-red-500 p-5  hover:bg-red-300 text-center" onClick={handleMechanicClick}>
        <img
          className="inline-block"
          src="src/assets/mechanic-2.png"
          alt="image not found"
        />
        <p>Mechanic</p>
      </div>
      <div className="max-w-md max-h-md bg-red-500 p-5 mt-10 md:mt-0 text-center hover:bg-red-300" onClick={handleCustomerClick}>
        <img
          className="inline-block"
          src="src/assets/working.png"
          alt="image not found"
        />
        <p className="">Customer</p>
        
      </div>
    </div>
    </>
  );
};

export default Role;
