// src/Logout.js
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    localStorage.removeItem('token'); // Remove token from localStorage
    history.push('/Role'); // Redirect to login page
  }, [history]);

  return null;
};

export default Logout;
