import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet';
import NotificationComponent from './NotificationComponent';
import RatingComponent from './RatingComponent';

const NewMapComponent = ({ serviceId, customerId, mechanicId, socket }) => {
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
