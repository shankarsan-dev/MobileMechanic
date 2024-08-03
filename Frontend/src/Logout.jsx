// src/Logout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/'); // Redirect to Role page
  }, [navigate]);

  return null; // No UI to render
};

export default Logout;
