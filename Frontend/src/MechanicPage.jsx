import { jwtDecode } from 'jwt-decode'; // Corrected import
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MechMapComponent from './MechanicMapComponent';
import MechanicNav from './MechanicNav';

const server = 'http://localhost:5000';
const socket = io(server);

const MechanicPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [showMap, setShowMap] = useState(false);

  const token = localStorage.getItem('token');
  
  // Extract mechanic ID from token
  const mechanicId = token ? jwtDecode(token).id : null;
  console.log(mechanicId);

  useEffect(() => {
    if (showMap) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(longitude);
        // Notify server about availability
        if (mechanicId) {
          socket.emit('MsetAvailable', mechanicId);
        }
      }, (error) => {
        console.error('Error getting location:', error);
      });

      // Handle window close
      const handleWindowClose = () => {
        if (mechanicId) {
          socket.emit('MsetUnavailable', mechanicId);
        }
      };

      window.addEventListener('beforeunload', handleWindowClose);

      return () => {
        window.removeEventListener('beforeunload', handleWindowClose);
        if (mechanicId) {
          socket.emit('MsetUnavailable', mechanicId);
        }
      };
    }
  }, [showMap, mechanicId]);

  const handleCurrentRequestsClick = () => {
    setShowMap(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <MechanicNav />

      <main className="container mx-auto p-8">
        {!showMap && (
          <>
            <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Mechanic!</h2>
              <p className="text-gray-600">Here you can manage your services, view requests, and update your profile.</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md" onClick={handleCurrentRequestsClick}>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Current Requests</h3>
                <p className="text-gray-600">View and manage your current service requests.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Service History</h3>
                <p className="text-gray-600">Check your past service records.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Profile Settings</h3>
                <p className="text-gray-600">Update your profile information and preferences.</p>
              </div>
            </section>
          </>
        )}

        {showMap && latitude && longitude && (
          <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
            <MechMapComponent latitude={latitude} longitude={longitude} customers={customers} />
          </section>
        )}
      </main>
    </div>
  );
};

export default MechanicPage;
