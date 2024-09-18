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
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'; // Corrected the import statement for jwtDecode
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MechanicMapComponent from "./MechanicMapComponent";
// import MechanicNav from './MechanicNav';
// import PopupForm from './PopupForm';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const MechanicPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const token = localStorage.getItem('token');
//   const mechanicId = token ? jwtDecode(token).id : null;

//   console.log('Mechanic ID:', mechanicId);

//   useEffect(() => {
//     if (showMap && mechanicId) {
//       socket.emit('MsetAvailable', mechanicId);

//       const handleWindowClose = () => {
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };

//       window.addEventListener('beforeunload', handleWindowClose);

//       return () => {
//         window.removeEventListener('beforeunload', handleWindowClose);
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };
//     }
//   }, [showMap, mechanicId]);

//   const handleCurrentRequestsClick = () => {
//     setShowPopup(true);
//   };

//   const handlePopupSave = async (charge) => {
//     console.log('Saving charge:', charge);
//     try {
//       await axios.post(`${server}/api/mechanics/updateCharge`, {
//         mechanicId,
//         charge,
//       });
//       setShowPopup(false);
//       setShowMap(true);
//     } catch (error) {
//       console.error('Error updating charge:', error);
//     }
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
//         {showMap && ( // Use conditional rendering
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
//             <MechanicMapComponent />
//           </section>
//         )}
//         {showPopup && (
//           <PopupForm
//             onClose={() => setShowPopup(false)}
//             onSave={handlePopupSave}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default MechanicPage;

//   import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MechanicMapComponent from "./MechanicMapComponent";
// import MechanicNav from './MechanicNav';
// import PopupForm from './PopupForm';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const MechanicPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const token = localStorage.getItem('token');
//   const mechanicId = token ? jwtDecode(token).id : null;

//   console.log('Mechanic ID:', mechanicId);

//   useEffect(() => {
//     if (showMap && mechanicId) {
//       socket.emit('MsetAvailable', mechanicId);

//       const handleWindowClose = () => {
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };

//       window.addEventListener('beforeunload', handleWindowClose);

//       return () => {
//         window.removeEventListener('beforeunload', handleWindowClose);
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };
//     }

//     // Listen for new requests
//     socket.on('newRequest', (data) => {
//       console.log('New request received:', data);
//     });

//     return () => {
//       // Clean up the listener on component unmount
//       socket.off('newRequest');
//     };
//   }, [showMap, mechanicId]);

//   const handleCurrentRequestsClick = () => {
//     setShowPopup(true);
//   };

//   const handlePopupSave = async (charge) => {
//     console.log('Saving charge:', charge);
//     try {
//       await axios.post(`${server}/api/mechanics/updateCharge`, {
//         mechanicId,
//         charge,
//       });
//       setShowPopup(false);
//       setShowMap(true);
//     } catch (error) {
//       console.error('Error updating charge:', error);
//     }
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
//         {showMap && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
//             <MechanicMapComponent />
//           </section>
//         )}
//         {showPopup && (
//           <PopupForm
//             onClose={() => setShowPopup(false)}
//             onSave={handlePopupSave}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default MechanicPage;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MechanicMapComponent from "./MechanicMapComponent";
// import MechanicNav from './MechanicNav';
// import PopupForm from './PopupForm';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const MechanicPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [customers, setCustomers] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const token = localStorage.getItem('token');
//   const mechanicId = token ? jwtDecode(token).id : null;

//   console.log('Mechanic ID:', mechanicId);

//   useEffect(() => {
//     socket.on('newRequest', (data) => {
//       console.log('New request received:', data);
//       alert(`New request received from ${data.customerId}. Request details: ${data.description}`);
//     });
//     // Log socket ID when the socket connects
//     socket.on('connect', () => {
//       console.log('Socket connected with ID:', socket.id);
//     });

//     if (showMap && mechanicId) {
//       socket.emit('MsetAvailable', mechanicId);

//       const handleWindowClose = () => {
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };

//       window.addEventListener('beforeunload', handleWindowClose);

//       return () => {
//         window.removeEventListener('beforeunload', handleWindowClose);
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };
//     }

 
  
//   }, [showMap, mechanicId]);

//   const handleCurrentRequestsClick = () => {
//     setShowPopup(true);
//   };

//   const handlePopupSave = async (charge) => {
//     console.log('Saving charge:', charge);
//     try {
//       await axios.post(`${server}/api/mechanics/updateCharge`, {
//         mechanicId,
//         charge,
//       });
//       setShowPopup(false);
//       setShowMap(true);
//     } catch (error) {
//       console.error('Error updating charge:', error);
//     }
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
//         {showMap && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
//             <MechanicMapComponent />
//           </section>
//         )}
//         {showPopup && (
//           <PopupForm
//             onClose={() => setShowPopup(false)}
//             onSave={handlePopupSave}
//           />
//         )}
//       </main>
//     </div>  
//   );
// };

// export default MechanicPage;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MechanicMapComponent from "./MechanicMapComponent";
// import MechanicNav from './MechanicNav';
// import PopupForm from './PopupForm';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const MechanicPage = () => {
//   const [showMap, setShowMap] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [requestData, setRequestData] = useState(null); // To store request data
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false); // To control the confirmation dialog

//   const token = localStorage.getItem('token');
//   const mechanicId = token ? jwtDecode(token).id : null;

//   useEffect(() => {
//     const handleNewRequest = (data) => {
//       console.log('New request received:', data);
//       setRequestData(data);
//       setShowConfirmDialog(true); // Show the confirmation dialog
//     };

//     // Log socket ID when the socket connects
//     socket.on('connect', () => {
//       console.log('Socket connected with ID:', socket.id);
//     });

//     // Attach the new request handler
//     socket.on('newRequest', handleNewRequest);

//     // Clean up socket events when component unmounts or dependencies change
//     return () => {
//       socket.off('newRequest', handleNewRequest);
//     };
//   }, []);

//   useEffect(() => {
//     if (showMap && mechanicId) {
//       socket.emit('MsetAvailable', mechanicId);

//       const handleWindowClose = () => {
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };

//       window.addEventListener('beforeunload', handleWindowClose);

//       return () => {
//         window.removeEventListener('beforeunload', handleWindowClose);
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };
//     }
//   }, [showMap, mechanicId]);

//   const handlePopupSave = async (charge) => {
//     console.log('Saving charge:', charge);
//     try {
//       await axios.post(`${server}/api/mechanics/updateCharge`, {
//         mechanicId,
//         charge,
//       });
//       setShowPopup(false);
//       setShowMap(true);
//     } catch (error) {
//       console.error('Error updating charge:', error);
//     }
//   };

//   const handleConfirm = async (accepted) => {
//     if (requestData) {
//       try {
//         const endpoint = accepted ? '/api/requests/accept' : '/api/requests/decline';
//         await axios.post(endpoint, {
//           requestId: requestData.serviceId,
//           mechanicId,
//         });
//         socket.emit('notifyCustomer', {
//           customerId: requestData.customerId,
//           message: `Your request has been ${accepted ? 'accepted' : 'declined'} by mechanic ${mechanicId}.`
//         });
//         alert(`Request ${accepted ? 'accepted' : 'declined'}.`);
//       } catch (error) {
//         console.error(`Error ${accepted ? 'accepting' : 'declining'} request:`, error);
//       }
//       setShowConfirmDialog(false);
//     }
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
//               <div className="bg-white p-4 rounded-lg shadow-md" onClick={() => setShowPopup(true)}>
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
//         {showMap && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
//             <MechanicMapComponent />
//           </section>
//         )}
//         {showPopup && (
//           <PopupForm
//             onClose={() => setShowPopup(false)}
//             onSave={handlePopupSave}
//           />
//         )}
//         {showConfirmDialog && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-xl font-semibold mb-4">New Request</h3>
//               <p>Request details: {requestData?.description}</p>
//               <div className="mt-4">
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
//                   onClick={() => handleConfirm(true)}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                   onClick={() => handleConfirm(false)}
//                 >
//                   Decline
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MechanicPage;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MechanicMapComponent from "./MechanicMapComponent";
// import MechanicNav from './MechanicNav';
// import PopupForm from './PopupForm';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const MechanicPage = () => {
//   const [showMap, setShowMap] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [requestData, setRequestData] = useState(null); // To store request data
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false); // To control the confirmation dialog

//   const token = localStorage.getItem('token');
//   const mechanicId = token ? jwtDecode(token).id : null;

//   useEffect(() => {
//     const handleNewRequest = (data) => {
//       console.log('New request received:', data);
//       setRequestData(data);
//       setShowConfirmDialog(true); // Show the confirmation dialog
//     };

//     // Log socket ID when the socket connects
//     socket.on('connect', () => {
//       console.log('Socket connected with ID:', socket.id);
//     });

//     // Attach the new request handler
//     socket.on('newRequest', handleNewRequest);

//     // Clean up socket events when component unmounts or dependencies change
//     return () => {
//       socket.off('newRequest', handleNewRequest);
//     };
//   }, []);

//   useEffect(() => {
//     if (showMap && mechanicId) {
//       socket.emit('MsetAvailable', mechanicId);

//       const handleWindowClose = () => {
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };

//       window.addEventListener('beforeunload', handleWindowClose);

//       return () => {
//         window.removeEventListener('beforeunload', handleWindowClose);
//         if (mechanicId) {
//           socket.emit('MsetUnavailable', mechanicId);
//         }
//       };
//     }
//   }, [showMap, mechanicId]);

//   const handlePopupSave = async (charge) => {
//     console.log('Saving charge:', charge);
//     try {
//       await axios.post(`${server}/api/mechanics/updateCharge`, {
//         mechanicId,
//         charge,
//       });
//       setShowPopup(false);
//       setShowMap(true);
//     } catch (error) {
//       console.error('Error updating charge:', error);
//     }
//   };

//   const handleConfirm = async (accepted) => {
//     if (requestData) {
//       try {
//         const endpoint = accepted ? '/api/requests/accept' : '/api/requests/decline';
//         await axios.post(endpoint, {
//           requestId: requestData.serviceId,
//           mechanicId,
//         });
//         socket.emit('notifyCustomer', {
//           customerId: requestData.customerId,
//           message: `Your request has been ${accepted ? 'accepted' : 'declined'} by mechanic ${mechanicId}.`
//         });
//         alert(`Request ${accepted ? 'accepted' : 'declined'}.`);
//       } catch (error) {
//         console.error(`Error ${accepted ? 'accepting' : 'declining'} request:`, error);
//       }
//       setShowConfirmDialog(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 relative">
//       <MechanicNav />
//       <main className="container mx-auto p-8">
//         {!showMap && (
//           <>
//             <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//               <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Mechanic!</h2>
//               <p className="text-gray-600">Here you can manage your services, view requests, and update your profile.</p>
//             </section>
//             <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               <div className="bg-white p-4 rounded-lg shadow-md" onClick={() => setShowPopup(true)}>
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
//         {showMap && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
//             <MechanicMapComponent />
//           </section>
//         )}
//         {showPopup && (
//           <PopupForm
//             onClose={() => setShowPopup(false)}
//             onSave={handlePopupSave}
//           />
//         )}
//         {showConfirmDialog && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg">
//               <h3 className="text-xl font-semibold mb-4">New Request</h3>
//               <p>Request details: {requestData?.description}</p>
//               <div className="mt-4">
//                 <button
//                   className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
//                   onClick={() => handleConfirm(true)}
//                 >
//                   Accept
//                 </button>
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                   onClick={() => handleConfirm(false)}
//                 >
//                   Decline
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default MechanicPage;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MechanicMapComponent from "./MechanicMapComponent";
// import MechanicNav from './MechanicNav';
// import PopupForm from './PopupForm';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const MechanicPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [showMap, setShowMap] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const token = localStorage.getItem('token');
//   const mechanicId = token ? jwtDecode(token).id : null;

//   console.log('Mechanic ID:', mechanicId);

//   useEffect(() => {
//     // Log socket ID when the socket connects
//     socket.on('connect', () => {
//       console.log('Socket connected with ID:', socket.id);
//     });

//     if (mechanicId) {
//       socket.emit('MsetAvailable', mechanicId);
//     }

//     // Clean up and ensure the mechanic is set as unavailable on logout or window close
//     const handleWindowClose = () => {
//       if (mechanicId) {
//         socket.emit('MsetUnavailable', mechanicId);
//       }
//     };

//     window.addEventListener('beforeunload', handleWindowClose);

//     return () => {
//       window.removeEventListener('beforeunload', handleWindowClose);
//       // Ensure mechanic is set as available if the component is unmounted
//       if (mechanicId) {
//         socket.emit('MsetAvailable', mechanicId);
//       }
//     };
//   }, [mechanicId]);

//   useEffect(() => {
//     const handleNewRequest = (data) => {
//       console.log('New request received:', data);
//       // Open a custom confirmation dialog instead of using alert
//       const confirmation = window.confirm(`New request received from ${data.customerId}. Request details: ${data.description}. Do you want to accept?`);
//       if (confirmation) {
//         // Send a notification to the customer if accepted
//         socket.emit('acceptRequest', {
//           serviceId: data.serviceId,
//           mechanicId,
//           customerId: data.customerId
//         });
//       }
//     };

//     socket.on('newRequest', handleNewRequest);

//     return () => {
//       socket.off('newRequest', handleNewRequest);
//     };
//   }, [mechanicId]);

//   const handleCurrentRequestsClick = () => {
//     setShowPopup(true);
//   };

//   const handlePopupSave = async (charge) => {
//     console.log('Saving charge:', charge);
//     try {
//       await axios.post(`${server}/api/mechanics/updateCharge`, {
//         mechanicId,
//         charge,
//       });
//       setShowPopup(false);
//       setShowMap(true);
//     } catch (error) {
//       console.error('Error updating charge:', error);
//     }
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
//         {showMap && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
//             <MechanicMapComponent />
//           </section>
//         )}
//         {showPopup && (
//           <PopupForm
//             onClose={() => setShowPopup(false)}
//             onSave={handlePopupSave}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default MechanicPage;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import MechanicMapComponent from "./MechanicMapComponent";
// import MechanicNav from './MechanicNav';
// import PopupForm from './PopupForm';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const MechanicPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [showMap, setShowMap] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);

//   const token = localStorage.getItem('token');
//   const mechanicId = token ? jwtDecode(token).id : null;

//   console.log('Mechanic ID:', mechanicId);

//   useEffect(() => {
//     // Log socket ID when the socket connects
//     socket.on('connect', () => {
//       console.log('Socket connected with ID:', socket.id);
//     });

//     // Emit event to set mechanic as available
//     if (mechanicId) {
//       socket.emit('MsetAvailable', mechanicId);
//     }

//     // Clean up and ensure the mechanic is set as unavailable on logout or window close
//     const handleWindowClose = () => {
//       if (mechanicId) {
//         console.log('Setting mechanic as unavailable due to window close');
//         socket.emit('MsetUnavailable', mechanicId);
//       }
//     };

//     window.addEventListener('beforeunload', handleWindowClose);

//     return () => {
//       window.removeEventListener('beforeunload', handleWindowClose);
//       // Ensure mechanic is set as available if the component is unmounted
//       if (mechanicId) {
//         console.log('Setting mechanic as available due to component unmount');
//         socket.emit('MsetAvailable', mechanicId);
//       }
//     };
//   }, [mechanicId]);

//   useEffect(() => {
//     const handleNewRequest = (data) => {
//       console.log('New request received:', data);
//       const confirmation = window.confirm(`New request received from ${data.customerId}. Request details: ${data.description}. Do you want to accept?`);
//       if (confirmation) {
//         // Send a notification to the customer if accepted
//         socket.emit('acceptRequest', {
//           serviceId: data.serviceId,
//           mechanicId,
//           customerId: data.customerId
//         });
//       }
//     };

//     socket.on('newRequest', handleNewRequest);

//     return () => {
//       socket.off('newRequest', handleNewRequest);
//     };
//   }, [mechanicId]);

//   const handleCurrentRequestsClick = () => {
//     setShowPopup(true);
//   };

//   const handlePopupSave = async (charge) => {
//     console.log('Saving charge:', charge);
//     try {
//       await axios.post(`${server}/api/mechanics/updateCharge`, {
//         mechanicId,
//         charge,
//       });
//       setShowPopup(false);
//       setShowMap(true);
//     } catch (error) {
//       console.error('Error updating charge:', error);
//     }
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
//         {showMap && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Current Requests</h2>
//             <MechanicMapComponent />
//           </section>
//         )}
//         {showPopup && (
//           <PopupForm
//             onClose={() => setShowPopup(false)}
//             onSave={handlePopupSave}
//           />
//         )}
//       </main>
//     </div>
//   );
// };

// export default MechanicPage;
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import MechanicMapComponent from './MechanicMapComponent';
import MechanicNav from './MechanicNav';
import PopupForm from './PopupForm';

const server = 'http://localhost:5000';
const socket = io(server);

const MechanicPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const token = localStorage.getItem('token');
  const mechanicId = token ? jwtDecode(token).id : null;

  console.log('Mechanic ID:', mechanicId);

  useEffect(() => {
    // Log socket ID when the socket connects
    socket.on('connect', () => {
      console.log('Socket connected with ID:', socket.id);
    });

    // Emit event to set mechanic as available
    if (mechanicId) {
      console.log('Setting mechanic as available');
      socket.emit('MsetAvailable', mechanicId);
    }

    // Clean up and ensure the mechanic is set as unavailable on logout or window close
    const handleWindowClose = () => {
      if (mechanicId) {
        console.log('Setting mechanic as unavailable due to window close');
        socket.emit('MsetUnavailable', mechanicId);
      }
    };

    window.addEventListener('beforeunload', handleWindowClose);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      
      // Check if the user is still logged in before setting available
      // if (mechanicId && localStorage.getItem('token')) {
      //   console.log('Setting mechanic as available due to component unmount');
      //   socket.emit('MsetAvailable', mechanicId);
      // } else {
      //   console.log('Mechanic logged out, no need to set available');
      // }
    };
  }, [mechanicId]);

  useEffect(() => {
    const handleNewRequest = (data) => {
      console.log('New request received:', data);
      const confirmation = window.confirm(`New request received from ${data.customerId}. Request details: ${data.description}. Do you want to accept?`);
      if (confirmation) {
        // Send a notification to the customer if accepted
        socket.emit('acceptRequest', {
          serviceId: data.serviceId,
          mechanicId,
          customerId: data.customerId
        });
      }
    };

    socket.on('newRequest', handleNewRequest);

    return () => {
      socket.off('newRequest', handleNewRequest);
    };
  }, [mechanicId]);

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
      <MechanicNav socket={socket} mechanicId={mechanicId} />
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
        {showMap && (
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
