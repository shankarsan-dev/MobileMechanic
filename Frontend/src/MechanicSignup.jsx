import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const server = 'http://localhost:5000';
const CustomerSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');
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
    tempErrors.phoneNumber = phoneNumber ? '' : 'Phone number is required.';
    tempErrors.gender = gender ? '' : 'Gender is required.';
    tempErrors.address = address ? '' : 'Address is required.';

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (email && !emailPattern.test(email)) {
      tempErrors.email = 'Email is not valid.';
    }

    const phonePattern = /^\d{10}$/;
    if (phoneNumber && !phonePattern.test(phoneNumber)) {
      tempErrors.phoneNumber = 'Phone number must be exactly 10 digits and only contain numbers.';
    }

    const namePattern = /^[A-Z][a-z]*$/;
    if (firstName && !namePattern.test(firstName)) {
      tempErrors.firstName = 'First name must start with a capital letter and contain only letters.';
    }
    if (lastName && !namePattern.test(lastName)) {
      tempErrors.lastName = 'Last name must start with a capital letter and contain only letters.';
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
      axios.post(server+'/api/mechanics/signup', {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        gender,
        address,
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
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-md w-full bg-slate-100 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Mechanic SignUp</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
          </div>
          {errors.apiError && <p className="text-red-600 text-sm mt-1">{errors.apiError}</p>}
          {success && <p className="text-green-600 text-sm mt-1">{success}</p>}
          <button type="submit" className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:bg-red-700">
            Sign Up
          </button>
          <div className="text-center mt-4">
            <Link to="/mechanic-login" className="text-blue-500 hover:underline">Already have an account? Login here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerSignup;
