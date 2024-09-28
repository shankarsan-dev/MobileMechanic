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

const MechanicMapComponent = ({ socket }) => {
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

  // Emit the availability event when the map is ready
  const handleMapReady = () => {
    if (mId) {
      socket.emit("MsetAvailable", mId);
      console.log('MsetAvailable event emitted for mechanic ID:', mId);
    }
  };

  return (
    loading ? (
      <div>Loading map...</div> // Show a loading message or spinner
    ) : (
      position && (
        <MapContainer 
          center={position} 
          zoom={13} 
          style={{ height: '100vh', width: '100%' }} 
          whenReady={handleMapReady} // Emit when the map is ready
        >
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
