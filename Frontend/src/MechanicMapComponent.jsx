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



//   import axios from 'axios'; // Import axios for HTTP requests
// import { jwtDecode } from 'jwt-decode';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

//   const DraggableMarker = ({ position, onDragEnd }) => {
//     const markerRef = useRef(null);

//     const eventHandlers = {
//       dragend() {
//         const marker = markerRef.current;
//         if (marker != null) {
//           const newPosition = marker.getLatLng();
//           onDragEnd(newPosition);
//         }
//       },
//     };

//     return (
//       <Marker
//         draggable={true}
//         eventHandlers={eventHandlers}
//         position={position}
//         ref={markerRef}
//       >
//         <Popup>Drag me!</Popup>
//       </Marker>
//     );
//   };

//   const MechanicMapComponent = () => {
//     const [position, setPosition] = useState(null); // Position is initially null
//     const [latitude, setLatitude] = useState(null);
//     const [longitude, setLongitude] = useState(null);
//     const [mId, setMId] = useState(null); // Store mechanic ID

//     useEffect(() => {
//       // Retrieve the token from localStorage and decode the mechanic ID
//       const token = localStorage.getItem('token');
//       if (token) {
//         try {
//           const decodedToken = jwtDecode(token);
//           setMId(decodedToken.id); // Set mechanic ID
//           console.log('Mechanic ID:', decodedToken.id);
//         } catch (error) {
//           console.error('Error decoding token:', error);
//         }
//       } else {
//         console.error('No token found in localStorage');
//       }

//       // Get the user's current position
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition((pos) => {
//           const { latitude, longitude } = pos.coords;
//           setPosition([latitude, longitude]);
//           setLatitude(latitude);
//           setLongitude(longitude);

//           // Update location in the database only if mechanic ID is available
//           if (decodedToken && decodedToken.id) {
//             updateLocationInDatabase(latitude, longitude, decodedToken.id);
//           }
//         });
//       }
//     }, []);

//     const updateLocationInDatabase = async (lat, lng, mId) => {
//       try {
//         await axios.post('http://localhost:5000/api/mechanics/updateLocation', {
//           mechanicId: mId, // Ensure mechanicId is passed
//           latitude: lat,
//           longitude: lng,
//         });
//         console.log('Location updated in database for mechanic ID:', mId);
//       } catch (error) {
//         console.error('Error updating location in database:', error);
//       }
//     };

//     const handleDragEnd = (newPosition) => {
//       setPosition([newPosition.lat, newPosition.lng]);
//       setLatitude(newPosition.lat);
//       setLongitude(newPosition.lng);
//       console.log(`Marker moved to: Latitude ${newPosition.lat}, Longitude ${newPosition.lng}`);

//       // Update the mechanic's location in the database
//       if (mId) {
//         updateLocationInDatabase(newPosition.lat, newPosition.lng, mId);
//       }
//     };

//     return (
//       position && ( // Render the map only after the position is set
//         <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <DraggableMarker position={position} onDragEnd={handleDragEnd} />
//         </MapContainer>
//       )
//     );
//   };
  
//   export default MechanicMapComponent;

// import axios from 'axios'; // Import axios for HTTP requests
// import { jwtDecode } from 'jwt-decode'; // Correctly import jwtDecode
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

// // DraggableMarker Component
// const DraggableMarker = ({ position, onDragEnd }) => {
//   const markerRef = useRef(null);

//   const eventHandlers = {
//     dragend() {
//       const marker = markerRef.current;
//       if (marker != null) {
//         const newPosition = marker.getLatLng();
//         onDragEnd(newPosition); // Handle drag end
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

// // MechanicMapComponent
// const MechanicMapComponent = () => {
//   const [position, setPosition] = useState(null); // Mechanic's initial position
//   const [latitude, setLatitude] = useState(null);
//   const [longitude, setLongitude] = useState(null);
//   const [mId, setMId] = useState(null); // Mechanic ID
//   const [locationSet, setLocationSet] = useState(false); // Track if the initial location is already set

//   useEffect(() => {
//     // Retrieve the token from localStorage and decode the mechanic ID
//     const token = localStorage.getItem('token');
//     let decodedToken = null;
    
//     if (token) {
//       try {
//         decodedToken = jwtDecode(token);
//         setMId(decodedToken.id); // Set mechanic ID
//         console.log('Mechanic ID:', decodedToken.id);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     } else {
//       console.error('No token found in localStorage');
//     }

//     // Get the mechanic's current location if not already set
//     if (!locationSet && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((pos) => {
//         const { latitude, longitude } = pos.coords;
//         setPosition([latitude, longitude]); // Set the initial position
//         setLatitude(latitude);
//         setLongitude(longitude);
//         setLocationSet(true); // Mark that the initial location has been set

//         // Update location in the database only if mechanic ID is available
//         if (decodedToken && decodedToken.id) {
//           updateLocationInDatabase(latitude, longitude, decodedToken.id);
//         }
//       }, (error) => {
//         console.error("Error fetching geolocation:", error);
//       });
//     }
//   }, [locationSet]); // Run the effect only once after the initial location is set

//   // Function to update mechanic's location in the database
//   const updateLocationInDatabase = async (lat, lng, mId) => {
//     try {
//       await axios.post('http://localhost:5000/api/mechanics/updateLocation', {
//         mechanicId: mId, // Mechanic ID
//         latitude: lat,
//         longitude: lng,
//       });
//       console.log('Location updated in the database for mechanic ID:', mId);
//     } catch (error) {
//       console.error('Error updating location in database:', error);
//     }
//   };

//   // Handle the event when the marker is dragged to a new position
//   const handleDragEnd = (newPosition) => {
//     setPosition([newPosition.lat, newPosition.lng]); // Update the new position
//     setLatitude(newPosition.lat);
//     setLongitude(newPosition.lng);
//     console.log(`Marker moved to: Latitude ${newPosition.lat}, Longitude ${newPosition.lng}`);

//     // Update the mechanic's location in the database
//     if (mId) {
//       updateLocationInDatabase(newPosition.lat, newPosition.lng, mId);
//     }
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


// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
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
//   const [position, setPosition] = useState(null);
//   const [loading, setLoading] = useState(true); // Track loading state
//   const [mId, setMId] = useState(null);
//   const [locationSet, setLocationSet] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     let decodedToken = null;

//     if (token) {
//       try {
//         decodedToken = jwtDecode(token);
//         setMId(decodedToken.id);
//         console.log('Mechanic ID:', decodedToken.id);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }

//     if (!locationSet && navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           setPosition([latitude, longitude]);
//           setLocationSet(true);
//           setLoading(false); // Stop loading

//           if (decodedToken && decodedToken.id) {
//             updateLocationInDatabase(latitude, longitude, decodedToken.id);
//           }
//         },
//         (error) => {
//           console.error("Error fetching geolocation:", error);
//           setLoading(false); // Stop loading on error
//         }
//       );
//     }
//   }, [locationSet]);

//   const updateLocationInDatabase = async (lat, lng, mId) => {
//     try {
//       await axios.post('http://localhost:5000/api/mechanics/updateLocation', {
//         mechanicId: mId,
//         latitude: lat,
//         longitude: lng,
//       });
//       console.log('Location updated for mechanic ID:', mId);
//     } catch (error) {
//       console.error('Error updating location:', error);
//     }
//   };

//   const handleDragEnd = (newPosition) => {
//     setPosition([newPosition.lat, newPosition.lng]);
//     if (mId) {
//       updateLocationInDatabase(newPosition.lat, newPosition.lng, mId);
//     }
//   };

//   return (
//     loading ? (
//       <div>Loading map...</div> // Show a loading message or spinner
//     ) : (
//       position && (
//         <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; OpenStreetMap contributors'
//           />
//           <DraggableMarker position={position} onDragEnd={handleDragEnd} />
//         </MapContainer>
//       )
//     )
//   );
// };

// export default MechanicMapComponent;

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

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
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [mId, setMId] = useState(null);
  const [locationSet, setLocationSet] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let decodedToken = null;

    if (token) {
      try {
        decodedToken = jwtDecode(token);
        setMId(decodedToken.id);
        console.log('Mechanic ID:', decodedToken.id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    if (!locationSet && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
          setLocationSet(true);
          setLoading(false); // Stop loading

          if (decodedToken && decodedToken.id) {
            updateLocationInDatabase(latitude, longitude, decodedToken.id);
          }
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
          setLoading(false); // Stop loading on error
        }
      );
    }
  }, [locationSet]);

  const updateLocationInDatabase = async (lat, lng, mId) => {
    try {
      await axios.post('http://localhost:5000/api/mechanics/updateLocation', {
        mechanicId: mId,
        latitude: lat,
        longitude: lng,
      });
      console.log('Location updated for mechanic ID:', mId);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const handleDragEnd = (newPosition) => {
    setPosition([newPosition.lat, newPosition.lng]);
    if (mId) {
      updateLocationInDatabase(newPosition.lat, newPosition.lng, mId);
    }
  };

  return (
    loading ? (
      <div>Loading map...</div> // Show a loading message or spinner
    ) : (
      position && (
        <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <DraggableMarker position={position} onDragEnd={handleDragEnd} />
        </MapContainer>
      )
    )
  );
};

export default MechanicMapComponent;
