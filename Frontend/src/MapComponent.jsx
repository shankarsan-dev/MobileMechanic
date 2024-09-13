// export default MapComponent;

// import axios from 'axios';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import Modal from 'react-modal';

// Modal.setAppElement('#root');

// // Define customer and mechanic icons
// const customerIcon = L.icon({
//   iconUrl: 'src/assets/working.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// const mechanicIcon = L.icon({
//   iconUrl: 'src/assets/mechanic-2.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// // Haversine formula to calculate the distance between two points
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRad = (value) => (value * Math.PI) / 180;
//   const R = 6371; // Radius of the Earth in km
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// };

// const MapComponent = ({ latitude, longitude, mechanics, radius = 5 }) => {
//   const mapRef = useRef(null);
//   const customerMarkerRef = useRef(null);
//   const markersRef = useRef([]);
//   const [selectedMechanic, setSelectedMechanic] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   // Initialize the map once
//   useEffect(() => {
//     if (latitude && longitude && !mapRef.current) {
//       mapRef.current = L.map('map', {
//         center: [latitude, longitude],
//         zoom: 10,
//       });

//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapRef.current);
//     }
//   }, [latitude, longitude]);

//   // Update customer marker when latitude or longitude changes
//   useEffect(() => {
//     if (latitude && longitude && mapRef.current) {
//       if (customerMarkerRef.current) {
//         customerMarkerRef.current.setLatLng([latitude, longitude]);
//       } else {
//         customerMarkerRef.current = L.marker([latitude, longitude], { icon: customerIcon })
//           .addTo(mapRef.current)
//           .bindPopup('Your location')
//           .openPopup();
//       }
//     }
//   }, [latitude, longitude]);

//   // Update the markers when mechanics change
//   useEffect(() => {
//     if (mapRef.current) {
//       // Clear existing markers
//       markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
//       markersRef.current = [];

//       mechanics.forEach((mechanic) => {
//         const { firstName, lastName, latitude: mechLat, longitude: mechLng, serviceCharge } = mechanic;

//         // Calculate distance using the Haversine formula
//         const distance = haversineDistance(latitude, longitude, mechLat, mechLng);

//         // Check if the mechanic is within the radius
//         if (distance <= radius) {
//           const marker = L.marker([mechLat, mechLng], { icon: mechanicIcon })
//             .addTo(mapRef.current)
//             .bindPopup(`<b>${firstName} ${lastName}</b><br/>Per Hour Charge: ${serviceCharge}<br/>Distance: ${distance.toFixed(2)} km`);

//           marker.on('click', () => {
//             setSelectedMechanic(mechanic);
//             setModalIsOpen(true);
//           });

//           markersRef.current.push(marker);
//         }
//       });
//     }
//   }, [latitude, longitude, mechanics, radius]);

//   // Handle scroll to close modal
//   useEffect(() => {
//     const handleScroll = () => {
//       if (modalIsOpen) {
//         setModalIsOpen(false);
//       }
//     };

//     if (modalIsOpen) {
//       window.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [modalIsOpen]);

//   const sendRequest = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/requests', {
//         mechanicId: selectedMechanic._id,
//         latitude,
//         longitude,
//       });
//       setModalIsOpen(false);
//       alert('Request sent successfully');
//     } catch (error) {
//       console.error('Error sending request:', error);
//     }
//   };

//   return (
//     <>
//       <div id="map" style={{ height: '400px', width: '100%', marginTop: '50px' }}></div>
//       {selectedMechanic && (
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={() => setModalIsOpen(false)}
//           className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-80 max-w-sm z-50"
//           overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
//         >
//           <h2 className="text-lg font-bold mb-4">{selectedMechanic.firstName} {selectedMechanic.lastName}</h2>
//           <p className="bottom-2">Per Hour Charge: {selectedMechanic.serviceCharge}</p>
//           <div className="flex justify-between">
//             <button
//               onClick={sendRequest}
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               Send Request
//             </button>
//             <button
//               onClick={() => setModalIsOpen(false)}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
//             >
//               Close
//             </button>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default MapComponent;
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import React, { useEffect, useRef, useState } from 'react';
// import Modal from 'react-modal';
// const token = localStorage.getItem('token');
// const customerId = token ? jwtDecode(token).id : null;
// Modal.setAppElement('#root');

// // Define customer and mechanic icons
// const customerIcon = L.icon({
//   iconUrl: 'src/assets/working.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// const mechanicIcon = L.icon({
//   iconUrl: 'src/assets/mechanic-2.png',
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// // Haversine formula to calculate the distance between two points
// const haversineDistance = (lat1, lon1, lat2, lon2) => {
//   const toRad = (value) => (value * Math.PI) / 180;
//   const R = 6371; // Radius of the Earth in km
//   const dLat = toRad(lat2 - lat1);
//   const dLon = toRad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Distance in km
// };

// const MapComponent = ({ latitude, longitude, mechanics, radius = 5 }) => {
//   const mapRef = useRef(null);
//   const customerMarkerRef = useRef(null);
//   const markersRef = useRef([]);
//   const [selectedMechanic, setSelectedMechanic] = useState(null);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [position, setPosition] = useState([latitude, longitude]);

//   // Initialize the map once
//   useEffect(() => {
//     if (latitude && longitude && !mapRef.current) {
//       mapRef.current = L.map('map', {
//         center: [latitude, longitude],
//         zoom: 10,
//       });

//       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapRef.current);
//     }
//   }, [latitude, longitude]);

//   // Update customer marker when latitude or longitude changes
//   useEffect(() => {
//     if (latitude && longitude && mapRef.current) {
//       if (customerMarkerRef.current) {
//         customerMarkerRef.current.setLatLng([latitude, longitude]);
//       } else {
//         customerMarkerRef.current = L.marker([latitude, longitude], {
//           icon: customerIcon,
//           draggable: true, // Make marker draggable
//         })
//           .addTo(mapRef.current)
//           .bindPopup('Your location')
//           .openPopup();

//         // Handle dragend event to update position
//         customerMarkerRef.current.on('dragend', () => {
//           const newPosition = customerMarkerRef.current.getLatLng();
//           setPosition([newPosition.lat, newPosition.lng]);
//           updateLocationInDatabase(customerId,newPosition.lat, newPosition.lng);
//         });
//       }
//     }
//   }, [latitude, longitude]);

//   // Function to update customer location in the database
//   const updateLocationInDatabase = async (customerId,lat, lng) => {
//     try {
//       await axios.post('http://localhost:5000/api/customers/updateLocation', {
//         customerId:customerId,
//         latitude: lat,
//         longitude: lng,
  
//       });
//       console.log('Location updated in database for customer');
//     } catch (error) {
//       console.error('Error updating location in database:', error);
//     }
//   };

//   // Update the markers when mechanics change
//   useEffect(() => {
//     if (mapRef.current) {
//       // Clear existing markers
//       markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
//       markersRef.current = [];

//       mechanics.forEach((mechanic) => {
//         const { firstName, lastName, latitude: mechLat, longitude: mechLng, serviceCharge } = mechanic;

//         // Calculate distance using the Haversine formula
//         const distance = haversineDistance(latitude, longitude, mechLat, mechLng);

//         // Check if the mechanic is within the radius
//         if (distance <= radius) {
//           const marker = L.marker([mechLat, mechLng], { icon: mechanicIcon })
//             .addTo(mapRef.current)
//             .bindPopup(`<b>${firstName} ${lastName}</b><br/>Per Hour Charge: ${serviceCharge}<br/>Distance: ${distance.toFixed(2)} km`);

//           marker.on('click', () => {
//             setSelectedMechanic(mechanic);
//             setModalIsOpen(true);
//           });

//           markersRef.current.push(marker);
//         }
//       });
//     }
//   }, [latitude, longitude, mechanics, radius]);

//   // Handle scroll to close modal
//   useEffect(() => {
//     const handleScroll = () => {
//       if (modalIsOpen) {
//         setModalIsOpen(false);
//       }
//     };

//     if (modalIsOpen) {
//       window.addEventListener('scroll', handleScroll);
//     }

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [modalIsOpen]);

//   const sendRequest = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/requests', {
//         mechanicId: selectedMechanic._id,
//         latitude,
//         longitude,
//       });
//       setModalIsOpen(false);
//       alert('Request sent successfully');
//     } catch (error) {
//       console.error('Error sending request:', error);
//     }
//   };

//   return (
//     <>
//       <div id="map" style={{ height: '400px', width: '100%', marginTop: '50px' }}></div>
//       {selectedMechanic && (
//         <Modal
//           isOpen={modalIsOpen}
//           onRequestClose={() => setModalIsOpen(false)}
//           className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-80 max-w-sm z-50"
//           overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
//         >
//           <h2 className="text-lg font-bold mb-4">{selectedMechanic.firstName} {selectedMechanic.lastName}</h2>
//           <p className="bottom-2">Per Hour Charge: {selectedMechanic.serviceCharge}</p>
//           <div className="flex justify-between">
//             <button
//               onClick={sendRequest}
//               className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             >
//               Send Request
//             </button>
//             <button
//               onClick={() => setModalIsOpen(false)}
//               className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
//             >
//               Close
//             </button>
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default MapComponent;
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
const token = localStorage.getItem('token');
const customerId = token ? jwtDecode(token).id : null;
Modal.setAppElement('#root');

// Define customer and mechanic icons
const customerIcon = L.icon({
  iconUrl: 'src/assets/working.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const mechanicIcon = L.icon({
  iconUrl: 'src/assets/mechanic-2.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Haversine formula to calculate the distance between two points
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon1 - lon2);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

const MapComponent = ({ latitude, longitude, mechanics, radius = 5 }) => {
  const mapRef = useRef(null);
  const customerMarkerRef = useRef(null);
  const markersRef = useRef([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [position, setPosition] = useState([latitude, longitude]);

  // Initialize the map once
  useEffect(() => {
    if (latitude && longitude && !mapRef.current) {
      mapRef.current = L.map('map', {
        center: [latitude, longitude],
        zoom: 10,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, [latitude, longitude]);

  // Update customer marker when latitude or longitude changes
  useEffect(() => {
    if (latitude && longitude && mapRef.current) {
      if (customerMarkerRef.current) {
        customerMarkerRef.current.setLatLng([latitude, longitude]);
      } else {
        customerMarkerRef.current = L.marker([latitude, longitude], {
          icon: customerIcon,
          draggable: true, // Make marker draggable
        })
          .addTo(mapRef.current)
          .bindPopup('Your location')
          .openPopup();

        // Handle dragend event to update position and recalculate distances
        customerMarkerRef.current.on('dragend', () => {
          const newPosition = customerMarkerRef.current.getLatLng();
          setPosition([newPosition.lat, newPosition.lng]);
          updateLocationInDatabase(customerId, newPosition.lat, newPosition.lng);
          filterMechanics(newPosition.lat, newPosition.lng); // Recalculate distances and filter mechanics
        });
      }
    }
  }, [latitude, longitude]);

  // Function to update customer location in the database
  const updateLocationInDatabase = async (customerId, lat, lng) => {
    try {
      await axios.post('http://localhost:5000/api/customers/updateLocation', {
        customerId: customerId,
        latitude: lat,
        longitude: lng,
      });
      console.log('Location updated in database for customer');
    } catch (error) {
      console.error('Error updating location in database:', error);
    }
  };

  // Function to filter mechanics based on new position
  const filterMechanics = (newLat, newLng) => {
    // Clear existing markers
    markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
    markersRef.current = [];

    mechanics.forEach((mechanic) => {
      const { firstName, lastName, latitude: mechLat, longitude: mechLng, serviceCharge } = mechanic;

      // Calculate distance using the Haversine formula
      const distance = haversineDistance(newLat, newLng, mechLat, mechLng);

      // Check if the mechanic is within the radius
      if (distance <= radius) {
        const marker = L.marker([mechLat, mechLng], { icon: mechanicIcon })
          .addTo(mapRef.current)
          .bindPopup(`<b>${firstName} ${lastName}</b><br/>Per Hour Charge: ${serviceCharge}<br/>Distance: ${distance.toFixed(2)} km`);

        marker.on('click', () => {
          setSelectedMechanic(mechanic);
          setModalIsOpen(true);
        });

        markersRef.current.push(marker);
      }
    });
  };

  // Initial filter of mechanics
  useEffect(() => {
    filterMechanics(latitude, longitude);
  }, [latitude, longitude, mechanics, radius]);

  // Handle scroll to close modal
  useEffect(() => {
    const handleScroll = () => {
      if (modalIsOpen) {
        setModalIsOpen(false);
      }
    };

    if (modalIsOpen) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [modalIsOpen]);

  const sendRequest = async () => {
    try {
      await axios.post('http://localhost:5000/api/requests', {
        mechanicId: selectedMechanic._id,
        latitude,
        longitude,
      });
      setModalIsOpen(false);
      alert('Request sent successfully');
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <>
      <div id="map" style={{ height: '400px', width: '100%', marginTop: '50px' }}></div>
      {selectedMechanic && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-80 max-w-sm z-50"
          overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
        >
          <h2 className="text-lg font-bold mb-4">{selectedMechanic.firstName} {selectedMechanic.lastName}</h2>
          <p className="bottom-2">Per Hour Charge: {selectedMechanic.serviceCharge}</p>
          <div className="flex justify-between">
            <button
              onClick={sendRequest}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Send Request
            </button>
            <button
              onClick={() => setModalIsOpen(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MapComponent;
