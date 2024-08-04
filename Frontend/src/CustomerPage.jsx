// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import CustomerNav from './CustomerNav';
// import MapComponent from './MapComponent';

// const server =  'http://localhost:5000';
// const CustomerPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mechanics, setMechanics] = useState([]);
//   const [showMap, setShowMap] = useState(false);

//   useEffect(() => {
//     if (showMap) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);

//         try {
//           const response = await axios.get(server + '/api/mechanics/available', {
//             params: {
//               latitude: position.coords.latitude,
//               longitude: position.coords.longitude,
//             },
//           });
//           setMechanics(response.data);
//         } catch (error) {
//           console.error('Error fetching available mechanics:', error);
//         }
//       }, (error) => {
//         console.error('Error getting location:', error);
//       });
//     }
//   }, [showMap]);

//   const handleFindMechanicClick = () => {
//     setShowMap(true);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <CustomerNav />

//       <main className="container mx-auto p-8">
//         {!showMap && (
//           <>
//             <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//               <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Customer!</h2>
//               <p className="text-gray-600">Here you can find mechanics, view your requests, and update your profile.</p>
//             </section>

//             <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white p-4 rounded-lg shadow-md" onClick={handleFindMechanicClick}>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Find a Mechanic</h3>
//                 <p className="text-gray-600">Search for nearby mechanics and request services.</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Request History</h3>
//                 <p className="text-gray-600">Check your past service requests.</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Profile Settings</h3>
//                 <p className="text-gray-600">Update your profile information and preferences.</p>
//               </div>
//             </section>
//           </>
//         )}

//         {showMap && latitude && longitude && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Mechanics</h2>
//             <MapComponent latitude={latitude} longitude={longitude} mechanics={mechanics} />
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CustomerPage;
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import CustomerNav from './CustomerNav';
import MapComponent from './MapComponent';
const server = 'http://localhost:5000';
const socket = io(server);

const CustomerPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [showMap, setShowMap] = useState(false);
  //const [customerId, setCustomerId] = useState('');

  const token = localStorage.getItem('token');

  // Extract mechanic ID from token
  const customerId = token ? jwtDecode(token).id : null;
  console.log(customerId);

  useEffect(() => {
    if (showMap && customerId) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);

        try {
          const response = await axios.get(`${server}/api/customers/availableMech`, {
          });
          setMechanics(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching available mechanics:', error);
        }
      }, (error) => {
        console.error('Error getting location:', error);
      });

      // Emit event to set customer as available
      socket.emit('CsetAvailable', customerId); // Emit customerId to set as available

      // Socket.IO event handlers
      socket.on('updateMechanics', (updatedMechanics) => {
        setMechanics(updatedMechanics);
      });

      // Clean up on component unmount
      return () => {
        socket.emit('CsetUnavailable', customerId); // Emit event to set customer as unavailable on disconnect
        socket.off('updateMechanics');
      };
    }
  }, [showMap, customerId]);

  const handleFindMechanicClick = () => {
    setShowMap(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerNav />

      <main className="container mx-auto p-8">
        {!showMap && (
          <>
            <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Customer!</h2>
              <p className="text-gray-600">Here you can find mechanics, view your requests, and update your profile.</p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-md" onClick={handleFindMechanicClick}>
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
          </>
        )}

        {showMap && latitude && longitude && (
          <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Mechanics</h2>
            <MapComponent latitude={latitude} longitude={longitude} mechanics={mechanics} />
          </section>
        )}
      </main>
    </div>
  );
};

export default CustomerPage;