import axios from 'axios';
import React, { useEffect, useState } from 'react';

const server = 'http://localhost:5000'; // Adjust as needed

const AdminFetchMechanic = () => {
  const [mechanics, setMechanics] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch mechanics data
  const fetchMechanics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${server}/api/admin/mechanics`,{
        headers: { Authorization: `Bearer ${token}`},
      });
      setMechanics(response.data);
    } catch (err) {
      setError('Failed to fetch mechanics');
    }
  };

  // Function to delete a mechanic
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/api/admin/mechanics/${id}`);
      // Refresh the list after deletion
      fetchMechanics();
    } catch (err) {
      setError('Failed to delete mechanic');
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchMechanics();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Mechanics List</h2>
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
          {mechanics.map((mechanic) => (
            <tr key={mechanic._id}>
              <td className="py-2 px-4 border-b">{mechanic.firstName}</td>
              <td className="py-2 px-4 border-b">{mechanic.lastName}</td>
              <td className="py-2 px-4 border-b">{mechanic.email}</td>
              <td className="py-2 px-4 border-b">{mechanic.phoneNumber}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(mechanic._id)}
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

export default AdminFetchMechanic;

