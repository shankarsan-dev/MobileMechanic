import axios from 'axios';
import React, { useEffect, useState } from 'react';

const server = 'http://localhost:5000'; // Adjust as needed

const AdminFetchCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch customers data
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${server}/api/customers/all`);
      setCustomers(response.data);
    } catch (err) {
      setError('Failed to fetch customers');
    }
  };

  // Function to delete a customer
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/api/customers/${id}`);
      // Refresh the list after deletion
      fetchCustomers();
    } catch (err) {
      setError('Failed to delete customer');
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Customers List</h2>
      {error && <p className="text-red-600">{error}</p>}
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td className="py-2 px-4 border-b">{customer.firstName}</td>
              <td className="py-2 px-4 border-b">{customer.lastName}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">{customer.phoneNumber}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(customer._id)}
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

export default AdminFetchCustomers;
