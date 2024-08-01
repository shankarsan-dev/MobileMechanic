import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MapComponent from './MapComponent';

const CustomerPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (showMap) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        try {
          const response = await axios.get('http://localhost:5000/api/mechanics', {
            params: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          });
          setMechanics(response.data);
        } catch (error) {
          console.error('Error fetching mechanics:', error);
        }
      }, (error) => {
        console.error('Error getting location:', error);
      });
    }
  }, [showMap]);

  const handleFindMechanicClick = () => {
    setShowMap(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-200">Home</a></li>
              <li><a href="#" onClick={handleFindMechanicClick} className="hover:text-gray-200">Find Mechanic</a></li>
              <li><a href="#" className="hover:text-gray-200">Profile</a></li>
              <li><a href="#" className="hover:text-gray-200">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Customer!</h2>
          <p className="text-gray-600">Here you can find mechanics, view your requests, and update your profile.</p>
        </section>

        {showMap && latitude && longitude && (
          <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Mechanics</h2>
            <MapComponent latitude={latitude} longitude={longitude} mechanics={mechanics} />
          </section>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md"  onClick={handleFindMechanicClick}>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Find a Mechanic</h3>
            <p className="text-gray-600">Search for nearby mechanics and request services.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Request History</h3>
            <p className="text-gray-600">Check your past service requests.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Profile Settings</h3>
            <p className="text-gray-600">Update your profile information and preferences.</p>
          </div>
        </section>
      </main>

      <footer className="bg-red-600 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MobileMechanic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerPage;
