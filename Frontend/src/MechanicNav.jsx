import React from 'react';
import { useNavigate } from 'react-router-dom';

const MechanicNav = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-red-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mechanic Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-gray-200">Home</a></li>
            <li><a href="#" className="hover:text-gray-200">Services</a></li>
            <li><a href="#" className="hover:text-gray-200">Profile</a></li>
            <li><a href="#" onClick={handleLogoutClick} className="hover:text-gray-200">Logout</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default MechanicNav;
