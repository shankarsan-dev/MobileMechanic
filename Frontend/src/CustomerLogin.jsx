import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const server =  'http://localhost:5000';
const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? '' : 'Email is required.';
    tempErrors.password = password ? '' : 'Password is required.';
    
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (email && !emailPattern.test(email)) {
      tempErrors.email = 'Email is not valid.';
    }
    
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post(server+'/api/customers/login', {
        email,
        password,
      })
      .then(response => {
        localStorage.setItem('token', response.data.token);  // Store token in localStorage
        setSuccess('Login successful!');
        navigate('/customer-page'); // Redirect to the customer page
      })
      .catch(error => {
        setErrors({ ...errors, apiError: error.response ? error.response.data.message : 'Login failed' });
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="max-w-md w-full bg-slate-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Customer Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>
          {errors.apiError && <p className="text-red-600 text-sm mt-1">{errors.apiError}</p>}
          {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:bg-red-700">
            Login
          </button>
          <div className="text-center mt-4">
            <Link to="/customer-signup" className="text-blue-500 hover:underline">Create a new Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerLogin;
