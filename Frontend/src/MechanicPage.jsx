// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MechMapComponent from './MechanicMapComponent';
// import MechanicNav from './MechanicNav';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const MechanicPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [showMap, setShowMap] = useState(false);

//   const token = localStorage.getItem('token');
//   const mechanicId = token ? jwtDecode(token).id : null;

//   useEffect(() => {
//     if (showMap && mechanicId) {
//       const updateLocation = () => {
//         navigator.geolocation.getCurrentPosition((position) => {
//           setLatitude(position.coords.latitude);
//           setLongitude(position.coords.longitude);

//           // Emit updated location to the server
//           socket.emit('MupdateLocation', {
//             mechanicId,
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//           });
//         }, (error) => {
//           console.error('Error getting location:', error);
//         });
//       };

//       // Update location initially and then every 30 seconds
//       updateLocation();
//       const locationInterval = setInterval(updateLocation, 30000);

//       // Notify server about mechanic's availability
//       socket.emit('MsetAvailable', mechanicId);

//       // Handle window close
//       const handleWindowClose = () => {
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };

//       window.addEventListener('beforeunload', handleWindowClose);

//       return () => {
//         window.removeEventListener('beforeunload', handleWindowClose);
//         clearInterval(locationInterval);
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };
//     }
//   }, [showMap, mechanicId]);

//   const handleCurrentRequestsClick = () => {
//     setShowMap(true);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <MechanicNav />
//       <main className="container mx-auto p-8">
//         {!showMap && (
//           <>
//             <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//               <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Mechanic!</h2>
//               <p className="text-gray-600">Here you can manage your services, view requests, and update your profile.</p>
//             </section>
//             <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white p-4 rounded-lg shadow-md" onClick={handleCurrentRequestsClick}>
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Current Requests</h3>
//                 <p className="text-gray-600">View and manage your current service requests.</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow-md">
//                 <h3 className="text-xl font-semibold text-gray-700 mb-2">Service History</h3>
//                 <p className="text-gray-600">Check your past service records.</p>
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
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
//             <MechMapComponent latitude={latitude} longitude={longitude} customers={customers} />
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MechanicPage;
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrected the import statement for jwtDecode
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MechanicMapComponent from "./MechanicMapComponent";
import MechanicNav from './MechanicNav';
import PopupForm from './PopupForm';

const server = 'http://localhost:5000';
const socket = io(server);

const MechanicPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const token = localStorage.getItem('token');
  const mechanicId = token ? jwtDecode(token).id : null;

  console.log('Mechanic ID:', mechanicId);

  useEffect(() => {
    if (showMap && mechanicId) {
      socket.emit('MsetAvailable', mechanicId);

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
    setShowPopup(true);
  };

  const handlePopupSave = async (charge) => {
    console.log('Saving charge:', charge);
    try {
      await axios.post(`${server}/api/mechanics/updateCharge`, {
        mechanicId,
        charge,
      });
      setShowPopup(false);
      setShowMap(true);
    } catch (error) {
      console.error('Error updating charge:', error);
    }
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
        {showMap && ( // Use conditional rendering
          <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
            <MechanicMapComponent />
          </section>
        )}
        {showPopup && (
          <PopupForm
            onClose={() => setShowPopup(false)}
            onSave={handlePopupSave}
          />
        )}
      </main>
    </div>
  );
};

export default MechanicPage;
