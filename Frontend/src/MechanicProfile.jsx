import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const server = 'http://localhost:5000';

const DisplayProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const token = localStorage.getItem('token');
        const response = await axios.get(`${server}/api/mechanics/profile`, {
          headers: { Authorization: `Bearer ${token}` },    

        });
        setProfile({
          
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phoneNumber,
          address: response.data.address,
          profilePicture: response.data.profilePicture,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <main className="container mx-auto flex-grow p-8 flex justify-center items-center">
        <section className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Profile Information</h2>
          <div className="flex flex-col items-center mb-4">
            {profile.profilePicture && (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            )}
            <div className='text-center'>
              <p className="text-gray-700 font-bold text-xl">{profile.firstName} {profile.lastName}</p>
              <p className="text-gray-700">Email: {profile.email}</p>
              <p className="text-gray-700">Phone: {profile.phone}</p>
              <p className="text-gray-700">Address: {profile.address}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-red-600 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MobileMechanic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DisplayProfile;
