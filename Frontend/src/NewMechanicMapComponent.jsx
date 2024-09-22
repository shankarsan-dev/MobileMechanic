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
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';

const NewMechanicMapComponent = ({ mechanicId, customerId }) => {
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [customerLocation, setCustomerLocation] = useState(null);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const [mechanicRes, customerRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/mechanics/location/${mechanicId}`),
          axios.get(`http://localhost:5000/api/customers/location/${customerId}`)
        ]);

        const mechanicData = mechanicRes.data;
        const customerData = customerRes.data;

        setMechanicLocation(mechanicData);
        setCustomerLocation(customerData);

        // Fetch the route between mechanic and customer using OSRM
        const osrmResponse = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${mechanicData.longitude},${mechanicData.latitude};${customerData.longitude},${customerData.latitude}?overview=full&geometries=geojson`
        );

        const routeData = osrmResponse.data.routes[0].geometry.coordinates;

        // Convert the route data into LatLng format
        const path = routeData.map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng
        }));

        setPath(path);
      } catch (error) {
        console.error('Error fetching locations or route:', error);
      }
    };

    fetchLocations();
  }, [mechanicId, customerId]);

  if (!mechanicLocation || !customerLocation) return <p>Loading...</p>;

  return (
    <MapContainer center={[mechanicLocation.latitude, mechanicLocation.longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
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
  );
};

export default NewMechanicMapComponent;
