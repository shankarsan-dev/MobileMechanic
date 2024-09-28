// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

// const NewMapComponent = ({ customerId, mechanicId, socket }) => {
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null); // New state for service details
//   const [path, setPath] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [customerRes, mechanicRes, serviceRes] = await Promise.all([
//           axios.get(`http://localhost:5000/api/customers/location/${customerId}`),
//           axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
//           axios.get(`http://localhost:5000/api/services/${customerId}/details`) // Fetch service details
//         ]);

//         const customerData = customerRes.data;
//         const mechanicData = mechanicRes.data;
//         const serviceData = serviceRes.data;

//         setCustomerLocation(customerData);
//         setMechanicLocation(mechanicData);
//         setServiceDetails(serviceData); // Set service details

//         // Fetch the route between customer and mechanic using OSRM
//         const osrmResponse = await axios.get(
//           `https://router.project-osrm.org/route/v1/driving/${customerData.longitude},${customerData.latitude};${mechanicData.longitude},${mechanicData.latitude}?overview=full&geometries=geojson`
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
//   }, [customerId, mechanicId]);

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

//       // Inform the mechanic through socket
//       socket.emit('serviceStatusUpdate', { mechanicId, status });
//     } catch (error) {
//       console.error('Error updating service status:', error);
//     }
//   };

//   if (!customerLocation || !mechanicLocation || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <>
//       <MapContainer center={[customerLocation.latitude, customerLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
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
//         <p>Customer: {serviceDetails.customerId.firstName} {serviceDetails.customerId.lastName}</p>
//         <p>Mechanic: {serviceDetails.mechanicId.firstName} {serviceDetails.mechanicId.lastName}</p>
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

// export default NewMapComponent;

// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
// import NotificationComponent from './NotificationComponent';
// import RatingComponent from './RatingComponent'; // Import the new rating component

// const NewMapComponent = ({ serviceId, customerId, mechanicId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [mechanicDetails, setMechanicDetails] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);
//   const [notification, setNotification] = useState(null);
//   const previousStatus = useRef(null);

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
//         setMechanicDetails(serviceData.mechanicId);
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
//   }, [mechanicId, customerId, serviceId]);

//   useEffect(() => {
//     socket.on('serviceStatusUpdate', ({ status }) => {
//       setServiceDetails((prevDetails) => ({
//         ...prevDetails,
//         status
//       }));

//       if (previousStatus.current !== status) {
//         setNotification({
//           title: 'Service Status Update',
//           message: `The service status has been updated to: ${status}.`,
//           serviceId
//         });
//         previousStatus.current = status;
//       }
//     });

//     return () => {
//       socket.off('serviceStatusUpdate');
//     };
//   }, [socket]);

//   const handleCloseNotification = () => {
//     setNotification(null);
//   };

//   const handleRatingSubmit = async (rating) => {
//     try {
//       await axios.post(`http://localhost:5000/api/services/${serviceId}/rate`, { rating });
//       // Optionally, show a success notification or update UI after rating submission
//       setNotification({
//         title: 'Rating Submitted',
//         message: 'Thank you for your feedback!',
//       });
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//     }
//   };

//   if (!mechanicLocation || !customerLocation || !mechanicDetails || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <>
//       <MapContainer center={[customerLocation.latitude, customerLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
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
//         <p>Mechanic: {mechanicDetails.firstName} {mechanicDetails.lastName}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
        
//         {/* Conditionally render Rating Component when status is completed */}
//         {serviceDetails.status === 'completed' && (
//           <RatingComponent onRate={handleRatingSubmit} />
//         )}
//       </div>

//       {notification && (
//         <NotificationComponent
//           notification={notification}
//           onClose={handleCloseNotification}
//         />
//       )}
//     </>
//   );
// };

// export default NewMapComponent;
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
// import NotificationComponent from './NotificationComponent';
// import RatingComponent from './RatingComponent';

// const NewMapComponent = ({ serviceId, customerId, mechanicId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [mechanicDetails, setMechanicDetails] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);
//   const [notification, setNotification] = useState(null);
//   const previousStatus = useRef(null);

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
//         setMechanicDetails(serviceData.mechanicId);
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
//   }, [mechanicId, customerId, serviceId]);

//   useEffect(() => {
//     socket.on('serviceStatusUpdate', ({ status }) => {
//       setServiceDetails((prevDetails) => ({
//         ...prevDetails,
//         status
//       }));

//       if (previousStatus.current !== status) {
//         setNotification({
//           title: 'Service Status Update',
//           message: `The service status has been updated to: ${status}.`,
//           serviceId
//         });
//         previousStatus.current = status;
//       }
//     });

//     return () => {
//       socket.off('serviceStatusUpdate');
//     };
//   }, [socket]);

//   const handleCloseNotification = () => {
//     setNotification(null);
//   };

//   const handleRatingSubmit = async (rating) => {
//     try {
//       await axios.post(`http://localhost:5000/api/services/${serviceId}/rate`, { rating });
//       setNotification({
//         title: 'Rating Submitted',
//         message: 'Thank you for your feedback!',
//       });
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//     }
//   };

//   if (!mechanicLocation || !customerLocation || !mechanicDetails || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '700px',}}>
//       <div style={{ flex: 1, overflowY: 'auto', padding: '20px' ,height:'400px'}}>
//         <h3>Service Details</h3>
//         <p>Mechanic: {mechanicDetails.firstName} {mechanicDetails.lastName}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
        
//         {/* Conditionally render Rating Component when status is completed */}
//         {serviceDetails.status === 'completed' && (
//           <RatingComponent onRate={handleRatingSubmit} />
//         )}
//       </div>

//       {notification && (
//         <NotificationComponent
//           notification={notification}
//           onClose={handleCloseNotification}
//         />
//       )}

//       {/* Adjusted Map at the bottom */}
//       <div style={{ height: '500px',marginTop:'50px'}}>
//         <MapContainer center={[customerLocation.latitude, customerLocation.longitude]} zoom={13} style={{ height: '90%', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//             <Popup>Customer Location</Popup>
//           </Marker>
//           <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//             <Popup>Mechanic Location</Popup>
//           </Marker>
//           {path.length > 0 && (
//             <Polyline
//               positions={path.map(p => [p.latitude, p.longitude])}
//               color="blue"
//               weight={4}
//             />
//           )}
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default NewMapComponent;
// import axios from 'axios';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
// import NotificationComponent from './NotificationComponent';
// import RatingComponent from './RatingComponent';

// const NewMapComponent = ({ serviceId, customerId, mechanicId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [mechanicDetails, setMechanicDetails] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null); 
//   const [path, setPath] = useState([]);
//   const [notification, setNotification] = useState(null);
//   const previousStatus = useRef(null);

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
//         setMechanicDetails(serviceData.mechanicId);
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
//   }, [mechanicId, customerId, serviceId]);

//   useEffect(() => {
//     socket.on('serviceStatusUpdate', ({ status }) => {
//       setServiceDetails((prevDetails) => ({
//         ...prevDetails,
//         status
//       }));

//       if (previousStatus.current !== status) {
//         setNotification({
//           title: 'Service Status Update',
//           message: `The service status has been updated to: ${status}.`,
//           serviceId
//         });
//         previousStatus.current = status;
//       }
//     });

//     return () => {
//       socket.off('serviceStatusUpdate');
//     };
//   }, [socket]);

//   const handleCloseNotification = () => {
//     setNotification(null);
//   };

//   const handleRatingSubmit = async (rating) => {
//     try {
//       await axios.post(`http://localhost:5000/api/services/${serviceId}/rate`, { rating });
//       // Optionally, show a success notification or update UI after rating submission
//       setNotification({
//         title: 'Rating Submitted',
//         message: 'Thank you for your feedback!',
//       });
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//     }
//   };

//   if (!mechanicLocation || !customerLocation || !mechanicDetails || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <>
//       {/* Adjusted the map size to be smaller */}
//       <MapContainer center={[customerLocation.latitude, customerLocation.longitude]} zoom={13} style={{ height: '300px', width: '80%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
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
//         <p>Mechanic: {mechanicDetails.firstName} {mechanicDetails.lastName}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Phone Number: {mechanicDetails.phoneNumber}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//         <p>Vehicle Type: {serviceDetails.vehicleType}</p>

//         {serviceDetails.status === 'completed' && (
//           <RatingComponent onRate={handleRatingSubmit} />
//         )}
//       </div>

//       {notification && (
//         <NotificationComponent
//           notification={notification}
//           onClose={handleCloseNotification}
//         />
//       )}
//     </>
//   );
// };

// export default NewMapComponent;
// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
// import NotificationComponent from './NotificationComponent';
// import RatingComponent from './RatingComponent';

// const NewMapComponent = ({ serviceId, customerId, mechanicId, socket }) => {
//   const [mechanicLocation, setMechanicLocation] = useState(null);
//   const [customerLocation, setCustomerLocation] = useState(null);
//   const [mechanicDetails, setMechanicDetails] = useState(null);
//   const [serviceDetails, setServiceDetails] = useState(null);
//   const [path, setPath] = useState([]);
//   const [notification, setNotification] = useState(null);
//   const previousStatus = useRef(null);

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
//         setMechanicDetails(serviceData.mechanicId);
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
//   }, [mechanicId, customerId, serviceId]);

//   useEffect(() => {
//     socket.on('serviceStatusUpdate', ({ status }) => {
//       setServiceDetails((prevDetails) => ({
//         ...prevDetails,
//         status
//       }));

//       if (previousStatus.current !== status) {
//         setNotification({
//           title: 'Service Status Update',
//           message: `The service status has been updated to: ${status}.`,
//           serviceId
//         });
//         previousStatus.current = status;
//       }
//     });

//     return () => {
//       socket.off('serviceStatusUpdate');
//     };
//   }, [socket]);

//   const handleCloseNotification = () => {
//     setNotification(null);
//   };

//   const handleRatingSubmit = async (rating) => {
//     try {
//       await axios.post(`http://localhost:5000/api/services/rate`, { 
//         customerId, 
//         mechanicId, 
//         rating,
//         serviceId
//       });
//       setNotification({
//         title: 'Rating Submitted',
//         message: 'Thank you for your feedback!',
//       });
//     } catch (error) {
//       console.error('Error submitting rating:', error);
//     }
//   };

//   if (!mechanicLocation || !customerLocation || !mechanicDetails || !serviceDetails) return <p>Loading...</p>;

//   return (
//     <>
//       <MapContainer center={[customerLocation.latitude, customerLocation.longitude]} zoom={13} style={{ height: '300px', width: '80%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
//           <Popup>Customer Location</Popup>
//         </Marker>
//         <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
//           <Popup>Mechanic Location</Popup>
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
//         <p>Mechanic: {mechanicDetails.firstName} {mechanicDetails.lastName}</p>
//         <p>Status: {serviceDetails.status}</p>
//         <p>Phone Number: {mechanicDetails.phoneNumber}</p>
//         <p>Description: {serviceDetails.description}</p>
//         <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
//         <p>Vehicle Type: {serviceDetails.vehicleType}</p>

//         {serviceDetails.status === 'completed' && (
//           <RatingComponent onRate={handleRatingSubmit} />
//         )}
//       </div>

//       {notification && (
//         <NotificationComponent
//           notification={notification}
//           onClose={handleCloseNotification}
//         />
//       )}
//     </>
//   );
// };

// export default NewMapComponent;
import { useRef } from 'react';

const NewMapComponent = ({ serviceId, customerId, mechanicId, socket }) => {
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

const NewMapComponent = ({ serviceId, customerId, mechanicId, socket }) => {
  console.log("service id : "+serviceId);
  console.log("mechanicId "+mechanicId);
  console.log("customerId "+customerId);

  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [mechanicDetails, setMechanicDetails] = useState(null);
  const [serviceDetails, setServiceDetails] = useState(null);
  const [path, setPath] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showRating, setShowRating] = useState(false); // State to control rating visibility
  const previousStatus = useRef(null);

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
        setMechanicDetails(serviceData.mechanicId);
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
  }, [mechanicId, customerId, serviceId]);

  useEffect(() => {

    socket.on('serviceStatusUpdate', ({ status }) => {
      setServiceDetails((prevDetails) => ({
        ...prevDetails,
        status
      }));

      if (previousStatus.current !== status) {
        setNotification({
          title: 'Service Status Update',
          message: `The service status has been updated to: ${status}.`,
          serviceId
        });

        // Set showRating to true if the status is completed
        if (status === 'completed') {
          setShowRating(true); // Show the rating form when status is completed
        }

        previousStatus.current = status;
      }
    });

    // Listen to updates on service status via socket
    socket.on('serviceStatusUpdate', ({ status }) => {
      setServiceDetails((prevDetails) => ({
        ...prevDetails,
        status // Update service status when the mechanic updates it
      }));
    });

    // Cleanup on component unmount

    return () => {
      socket.off('serviceStatusUpdate');
    };
  }, [socket]);


  const handleCloseNotification = () => {
    setNotification(null);
  };

  const handleRatingSubmit = async (rating) => {
    try {
      await axios.post(`http://localhost:5000/api/services/rate`, { 
        customerId, 
        mechanicId, 
        rating,
        serviceId
      });
      setNotification({
        title: 'Rating Submitted',
        message: 'Thank you for your feedback!',
      });
      setShowRating(false); // Hide rating form after submission
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };


  if (!mechanicLocation || !customerLocation || !mechanicDetails || !serviceDetails) return <p>Loading...</p>;

  return (
    <>
      <MapContainer center={[customerLocation.latitude, customerLocation.longitude]} zoom={13} style={{ height: '300px', width: '80%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[customerLocation.latitude, customerLocation.longitude]}>
          <Popup>Customer Location</Popup>
        </Marker>
        <Marker position={[mechanicLocation.latitude, mechanicLocation.longitude]}>
          <Popup>Mechanic Location</Popup>
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
        <p>Mechanic: {mechanicDetails.firstName} {mechanicDetails.lastName}</p>
        <p>Status: {serviceDetails.status}</p>
        <p>Phone Number: {mechanicDetails.phoneNumber}</p>
        <p>Description: {serviceDetails.description}</p>
        <p>Date: {new Date(serviceDetails.createdAt).toLocaleDateString()}</p>
        <p>Vehicle Type: {serviceDetails.vehicleType}</p>

        {serviceDetails.status === 'completed' && showRating && (
          <RatingComponent onRate={handleRatingSubmit} />
        )}
      </div>

      {notification && (
        <NotificationComponent
          notification={notification}
          onClose={handleCloseNotification}
        />
      )}
    </>
  );
};

export default NewMapComponent;
