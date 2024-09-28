// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// const NewMechanicMapComponent = ({ mechanicId, customerId }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const [mechanicRes, customerRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`)
//         ]);

//         setMechanicLocation(mechanicRes.data);
//         setCustomerLocation(customerRes.data);
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };

//     fetchLocations();
//   }, [mechanicId, customerId]);

//   if (!mechanicLocation || !customerLocation) return <p>Loading...</p>;

//   return (
//     <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//         <Popup>Mechanic Location</Popup>
//       </Marker>
//       <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//         <Popup>Customer Location</Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default NewMechanicMapComponent;

// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

// // Sample path data (latitude and longitude)
// const samplePath = [
//   { latitude: 40.730610, longitude: -73.935242 },
//   { latitude: 40.740610, longitude: -73.945242 },
//   { latitude: 40.750610, longitude: -73.955242 }
// ];

// const NewMechanicMapComponent = ({ mechanicId, customerId }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [path, setPath] = useState([]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const [mechanicRes, customerRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`)
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);

//         // Here you would calculate the path; using samplePath for demo
//         setPath(samplePath); 
//       } catch (error) {
//         console.error('Error fetching locations:', error);
//       }
//     };

//     fetchLocations();
//   }, [mechanicId, customerId]);

//   if (!mechanicLocation || !customerLocation) return <p>Loading...</p>;

//   return (
//     <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//         <Popup>Mechanic Location</Popup>
//       </Marker>
//       <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//         <Popup>Customer Location</Popup>
//       </Marker>
//       {path.length > 0 && (
//         <Polyline
//           positions={path.map(p => [p.latitude, p.longitude])}
//           color="blue"
//           weight={4}
//         />
//       )}
//     </MapContainer>
//   );
// };

//export default NewMechanicMapComponent;
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

// const NewMechanicMapComponent = ({ mechanicId, customerId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [path, setPath] = useState([]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const [mechanicRes, customerRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`)
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);

//         // Fetch the route between mechanic and customer using OSRM
//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
//         );

//         const routeData = osrmResponse.data.routes[0].geometry.coordinates;

//         // Convert the route data into LatLng format
//         const path = routeData.map(([lng, lat]) => ({
//           latitude: lat,
//           longitude: lng
//         }));

//         setPath(path);
//       } catch (error) {
//         console.error('Error fetching locations or route:', error);
//       }
//     };

//     fetchLocations();
//   }, [mechanicId, customerId]);

//   if (!mechanicLocation || !customerLocation) return <p>Loading...</p>;

//   return (
//     <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//         <Popup>Mechanic Location</Popup>
//       </Marker>
//       <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//         <Popup>Customer Location</Popup>
//       </Marker>
//       {path.length > 0 && (
//         <Polyline
//           positions={path.map(p => [p.latitude, p.longitude])}
//           color="blue"
//           weight={4}
//         />
//       )}
//     </MapContainer>
//   );
// };

// export default NewMechanicMapComponent;
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

// const NewMechanicMapComponent = ({ mechanicId, customerId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch mechanic and customer locations
//         const [mechanicRes, customerRes, serviceRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
//           axios.get(`http://localhost:5000/api/services/${customerId}/details`)
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;
//         const serviceData = serviceRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);
//         setServiceDetails(serviceData);

//         // Fetch the route between mechanic and customer using OSRM
//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
//         );

//         const routeData = osrmResponse.data.routes[0].geometry.coordinates;
//         const path = routeData.map(([lng, lat]) => ({
//           latitude: lat,
//           longitude: lng
//         }));

//         setPath(path);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [mechanicId, customerId]);

//   const updateServiceStatus = async (status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/services/${serviceDetails._id}/status`, {
//         status
//       });
//       socket.emit('serviceStatusUpdate', { customerId, status });
//     } catch (error) {
//       console.error('Error updating service status:', error);
//     }
//   };

//   if (!mechanicLocation || !customerLocation || !serviceDetails) return <p>Loading...</p>;

//   // Destructure customer and mechanic names from serviceDetails
//   const customerName = `${serviceDetails.customerId.firstName} ${serviceDetails.customerId.lastName}`;
//   const mechanicName = `${serviceDetails.mechanicId.firstName} ${serviceDetails.mechanicId.lastName}`;

//   return (
//     <>
//       <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
//         </Marker>
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         {path.length > 0 && (
//           <Polyline
//             positions={path.map(p => [p.latitude, p.longitude])}
//             color="blue"
//             weight={4}
//           />
//         )}
//       </MapContainer>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Service Details</h3>
//         <p>Customer: {customerName}</p>
//         <p>Mechanic: {mechanicName}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Vehicle Type: {serviceDetails.vehicleType}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <button onClick={() => updateServiceStatus('on the way')}>On the Way</button>
//         <button onClick={() => updateServiceStatus('arrived')}>Arrived</button>
//         <button onClick={() => updateServiceStatus('completed')}>Completed</button>
//       </div>
//     </>
//   );
// };

// export default NewMechanicMapComponent;
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

// const NewMechanicMapComponent = ({ mechanicId, customerId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [mechanicRes, customerRes, serviceRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
//           axios.get(`http://localhost:5000/api/services/${customerId}/details`)
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;
//         const serviceData = serviceRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);
//         setServiceDetails(serviceData);

//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
//         );

//         const routeData = osrmResponse.data.routes[0].geometry.coordinates;
//         const path = routeData.map(([lng, lat]) => ({
//           latitude: lat,
//           longitude: lng
//         }));

//         setPath(path);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [mechanicId, customerId]);

//   const updateServiceStatus = async (status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/services/${serviceDetails._id}/status`, {
//         status
//       });

//       // Set mechanic availability to false when service is accepted or completed
//       if (status === 'on the way' || status === 'completed') {
//         await axios.put(`http://localhost:5000/api/mechanics/mechanic/${mechanicId}/availability`, {
//           available: false
//         });
//       }

//       // Inform the customer through socket
//       socket.emit('serviceStatusUpdate', { customerId, status });
//     } catch (error) {
//       console.error('Error updating service status or availability:', error);
//     }
//   };

//   if (!mechanicLocation || !customerLocation || !serviceDetails) return <p>Loading...</p>;

//   const customerName = `${serviceDetails.customerId.firstName} ${serviceDetails.customerId.lastName}`;
//   const mechanicName = `${serviceDetails.mechanicId.firstName} ${serviceDetails.mechanicId.lastName}`;

//   return (
//     <>
//       <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
//         </Marker>
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         {path.length > 0 && (
//           <Polyline
//             positions={path.map(p => [p.latitude, p.longitude])}
//             color="blue"
//             weight={4}
//           />
//         )}
//       </MapContainer>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Service Details</h3>
//         <p>Customer: {customerName}</p>
//         <p>Mechanic: {mechanicName}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Vehicle Type: {serviceDetails.vehicleType}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <button onClick={() => updateServiceStatus('on the way')}>On the Way</button>
//         <button onClick={() => updateServiceStatus('arrived')}>Arrived</button>
//         <button onClick={() => updateServiceStatus('completed')}>Completed</button>
//       </div>
//     </>
//   );
// };

//export default NewMechanicMapComponent;
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

// const NewMechanicMapComponent = ({ mechanicId, customerId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);

//   useEffect(() => {
// axios.put(`http://localhost:5000/api/mechanics/mechanic/${mechanicId}/availability`, {
//         available: false
//       });
//     const fetchData = async () => {
//       try {
//         const [mechanicRes, customerRes, serviceRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
//           axios.get(`http://localhost:5000/api/services/${customerId}/details`)
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;
//         const serviceData = serviceRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);
//         setServiceDetails(serviceData);

//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
//         );

//         const routeData = osrmResponse.data.routes[0].geometry.coordinates;
//         const path = routeData.map(([lng, lat]) => ({
//           latitude: lat,
//           longitude: lng
//         }));

//         setPath(path);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [mechanicId, customerId]);

//   const updateServiceStatus = async (status) => {
//     try {
//       await axios.put(`http://localhost:5000/api/services/${serviceDetails._id}/status`, {
//         status
//       });

//       // Set mechanic availability to false when service is accepted or completed
    

//       // Inform the customer through socket
//       socket.emit('serviceStatusUpdate', { customerId, status });
//     } catch (error) {
//       console.error('Error updating service status or availability:', error);
//     }
//   };

//   if (!mechanicLocation || !customerLocation || !serviceDetails) return <p>Loading...</p>;

//   const customerName = `${serviceDetails.customerId.firstName} ${serviceDetails.customerId.lastName}`;
//   const mechanicName = `${serviceDetails.mechanicId.firstName} ${serviceDetails.mechanicId.lastName}`;

//   return (
//     <>
//       <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
//         </Marker>
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         {path.length > 0 && (
//           <Polyline
//             positions={path.map(p => [p.latitude, p.longitude])}
//             color="blue"
//             weight={4}
//           />
//         )}
//       </MapContainer>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Service Details</h3>
//         <p>Customer: {customerName}</p>
//         <p>Mechanic: {mechanicName}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Vehicle Type: {serviceDetails.vehicleType}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <button onClick={() => updateServiceStatus('on the way')}>On the Way</button>
//         <button onClick={() => updateServiceStatus('arrived')}>Arrived</button>
//         <button onClick={() => updateServiceStatus('completed')}>Completed</button>
//       </div>
//     </>
//   );
// };

// export default NewMechanicMapComponent;

// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

// const NewMechanicMapComponent = ({ serviceId, mechanicId, customerId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null); // New state for service details
//   const [path, setPath] = useState([]);
//   const updateMechanicAvailability = async (available) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/mechanics/mechanic/${mechanicId}/availability`, {
//         available,
//       });
//       console.log('Availability updated:', response.data);
//     } catch (error) {
//       console.error('Error updating mechanic availability:', error);
//     }
//   };
//   useEffect(() => {
//     // Set availability to false when the component mounts
//     updateMechanicAvailability(false);
//   }, [mechanicId]); // Run effect when mechanicId changes

//   useEffect(() => {
    
//     const fetchData = async () => {
//       try {
//         const [mechanicRes, customerRes, serviceRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
//           axios.get(`http://localhost:5000/api/services/${serviceId}/details`) // Fetch service details
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;
//         const serviceData = serviceRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);
//         setCustomerDetails(serviceData.customerId); // Use customer details from service
//         setServiceDetails(serviceData); // Set service details

//         // Fetch the route between mechanic and customer using OSRM
//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
//         );

//         const routeData = osrmResponse.data.routes[0].geometry.coordinates;

//         const path = routeData.map(([lng, lat]) => ({
//           latitude: lat,
//           longitude: lng
//         }));

//         setPath(path);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [mechanicId, customerId]);

//   const updateServiceStatus = async (status) => {
//     try {
//       // Update the service status in the database
//       const response = await axios.put(`http://localhost:5000/api/services/${serviceDetails._id}/status`, {
//         status
//       });

//       // Update local service details state
//       setServiceDetails((prevDetails) => ({
//         ...prevDetails,
//         status: response.data.updatedService.status // Update status from response
//       }));

//       // Inform the customer through socket
//       socket.emit('serviceStatusUpdate', { customerId, status });
//     } catch (error) {
//       console.error('Error updating service status:', error);
//     }
//   };

//   if (!mechanicLocation || !customerLocation || !customerDetails || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <>
//       <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
//         </Marker>
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         {path.length > 0 && (
//           <Polyline
//             positions={path.map(p => [p.latitude, p.longitude])}
//             color="blue"
//             weight={4}
//           />
//         )}
//       </MapContainer>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Service Details</h3>
//         <p>Customer: {customerDetails.firstName} {customerDetails.lastName}</p>
//         <p>Mechanic: {serviceDetails.mechanicId.firstName} {serviceDetails.mechanicId.lastName}</p>
//         <p>Phone Number: {serviceDetails.customerId.phoneNumber}</p>
//         <p>Status: {serviceDetails.status}</p>
//         {/* <p>service charge: {serviceDetails.mechanicId.serviceCharge}</p> */}
//         <p>Description: {serviceDetails.description}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <button
//           onClick={() => updateServiceStatus('on the way')}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           On the Way
//         </button>
//         <button
//           onClick={() => updateServiceStatus('arrived')}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
//         >
//           Arrived
//         </button>
//         <button
//           onClick={() => updateServiceStatus('completed')}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
//         >
//           Completed
//         </button>
//       </div>
//     </>
//   );
// };

// export default NewMechanicMapComponent;

// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
// import NotificationComponent from './NotificationComponent'; // Import your notification component

// const NewMechanicMapComponent = ({ serviceId, mechanicId, customerId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);
//   const [notification, setNotification] = useState(null); // State for notification

//   const updateMechanicAvailability = async (available) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/mechanics/mechanic/${mechanicId}/availability`, {
//         available,
//       });
//       console.log('Availability updated:', response.data);
//     } catch (error) {
//       console.error('Error updating mechanic availability:', error);
//     }
//   };

//   useEffect(() => {
//     updateMechanicAvailability(false);
//   }, [mechanicId]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [mechanicRes, customerRes, serviceRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
//           axios.get(`http://localhost:5000/api/services/${serviceId}/details`)
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;
//         const serviceData = serviceRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);
//         setCustomerDetails(serviceData.customerId);
//         setServiceDetails(serviceData);

//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
//         );

//         const routeData = osrmResponse.data.routes[0].geometry.coordinates;
//         const path = routeData.map(([lng, lat]) => ({
//           latitude: lat,
//           longitude: lng
//         }));

//         setPath(path);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [mechanicId, customerId]);

//   const updateServiceStatus = async (status) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/services/${serviceDetails._id}/status`, {
//         status
//       });

//       setServiceDetails((prevDetails) => ({
//         ...prevDetails,
//         status: response.data.updatedService.status
//       }));

//       socket.emit('serviceStatusUpdate', { customerId, status });
//     } catch (error) {
//       console.error('Error updating service status:', error);
//     }
//   };

//   useEffect(() => {
//     socket.on('ratingNotification', (data) => {
//       console.log('Received rating notification:', data);
//       setNotification({ title: 'New Rating', message: `You received a rating of ${data.rating}.` });
//     });

//     return () => {
//       socket.off('ratingNotification');
//     };
//   }, [socket]);

//   const handleCloseNotification = () => {
//     setNotification(null);
//   };

//   if (!mechanicLocation || !customerLocation || !customerDetails || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <>
//       <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
//         </Marker>
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         {path.length > 0 && (
//           <Polyline
//             positions={path.map(p => [p.latitude, p.longitude])}
//             color="blue"
//             weight={4}
//           />
//         )}
//       </MapContainer>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Service Details</h3>
//         <p>Customer: {customerDetails.firstName} {customerDetails.lastName}</p>
//         <p>Mechanic: {serviceDetails.mechanicId.firstName} {serviceDetails.mechanicId.lastName}</p>
//         <p>Phone Number: {serviceDetails.customerId.phoneNumber}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <button
//           onClick={() => updateServiceStatus('on the way')}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           On the Way
//         </button>
//         <button
//           onClick={() => updateServiceStatus('arrived')}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
//         >
//           Arrived
//         </button>
//         <button
//           onClick={() => updateServiceStatus('completed')}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
//         >
//           Completed
//         </button>
//       </div>

//       {/* Render Notification Component */}
//       {notification && (
//         <NotificationComponent notification={notification} onClose={handleCloseNotification} />
//       )}
//     </>
//   );
// };

// export default NewMechanicMapComponent;
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
// import NotificationComponent from './NotificationComponent'; // Import your notification component

// const NewMechanicMapComponent = ({ serviceId, mechanicId, customerId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);
//   const [notification, setNotification] = useState(null); // State for notification
//   const notificationRef = useRef(null); // Ref for the notification component

//   const updateMechanicAvailability = async (available) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/mechanics/mechanic/${mechanicId}/availability`, {
//         available,
//       });
//       console.log('Availability updated:', response.data);
//     } catch (error) {
//       console.error('Error updating mechanic availability:', error);
//     }
//   };

//   useEffect(() => {
//     updateMechanicAvailability(false);
//   }, [mechanicId]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [mechanicRes, customerRes, serviceRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
//           axios.get(`http://localhost:5000/api/services/${serviceId}/details`)
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;
//         const serviceData = serviceRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);
//         setCustomerDetails(serviceData.customerId);
//         setServiceDetails(serviceData);

//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
//         );

//         const routeData = osrmResponse.data.routes[0].geometry.coordinates;
//         const path = routeData.map(([lng, lat]) => ({
//           latitude: lat,
//           longitude: lng
//         }));

//         setPath(path);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [mechanicId, customerId]);

//   const updateServiceStatus = async (status) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/services/${serviceDetails._id}/status`, {
//         status
//       });

//       setServiceDetails((prevDetails) => ({
//         ...prevDetails,
//         status: response.data.updatedService.status
//       }));

//       socket.emit('serviceStatusUpdate', { customerId, status });
//     } catch (error) {
//       console.error('Error updating service status:', error);
//     }
//   };

//   useEffect(() => {
//     socket.on('ratingNotification', (data) => {
//       console.log('Received rating notification:', data);
//       setNotification({ title: 'New Rating', message: `You received a rating of ${data.rating}.` });
//     });

//     return () => {
//       socket.off('ratingNotification');
//     };
//   }, [socket]);

//   const handleCloseNotification = () => {
//     setNotification(null);
//   };

//   // Scroll to notification when it appears
//   useEffect(() => {
//     if (notification && notificationRef.current) {
//       notificationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   }, [notification]);

//   if (!mechanicLocation || !customerLocation || !customerDetails || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <>
//       <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
//         </Marker>
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         {path.length > 0 && (
//           <Polyline
//             positions={path.map(p => [p.latitude, p.longitude])}
//             color="blue"
//             weight={4}
//           />
//         )}
//       </MapContainer>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Service Details</h3>
//         <p>Customer: {customerDetails.firstName} {customerDetails.lastName}</p>
//         <p>Mechanic: {serviceDetails.mechanicId.firstName} {serviceDetails.mechanicId.lastName}</p>
//         <p>Phone Number: {serviceDetails.customerId.phoneNumber}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <button
//           onClick={() => updateServiceStatus('on the way')}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           On the Way
//         </button>
//         <button
//           onClick={() => updateServiceStatus('arrived')}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
//         >
//           Arrived
//         </button>
//         <button
//           onClick={() => updateServiceStatus('completed')}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
//         >
//           Completed
//         </button>
//       </div>

//       {/* Render Notification Component with ref */}
//       {notification && (
//         <div ref={notificationRef}>
//           <NotificationComponent notification={notification} onClose={handleCloseNotification} />
//         </div>
//       )}
//     </>
//   );
// };

// export default NewMechanicMapComponent;
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
// import NotificationComponent from './NotificationComponent'; // Import your notification component

// const NewMechanicMapComponent = ({ serviceId, mechanicId, customerId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);
//   const [notification, setNotification] = useState(null); // State for notification
//   const notificationRef = useRef(null); // Ref for the notification component

//   const updateMechanicAvailability = async (available) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/mechanics/mechanic/${mechanicId}/availability`, {
//         available,
//       });
//       console.log('Availability updated:', response.data);
//     } catch (error) {
//       console.error('Error updating mechanic availability:', error);
//     }
//   };

//   useEffect(() => {
//     updateMechanicAvailability(false);
//   }, [mechanicId]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [mechanicRes, customerRes, serviceRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
//           axios.get(`http://localhost:5000/api/services/${serviceId}/details`)
//         ]);

//         const mechanicData = mechanicRes.data;
//         const customerData = customerRes.data;
//         const serviceData = serviceRes.data;

//         setMechanicLocation(mechanicData);
//         setCustomerLocation(customerData);
//         setCustomerDetails(serviceData.customerId);
//         setServiceDetails(serviceData);

//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
//         );

//         const routeData = osrmResponse.data.routes[0].geometry.coordinates;
//         const path = routeData.map(([lng, lat]) => ({
//           latitude: lat,
//           longitude: lng
//         }));

//         setPath(path);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [mechanicId, customerId]);

//   const updateServiceStatus = async (status) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/services/${serviceDetails._id}/status`, {
//         status
//       });

//       setServiceDetails((prevDetails) => ({
//         ...prevDetails,
//         status: response.data.updatedService.status
//       }));

//       socket.emit('serviceStatusUpdate', { customerId, status });
//     } catch (error) {
//       console.error('Error updating service status:', error);
//     }
//   };

//   useEffect(() => {
//     socket.on('ratingNotification', (data) => {
//       console.log('Received rating notification:', data);
//       setNotification({ title: 'New Rating', message: `You received a rating of ${data.rating}.` });
//       window.scrollTo(0, 0); // Scroll to the top of the page when notification appears
//     });

//     return () => {
//       socket.off('ratingNotification');
//     };
//   }, [socket]);

//   const handleCloseNotification = () => {
//     setNotification(null);
//   };

//   // Scroll to notification when it appears
//   useEffect(() => {
//     if (notification && notificationRef.current) {
//       notificationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//   }, [notification]);

//   if (!mechanicLocation || !customerLocation || !customerDetails || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <>
//       {notification && (
//         <div ref={notificationRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }}>
//           <NotificationComponent notification={notification} onClose={handleCloseNotification} />
//         </div>
//       )}

//       <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%', marginTop: notification ? '60px' : '0' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
//         </Marker>
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         {path.length > 0 && (
//           <Polyline
//             positions={path.map(p => [p.latitude, p.longitude])}
//             color="blue"
//             weight={4}
//           />
//         )}
//       </MapContainer>

//       <div style={{ marginTop: '20px' }}>
//         <h3>Service Details</h3>
//         <p>Customer: {customerDetails.firstName} {customerDetails.lastName}</p>
//         <p>Mechanic: {serviceDetails.mechanicId.firstName} {serviceDetails.mechanicId.lastName}</p>
//         <p>Phone Number: {serviceDetails.customerId.phoneNumber}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//       </div>

//       <div style={{ marginTop: '20px' }}>
//         <button
//           onClick={() => updateServiceStatus('on the way')}
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           On the Way
//         </button>
//         <button
//           onClick={() => updateServiceStatus('arrived')}
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
//         >
//           Arrived
//         </button>
//         <button
//           onClick={() => updateServiceStatus('completed')}
//           className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
//         >
//           Completed
//         </button>
//       </div>
//     </>
//   );
// };

// export default NewMechanicMapComponent;

import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import NotificationComponent from './NotificationComponent'; // Import your notification component

const NewMechanicMapComponent = ({ serviceId, mechanicId, customerId, socket }) => {
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [path, setPath] = useState([]);
  const [notification, setNotification] = useState(null); // State for notification
  const notificationRef = useRef(null); // Ref for the notification component

  const updateMechanicAvailability = async (available) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/mechanics/mechanic/${mechanicId}/availability`, {
        available,
      });
      console.log('Availability updated:', response.data);
    } catch (error) {
      console.error('Error updating mechanic availability:', error);
    }
  };

  useEffect(() => {
    updateMechanicAvailability(false);
  }, [mechanicId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mechanicRes, customerRes, serviceRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
          axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
          axios.get(`http://localhost:5000/api/services/${serviceId}/details`)
        ]);

        const mechanicData = mechanicRes.data;
        const customerData = customerRes.data;
        const serviceData = serviceRes.data;

        setMechanicLocation(mechanicData);
        setCustomerLocation(customerData);
        setCustomerDetails(serviceData.customerId);
        setServiceDetails(serviceData);

        const osrmResponse = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
        );

        const routeData = osrmResponse.data.routes[0].geometry.coordinates;
        const path = routeData.map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng
        }));

        setPath(path);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [mechanicId, customerId]);

  const updateServiceStatus = async (status) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/services/${serviceDetails._id}/status`, {
        status
      });

      setServiceDetails((prevDetails) => ({
        ...prevDetails,
        status: response.data.updatedService.status
      }));

      socket.emit('serviceStatusUpdate', { customerId, status });
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  useEffect(() => {
    socket.on('ratingNotification', (data) => {
      console.log('Received rating notification:', data);
      setNotification({ title: 'New Rating', message: `You received a rating of ${data.rating}.` });
      window.scrollTo(0, 0); // Scroll to the top of the page when notification appears
    });

    return () => {
      socket.off('ratingNotification');
    };
  }, [socket]);

  const handleCloseNotification = () => {
    setNotification(null);
  };

  // Scroll to notification when it appears
  useEffect(() => {
    if (notification && notificationRef.current) {
      notificationRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [notification]);

  if (!mechanicLocation || !customerLocation || !customerDetails || !serviceDetails) return <p>Loading...</p>;

  return (
    <>
      {notification && (
        <div ref={notificationRef} style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }}>
          <NotificationComponent notification={notification} onClose={handleCloseNotification} />
        </div>
      )}

      {/* Set height and width of the map container to make it smaller */}
      <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '300px', width: '100%', marginTop: notification ? '60px' : '0' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
          <Popup>Mechanic Location</Popup>
        </Marker>
        <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
          <Popup>Customer Location</Popup>
        </Marker>
        {path.length > 0 && (
          <Polyline
            positions={path.map(p => [p.latitude, p.longitude])}
            color="blue"
            weight={4}
          />
        )}
      </MapContainer>

      <div style={{ marginTop: '20px' }}>
        <h3>Service Details</h3>
        <p>Customer: {customerDetails.firstName} {customerDetails.lastName}</p>
        <p>Mechanic: {serviceDetails.mechanicId.firstName} {serviceDetails.mechanicId.lastName}</p>
        <p>Phone Number: {serviceDetails.customerId.phoneNumber}</p>
        <p>Status: {serviceDetails.status}</p>
        <p>Description: {serviceDetails.description}</p>
        <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => updateServiceStatus('on the way')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          On the Way
        </button>
        <button
          onClick={() => updateServiceStatus('arrived')}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
        >
          Arrived
        </button>
        <button
          onClick={() => updateServiceStatus('completed')}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 ml-2"
        >
          Completed
        </button>
      </div>
    </>
  );
};

export default NewMechanicMapComponent;