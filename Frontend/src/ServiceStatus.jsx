import React, { useState } from 'react';

const ServiceStatus = () => {
  // Mechanic side state
  const [mechanicStatus, setMechanicStatus] = useState('onTheWay');
  const [mechanicETA, setMechanicETA] = useState('15 mins');

  // Customer side state
  const [customerView, setCustomerView] = useState(true); // Toggle for mechanic or customer
  const [serviceCompleted, setServiceCompleted] = useState(false);

  // Simulating status changes
  const handleStatusChange = (newStatus) => {
    setMechanicStatus(newStatus);
    if (newStatus === 'jobCompleted') {
      setServiceCompleted(true);
    }
  };

  return (
    <div className="p-8 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">{customerView ? 'Customer View' : 'Mechanic View'}</h1>
      <div className="mb-6">
        <button 
          onClick={() => setCustomerView(!customerView)} 
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Switch to {customerView ? 'Mechanic View' : 'Customer View'}
        </button>
      </div>

      {/* Mechanic's view */}
      {!customerView && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Mechanic Panel</h2>
          <p><strong>Accepted Request from:</strong> John Doe</p>
          <p><strong>Service Requested:</strong> Tire Replacement</p>
          <p><strong>Customer Location:</strong> 1234 Main St</p>

          {/* Status Update */}
          <h3 className="text-lg font-semibold mt-6 mb-3">Service Status</h3>
          <div className="space-x-4">
            <button 
              onClick={() => handleStatusChange('onTheWay')} 
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
            >
              On the Way
            </button>
            <button 
              onClick={() => handleStatusChange('arrived')} 
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            >
              Arrived
            </button>
            <button 
              onClick={() => handleStatusChange('jobCompleted')} 
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Job Completed
            </button>
          </div>

          {/* Display Mechanic Status */}
          <div className="mt-6 text-green-600">
            <p><strong>Current Status:</strong> {mechanicStatus === 'onTheWay' ? 'On the Way' : mechanicStatus === 'arrived' ? 'Arrived' : 'Job Completed'}</p>
            {mechanicStatus === 'onTheWay' && <p><strong>ETA:</strong> {mechanicETA}</p>}
          </div>
        </div>
      )}

      {/* Customer's view */}
      {customerView && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Customer Panel</h2>
          <p><strong>Your request has been accepted by:</strong> Jane Smith</p>
          <p><strong>Mechanic Contact:</strong> (123) 456-7890</p>

          {/* Map Simulation */}
          <div className="mt-6 bg-gray-200 p-4 rounded-lg">
            <p><strong>Mechanic Location:</strong> [Map showing real-time location]</p>
            <p><strong>Status:</strong> {mechanicStatus === 'onTheWay' ? 'Mechanic is on the way' : mechanicStatus === 'arrived' ? 'Mechanic has arrived' : 'Service Completed'}</p>
          </div>

          {/* Completion Section */}
          {serviceCompleted && (
            <div className="mt-6 bg-yellow-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Service Completed</h3>
              <p>Rate the Mechanic:</p>
              <input 
                type="number" 
                min="1" 
                max="5" 
                className="border border-gray-300 rounded p-2 mb-4 w-full" 
                placeholder="Rating (1-5)"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Submit Review</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceStatus;
