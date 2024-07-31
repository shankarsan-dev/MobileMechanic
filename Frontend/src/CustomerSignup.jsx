import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};
    tempErrors.firstName = firstName ? '' : 'First name is required.';
    tempErrors.lastName = lastName ? '' : 'Last name is required.';
    tempErrors.email = email ? '' : 'Email is required.';
    tempErrors.password = password ? '' : 'Password is required.';
    tempErrors.confirmPassword = confirmPassword ? '' : 'Confirm password is required.';
    
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (email && !emailPattern.test(email)) {
      tempErrors.email = 'Email is not valid.';
    }
    
    if (password && confirmPassword && password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match.';
    }
    
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post('http://localhost:5000/api/customers/signup', {
        firstName,
        lastName,
        email,
        password,
      })
      .then(response => {
        setSuccess('Signup successful!');
        setErrors({});
        navigate('/customer-page'); // Redirect to CustomerPage after successful signup
      })
      .catch(error => {
        setErrors({ ...errors, apiError: error.response?.data?.message || 'An error occurred' });
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Customer Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
          </div>
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
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          {errors.apiError && <p className="text-red-600 text-sm mt-1">{errors.apiError}</p>}
          {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:bg-red-700">
            Sign Up
          </button>
          <div className="text-center mt-4">
            <a href="" className="text-blue-600">Already have an account? Login here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
