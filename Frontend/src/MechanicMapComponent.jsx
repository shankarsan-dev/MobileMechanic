//   // frontend/src/MechMapComponent.js
//   import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import React from 'react';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
  
//   delete L.Icon.Default.prototype._getIconUrl;
//   L.Icon.Default.mergeOptions({
//     iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
//     iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
//   });
  
//   const MechMapComponent = ({ latitude, longitude,customers }) => {
//     const location = [latitude, longitude];
  
//     return (
//       <MapContainer center={location} zoom={13} style={{ height: '80vh', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={location}>
//           <Popup>You are here</Popup>
//         </Marker>
//         {customers.map((customer) => (
//           <Marker key={customer._id} position={customer.location.coordinates.reverse()}>
//             <Popup>{customer.name}</Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     );
//   };
  
//   export default MechMapComponent;
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// const DraggableMarker = ({ position, onDragEnd }) => {
//   const markerRef = useRef(null);

//   const eventHandlers = {
//     dragend() {
//       const marker = markerRef.current;
//       if (marker != null) {
//         const newPosition = marker.getLatLng();
//         onDragEnd(newPosition);
//       }
//     },
//   };

//   return (
//     <Marker
//       draggable={true}
//       eventHandlers={eventHandlers}
//       position={position}
//       ref={markerRef}
//     >
//       <Popup>Drag me!</Popup>
//     </Marker>
//   );
// };

// const MechanicMapComponent = () => {
//   const [position, setPosition] = useState(null); // Position is initially null
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);

//   useEffect(() => {
//     // Get the user's current position
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((pos) => {
//         const { latitude, longitude } = pos.coords;
//         setPosition([latitude, longitude]);
//         setLatitude(latitude);
//         setLongitude(longitude);
//       });
//     }
//   }, []);

//   const handleDragEnd = (newPosition) => {
//     setPosition([newPosition.lat, newPosition.lng]);
//     setLatitude(newPosition.lat);
//     setLongitude(newPosition.lng);
//     console.log(`Marker moved to: Latitude ${newPosition.lat}, Longitude ${newPosition.lng}`);
//   };

//   return (
//     position && ( // Render the map only after the position is set
//       <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <DraggableMarker position={position} onDragEnd={handleDragEnd} />
//       </MapContainer>
//     )
//   );
// };

// export default MechanicMapComponent;
import axios from 'axios'; // Import axios for HTTP requests
import { jwtDecode } from 'jwt-decode';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const token = localStorage.getItem('token');
  const mId = token ? jwtDecode(token).id : null;
  console.log(mId)
const DraggableMarker = ({ position, onDragEnd }) => {
  const markerRef = useRef(null);

  const eventHandlers = {
    dragend() {
      const marker = markerRef.current;
      if (marker != null) {
        const newPosition = marker.getLatLng();
        onDragEnd(newPosition);
      }
    },
  };

  return (
    <Marker
      draggable={true}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup>Drag me!</Popup>
    </Marker>
  );
};

const MechanicMapComponent = () => {
  const [position, setPosition] = useState(null); // Position is initially null
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);


  useEffect(() => {
    // Get the user's current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
        setLatitude(latitude);
        setLongitude(longitude);
        // Optionally update the initial position in the database
        updateLocationInDatabase(latitude, longitude);
      });
    }
  }, []);

  const updateLocationInDatabase = async (lat, lng) => {
    try {
      await axios.post('http://localhost:5000/api/mechanics/updateLocation', {
        mechanicId:mId,
        latitude: lat,
        longitude: lng,
      });
      console.log('Location updated in database');
    } catch (error) {
      console.error('Error updating location in database:', error);
    }
  };

  const handleDragEnd = (newPosition) => {
    setPosition([newPosition.lat, newPosition.lng]);
    setLatitude(newPosition.lat);
    setLongitude(newPosition.lng);
    console.log(`Marker moved to: Latitude ${newPosition.lat}, Longitude ${newPosition.lng}`);

    // Update the mechanic's location in the database
    updateLocationInDatabase(newPosition.lat, newPosition.lng);
  };

  return (
    position && ( // Render the map only after the position is set
      <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <DraggableMarker position={position} onDragEnd={handleDragEnd} />
      </MapContainer>
    )
  );
};

export default MechanicMapComponent;
