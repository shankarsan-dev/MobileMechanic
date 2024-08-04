import axios from 'axios'; // Import axios for HTTP requests
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import React, { useEffect, useRef } from 'react';

// Define custom icons using local paths
const customerIcon = L.icon({
  iconUrl: 'src/assets/working.png', // Path relative to public directory
  iconSize: [52, 52], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const mechanicIcon = L.icon({
  iconUrl: 'src/assets/mechanic-2.png', // Path relative to public directory
  iconSize: [52, 52], // Size of the icon
  iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
});

const MapComponent = ({ latitude, longitude, mechanics }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Ensure the map container is available
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('Map container not found');
      return;
    }

    // Log latitude and longitude for debugging
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    // Initialize the map if not already initialized
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        center: [latitude, longitude],
        zoom: 12,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    } else {
      // Update the map center if map is already initialized
      mapRef.current.setView([latitude, longitude], 12);
    }

    // Clear previous markers
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Add a marker for the customer's location with custom icon
    if (latitude && longitude) {
      L.marker([latitude, longitude], { icon: customerIcon })
        .addTo(mapRef.current)
        .bindPopup('Your location')
        .openPopup();
    } else {
      console.error('Invalid customer location coordinates');
    }

    // Add markers for each mechanic with custom icon and detailed popup
    mechanics.forEach((mechanic) => {
      const { firstName, lastName, email, phoneNumber, latitude: mechLat, longitude: mechLng } = mechanic;
      if (mechLat && mechLng) {
        const popupContent = `
          <div>
            <b>${firstName} ${lastName}</b><br/>
            <b>Email:</b> ${email}<br/>
            <b>Phone:</b> ${phoneNumber}<br/>
            <button onclick="requestMechanic('${mechanic._id}')">Request Mechanic</button>
          </div>
        `;

        L.marker([mechLat, mechLng], { icon: mechanicIcon })
          .addTo(mapRef.current)
          .bindPopup(popupContent);
      } else {
        console.error('Invalid mechanic location coordinates:', mechanic);
      }
    });

  }, [latitude, longitude, mechanics]);

  // Function to handle the mechanic request
  const requestMechanic = async (mechanicId) => {
    try {
      const response = await axios.post('/api/requestMechanic', { mechanicId });
      alert('Request sent successfully!');
    } catch (error) {
      console.error('Error sending request:', error);
      alert('Failed to send request.');
    }
  };

  // Make the requestMechanic function globally accessible for popup buttons
  window.requestMechanic = requestMechanic;

  return (
    <div id="map" style={{ height: '600px', width: '100%' }}></div>
  );
};

export default MapComponent;
