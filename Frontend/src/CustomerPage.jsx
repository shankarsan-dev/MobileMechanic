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

// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import CustomerNav from './CustomerNav';
// import MapComponent from './MapComponent';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const CustomerPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mechanics, setMechanics] = useState([]);
//   const [showMap, setShowMap] = useState(false);

//   const token = localStorage.getItem('token');
//   const customerId = token ? jwtDecode(token).id : null;

//   useEffect(() => {
//     if (showMap && customerId) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);

//         const fetchMechanics = async () => {
//           try {
//             const response = await axios.get(`${server}/api/customers/availableMech`);
//             setMechanics(response.data);
//           } catch (error) {
//             console.error('Error fetching available mechanics:', error);
//           }
//         };

//         fetchMechanics();

//         // Set up an interval to fetch mechanics every 5 seconds
//         const intervalId = setInterval(fetchMechanics, 5000);
//           console.log("customer id ="+customerId);
//         // Emit event to set customer as available
//         socket.emit('CsetAvailable', customerId);

//         // Socket.IO event handlers
//         socket.on('updateMechanics', (updatedMechanics) => {
//           setMechanics(updatedMechanics);
//         });

//         // Clean up on component unmount
//         return () => {
//           clearInterval(intervalId);
//           socket.emit('CsetUnavailable', customerId);
//           socket.off('updateMechanics');
//         };
//       }, (error) => {
//         console.error('Error getting location:', error);
//       });
//     }
//   }, [showMap, customerId]);

//   const handleFindMechanicClick = () => {
//     setShowMap(true);
//   };

//   const sendRequest = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/requests', {
//         customerId, // Get this from the decoded token or state
//         mechanicId: selectedMechanic._id,
//         latitude: position[0],
//         longitude: position[1],
//         description: 'Service request description here',
//       });
//       setModalIsOpen(false);
//       alert('Request sent successfully');
//     } catch (error) {
//       console.error('Error sending request:', error);
//     }
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
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import CustomerNav from './CustomerNav';
// import MapComponent from './MapComponent';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const CustomerPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mechanics, setMechanics] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [showForm, setShowForm] = useState(false); // New state to toggle form visibility
//   const [vehicleType, setVehicleType] = useState('');
//   const [description, setDescription] = useState('');

//   const token = localStorage.getItem('token');
//   const customerId = token ? jwtDecode(token).id : null;

//   useEffect(() => {
//     if (showMap && customerId) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);

//         const fetchMechanics = async () => {
//           try {
//             const response = await axios.get(`${server}/api/customers/availableMech`);
//             setMechanics(response.data);
//           } catch (error) {
//             console.error('Error fetching available mechanics:', error);
//           }
//         };

//         fetchMechanics();

//         // Set up an interval to fetch mechanics every 5 seconds
//         const intervalId = setInterval(fetchMechanics, 5000);
//         console.log("customer id ="+customerId);

//         // Emit event to set customer as available
//         socket.emit('CsetAvailable', customerId);

//         // Socket.IO event handlers
//         socket.on('updateMechanics', (updatedMechanics) => {
//           setMechanics(updatedMechanics);
//         });

//         // Clean up on component unmount
//         return () => {
//           clearInterval(intervalId);
//           socket.emit('CsetUnavailable', customerId);
//           socket.off('updateMechanics');
//         };
//       }, (error) => {
//         console.error('Error getting location:', error);
//       });
//     }
//   }, [showMap, customerId]);

//   const handleFindMechanicClick = () => {
//     setShowForm(true); // Show the form when 'Find a Mechanic' is clicked
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     setShowForm(false); // Hide the form after submission
//     setShowMap(true);   // Show the map after the form is submitted
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <CustomerNav />

//       <main className="container mx-auto p-8">
//         {!showMap && !showForm && (
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

//         {showForm && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Request a Mechanic</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
//                 <input
//                   type="text"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={vehicleType}
//                   onChange={(e) => setVehicleType(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                 <textarea
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Submit
//               </button>
//             </form>
//           </section>
//         )}

//         {showMap && latitude && longitude && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Mechanics</h2>
//             <MapComponent 
//               latitude={latitude} 
//               longitude={longitude} 
//               mechanics={mechanics} 
//               vehicleType={vehicleType}   // Pass vehicleType to MapComponent
//               description={description}   // Pass description to MapComponent
//             />
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CustomerPage;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import CustomerNav from './CustomerNav';
// import MapComponent from './MapComponent';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const CustomerPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mechanics, setMechanics] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [vehicleType, setVehicleType] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log("Token:", token); // Check if token is present
//     const customerId = token ? jwtDecode(token).id : null;
//     console.log("Customer ID:", customerId); // Check if customerId is decoded correctly

//     if (customerId) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         setLatitude(position.coords.latitude);
//         setLongitude(position.coords.longitude);

//         const fetchMechanics = async () => {
//           try {
//             const response = await axios.get(`${server}/api/customers/availableMech`);
//             setMechanics(response.data);
//           } catch (error) {
//             console.error('Error fetching available mechanics:', error);
//           }
//         };

//         fetchMechanics();

//         // Set up an interval to fetch mechanics every 5 seconds
//         const intervalId = setInterval(fetchMechanics, 5000);
//         console.log("customer id =", customerId);

//         // Emit event to set customer as available
//         socket.emit('CsetAvailable', customerId);

//         // Socket.IO event handlers
//         socket.on('updateMechanics', (updatedMechanics) => {
//           setMechanics(updatedMechanics);
//         });

//         // Clean up on component unmount
//         return () => {
//           clearInterval(intervalId);
//           socket.emit('CsetUnavailable', customerId);
//           socket.off('updateMechanics');
//         };
//       }, (error) => {
//         console.error('Error getting location:', error);
//       });
//     } else {
//       console.warn("Customer ID is null, redirecting to login...");
//       // Optionally, redirect to the login page or handle accordingly
//     }
//   }, []);

//   const handleFindMechanicClick = () => {
//     setShowForm(true);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     setShowForm(false);
//     setShowMap(true);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <CustomerNav />

//       <main className="container mx-auto p-8">
//         {!showMap && !showForm && (
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

//         {showForm && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Request a Mechanic</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
//                 <input
//                   type="text"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={vehicleType}
//                   onChange={(e) => setVehicleType(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                 <textarea
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Submit
//               </button>
//             </form>
//           </section>
//         )}

//         {showMap && latitude && longitude && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Mechanics</h2>
//             <MapComponent 
//               latitude={latitude} 
//               longitude={longitude} 
//               mechanics={mechanics} 
//               vehicleType={vehicleType} 
//               description={description}
//             />
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CustomerPage;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import CustomerNav from './CustomerNav';
// import MapComponent from './MapComponent';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const CustomerPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mechanics, setMechanics] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [vehicleType, setVehicleType] = useState('');
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const customerId = token ? jwtDecode(token).id : null;

//     if (customerId) {
//       // Socket.IO event handlers
//       socket.on('updateMechanics', (updatedMechanics) => {
//         setMechanics(updatedMechanics);
//       });

//       // Cleanup on component unmount
//       return () => {
//         socket.off('updateMechanics');
//       };
//     } else {
//       console.warn("Customer ID is null, redirecting to login...");
//       // Optionally, redirect to the login page or handle accordingly
//     }
//   }, []);

//   const handleFindMechanicClick = () => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);

//       const fetchMechanics = async () => {
//         try {
//           const response = await axios.get(`${server}/api/customers/availableMech`);
//           setMechanics(response.data);
//         } catch (error) {
//           console.error('Error fetching available mechanics:', error);
//         }
//       };

//       fetchMechanics();

//       // Set up an interval to fetch mechanics every 5 seconds
//       const intervalId = setInterval(fetchMechanics, 5000);

//       // Emit event to set customer as available
//       const token = localStorage.getItem('token');
//       const customerId = token ? jwtDecode(token).id : null;
//       if (customerId) {
//         socket.emit('CsetAvailable', customerId);
//       }

//       // Clean up interval on unmount
//       return () => {
//         clearInterval(intervalId);
//       };
//     }, (error) => {
//       console.error('Error getting location:', error);
//     });

//     setShowForm(true);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     setShowForm(false);
//     setShowMap(true);
//   };

//   const handleLogout = () => {
//     const token = localStorage.getItem('token');
//     const customerId = token ? jwtDecode(token).id : null;

//     if (customerId) {
//       socket.emit('CsetUnavailable', customerId);
//     }

//     localStorage.removeItem('token');
//     // Optionally redirect to login page
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <CustomerNav onLogout={handleLogout} />

//       <main className="container mx-auto p-8">
//         {!showMap && !showForm && (
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

//         {showForm && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Request a Mechanic</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
//                 <input
//                   type="text"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={vehicleType}
//                   onChange={(e) => setVehicleType(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                 <textarea
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Submit
//               </button>
//             </form>
//           </section>
//         )}

//         {showMap && latitude && longitude && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Mechanics</h2>
//             <MapComponent 
//               latitude={latitude} 
//               longitude={longitude} 
//               mechanics={mechanics} 
//               vehicleType={vehicleType} 
//               description={description}
//             />
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CustomerPage;
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Removed curly braces around jwtDecode
// import React, { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import CustomerNav from './CustomerNav';
// import MapComponent from './MapComponent';

// const server = 'http://localhost:5000';
// const socket = io(server);

// const CustomerPage = () => {
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mechanics, setMechanics] = useState([]);
//   const [showMap, setShowMap] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [vehicleType, setVehicleType] = useState('');
//   const [description, setDescription] = useState('');
//   const [requestAccepted, setRequestAccepted] = useState(false);
//   const [acceptedMechanic, setAcceptedMechanic] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const customerId = token ? jwtDecode(token).id : null;

//     if (customerId) {
//       // Socket.IO event handlers
//       socket.on('updateMechanics', (updatedMechanics) => {
//         setMechanics(updatedMechanics);
//       });

//       // Listen for the requestAccepted event
//       socket.on('requestAccepted', ({ serviceId, mechanicId, message }) => {
//         setRequestAccepted(true);

//         // Fetch the mechanic details
//         axios.get(`${server}/api/mechanics/${mechanicId}`)
//           .then(response => {
//             setAcceptedMechanic(response.data);
//           })
//           .catch(error => {
//             console.error('Error fetching mechanic details:', error);
//           });

//         alert(message);  // Optionally replace this with a modal or toast notification
//       });

//       // Cleanup on component unmount
//       return () => {
//         socket.off('updateMechanics');
//         socket.off('requestAccepted');
//       };
//     } else {
//       console.warn("Customer ID is null, redirecting to login...");
//       // Optionally, redirect to the login page or handle accordingly
//     }
//   }, []);

//   const handleFindMechanicClick = () => {
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       setLatitude(position.coords.latitude);
//       setLongitude(position.coords.longitude);

//       const fetchMechanics = async () => {
//         try {
//           const response = await axios.get(`${server}/api/customers/availableMech`);
//           setMechanics(response.data);
//         } catch (error) {
//           console.error('Error fetching available mechanics:', error);
//         }
//       };

//       fetchMechanics();

//       // Set up an interval to fetch mechanics every 5 seconds
//       const intervalId = setInterval(fetchMechanics, 5000);

//       // Emit event to set customer as available
//       const token = localStorage.getItem('token');
//       const customerId = token ? jwtDecode(token).id : null;
//       if (customerId) {
//         socket.emit('CsetAvailable', customerId);
//       }

//       // Clean up interval on unmount
//       return () => {
//         clearInterval(intervalId);
//       };
//     }, (error) => {
//       console.error('Error getting location:', error);
//     });

//     setShowForm(true);
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     setShowForm(false);
//     setShowMap(true);
//   };

//   const handleLogout = () => {
//     const token = localStorage.getItem('token');
//     const customerId = token ? jwtDecode(token).id : null;

//     if (customerId) {
//       socket.emit('CsetUnavailable', customerId);
//     }

//     localStorage.removeItem('token');
//     // Optionally redirect to login page
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <CustomerNav onLogout={handleLogout} />

//       <main className="container mx-auto p-8">
//         {!showMap && !showForm && !requestAccepted && (
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

//         {showForm && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Request a Mechanic</h2>
//             <form onSubmit={handleFormSubmit}>
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
//                 <input
//                   type="text"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={vehicleType}
//                   onChange={(e) => setVehicleType(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//                 <textarea
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               >
//                 Submit
//               </button>
//             </form>
//           </section>
//         )}

//         {showMap && latitude && longitude && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Mechanics</h2>
//             <MapComponent 
//               latitude={latitude} 
//               longitude={longitude} 
//               mechanics={mechanics} 
//               vehicleType={vehicleType} 
//               description={description}
//             />
//           </section>
//         )}

//         {requestAccepted && acceptedMechanic && (
//           <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//             <h2 className="text-2xl font-bold text-gray-700 mb-4">Request Accepted!</h2>
//             <p>Your request has been accepted by {acceptedMechanic.name}. They will arrive soon.</p>
//             <MapComponent 
//               latitude={latitude} 
//               longitude={longitude} 
//               mechanics={[acceptedMechanic]} 
//             />
//           </section>
//         )}
//       </main>
//     </div>
//   );
// };

// export default CustomerPage;
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
  const [showForm, setShowForm] = useState(false);
  const [vehicleType, setVehicleType] = useState('');
  const [description, setDescription] = useState('');
  // const [requestAccepted, setRequestAccepted] = useState(false);
  // const [acceptedMechanic, setAcceptedMechanic] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const customerId = token ? jwtDecode(token).id : null;
    console.log("customer iD:" + customerId);

    if (customerId) {
      // Socket.IO event handlers
      socket.on('updateMechanics', (updatedMechanics) => {
        setMechanics(updatedMechanics);
      });
      // Cleanup on component unmount
      return () => {
        socket.off('updateMechanics');
        // socket.off('requestAccepted');
      };
    } else {
      console.warn("Customer ID is null, redirecting to login...");
      // Optionally, redirect to the login page or handle accordingly
    }
  }, []);

  const handleFindMechanicClick = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      const fetchMechanics = async () => {
        try {
          const response = await axios.get(`${server}/api/customers/availableMech`);
          setMechanics(response.data);
        } catch (error) {
          console.error('Error fetching available mechanics:', error);
        }
      };

      fetchMechanics();

      // Set up an interval to fetch mechanics every 5 seconds
      const intervalId = setInterval(fetchMechanics, 5000);

      // Emit event to set customer as available
      const token = localStorage.getItem('token');
      const customerId = token ? jwtDecode(token).id : null;
      if (customerId) {
        socket.emit('CsetAvailable', customerId);
      }

      // Clean up interval on unmount
      return () => {
        clearInterval(intervalId);
      };
    }, (error) => {
      console.error('Error getting location:', error);
    });

    setShowForm(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowForm(false);
    setShowMap(true);
  };

  const handleLogout = () => {
    const token = localStorage.getItem('token');
    const customerId = token ? jwtDecode(token).id : null;

    if (customerId) {
      socket.emit('CsetUnavailable', customerId);
    }

    localStorage.removeItem('token');
    // Optionally redirect to login page
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <CustomerNav onLogout={handleLogout} />

      <main className="container mx-auto p-8">
        {!showMap && !showForm && (
          <>
            {/* <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Customer!</h2>
              <p className="text-gray-600">Here you can find mechanics, view your requests, and update your profile.</p>
            </section> */}

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
           
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-red-300 max-w-screen-md" onClick={handleFindMechanicClick} >
              <img src="src\assets\mechanic-2.png" alt="" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Find a Mechanic</h3>
                <p className="text-gray-600">Search for nearby mechanics and request services.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-red-300 max-w-screen-md">
                <img src="src\assets\service.png" alt="" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Request History</h3>
                <p className="text-gray-600">Check your past service requests.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md hover:bg-red-300 max-w-screen-md">
                <img src="src\assets\profile-setting.png" alt="" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2 ">Profile Settings</h3>
                <p className="text-gray-600">Update your profile information and preferences.</p>
              </div>
            </section>
          </>
        )}

        {showForm && (
          <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Request a Mechanic</h2>
            <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Vehicle Type</label>
      <select
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
        required
      >
        <option value="" disabled>Select Vehicle Type</option>
        <option value="sedan">Sedan</option>
        <option value="SUV">SUV (Sport Utility Vehicle)</option>
        <option value="motorcycle">Motorcycle</option>
        <option value="pickup_truck">Pickup Truck</option>
        <option value="electric_car">Electric Car</option>
        <option value="hybrid_vehicle">Hybrid Vehicle</option>
        <option value="semi_truck">Semi Truck</option>
        <option value="minivan">Minivan</option>
        <option value="coupe">Coupe</option>
        <option value="convertible">Convertible</option>
        <option value="hatchback">Hatchback</option>
        <option value="station_wagon">Station Wagon</option>
        <option value="bicycle">Bicycle</option>
        <option value="moped">Moped</option>
      </select>
    </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </section>
        )}

        {showMap && latitude && longitude && (
          <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Available Mechanics</h2>
            <MapComponent 
            socket = {socket}
              latitude={latitude} 
              longitude={longitude} 
              mechanics={mechanics} 
              vehicleType={vehicleType} 
              description={description}
            />
          </section>
        )}

      </main>
    </div>
  );
};

export default CustomerPage;
