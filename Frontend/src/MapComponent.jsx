// frontend/src/MapComponent.js
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = () => {
  const [mechanics, setMechanics] = useState([]);
  const [location, setLocation] = useState(null);
  const [additionalMarkerLocation, setAdditionalMarkerLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation([position.coords.latitude, position.coords.longitude]);
    });
  }, []);
  useEffect(() => {
    if (location) {
      const fetchMechanics = async () => {
        const response = await axios.get('http://localhost:5000/api/mechanics', {
          params: {
            lng: location[1],
            lat: location[0],
          },
        });
        setMechanics(response.data);
      };
      fetchMechanics();
    }
  }, [location]);

  const handleAddMarker = () => {
    // Define the location for the additional marker
    setAdditionalMarkerLocation([location[0] + 0.01, location[1] + 0.01]);
  };

  if (!location) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button onClick={handleAddMarker} style={{ marginBottom: '10px' }}>find marker</button>
      <MapContainer center={location} zoom={13} style={{ height: '80vh', width: '80%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location}>
          <Popup>You are here</Popup>
        </Marker>
        {additionalMarkerLocation && (
          <Marker position={additionalMarkerLocation}>
            <Popup>Additional Marker</Popup>
          </Marker>
        )}
        {mechanics.map((mechanic) => (
          <Marker key={mechanic._id} position={mechanic.location.coordinates.reverse()}>
            <Popup>{mechanic.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapComponent;
