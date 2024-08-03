  // frontend/src/MapComponent.js
  import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
  
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });
  
  const MapComponent = ({ latitude, longitude, mechanics }) => {
    const location = [latitude, longitude];
  
    return (
      <MapContainer center={location} zoom={13} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location}>
          <Popup>You are here</Popup>
        </Marker>
        {mechanics.map((mechanic) => (
          <Marker key={mechanic._id} position={mechanic.location.coordinates.reverse()}>
            <Popup>{mechanic.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    );
  };
  
  export default MapComponent;
  