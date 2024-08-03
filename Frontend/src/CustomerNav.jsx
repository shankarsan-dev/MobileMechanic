// CustomerNav.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerNav = () => {
  const navigate = useNavigate();

  const handleFindMechanicClick = () => {
    navigate('/customer-page'); // Redirect to the customer page
  };

  const handleProfileClick = () => {
    navigate('/customer-page/profile');
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to home or login page
  };

  return (
    <header className="bg-red-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Customer Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" onClick={() => navigate('/')} className="hover:text-gray-200">Home</a></li>
            <li><a href="#" onClick={handleFindMechanicClick} className="hover:text-gray-200">Find Mechanic</a></li>
            <li><a href="#" onClick={handleProfileClick} className="hover:text-gray-200">Profile</a></li>
            <li><a href="#" onClick={handleLogoutClick} className="hover:text-gray-200">Logout</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default CustomerNav;
