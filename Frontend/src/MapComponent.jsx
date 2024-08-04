import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import React, { useEffect, useRef } from 'react';

const MapComponent = ({ latitude, longitude, mechanics }) => {
  const mapRef = useRef(null);

  useEffect(() => {
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

    // Add a marker for the customer's location
    L.marker([latitude, longitude])
      .addTo(mapRef.current)
      .bindPopup('Your location')
      .openPopup();

    // Add markers for each mechanic
    mechanics.forEach((mechanic) => {
      const { firstName, lastName, latitude: mechLat, longitude: mechLng } = mechanic;
      if (mechLat && mechLng) {
        L.marker([mechLat, mechLng])
          .addTo(mapRef.current)
          .bindPopup(`<b>${firstName} ${lastName}</b>`)
          .openPopup();
          console.log(firstName);
      }
    });

  }, [latitude, longitude, mechanics]);

  return (
    <div id="map" style={{ height: '600px', width: '100%' }}></div>
  );
};

export default MapComponent;
