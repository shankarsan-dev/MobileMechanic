import axios from 'axios';
import React, { useEffect, useState } from 'react';

const server = 'http://localhost:5000'; // Adjust as needed

const AdminFetchServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch services data
  const fetchServices = async () => {
    try {
      const response = await axios.get(`${server}/api/services`);
      setServices(response.data);
    } catch (err) {
      setError('Failed to fetch services');
    }
  };

  // Function to delete a service
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/api/services/${id}`);
      // Refresh the list after deletion
      fetchServices();
    } catch (err) {
      setError('Failed to delete service');
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Services List</h2>
      {error && <p className="text-red-600">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Vehicle Type</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Mechanic</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="py-2 px-4 border-b">{service.vehicleType}</td>
              <td className="py-2 px-4 border-b">{service.description}</td>
              <td className="py-2 px-4 border-b">{service.status}</td>
              <td className="py-2 px-4 border-b">{service.customerId.firstName} {service.customerId.lastName}</td>
              <td className="py-2 px-4 border-b">{service.mechanicId.firstName} {service.mechanicId.lastName}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminFetchServices;
