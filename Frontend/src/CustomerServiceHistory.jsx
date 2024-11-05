// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const server = 'http://localhost:5000'; // Adjust as needed

// const CustomerServiceHistory = () => {
//   const [services, setServices] = useState([]);
//   const [error, setError] = useState('');

//   // Function to fetch services data
//   const fetchServices = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get(`${server}/api/customers/services/${id}`
//        // , {headers: { Authorization: `Bearer ${token}` },}
//     );
//       setServices(response.data);
//     } catch (err) {
//       setError('Failed to fetch services');
//     }
//   };

//   // Use useEffect to fetch data when the component mounts
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">Services List</h2>
//       {error && <p className="text-red-600">{error}</p>}
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b">Vehicle Type</th>
//             <th className="py-2 px-4 border-b">Description</th>
//             <th className="py-2 px-4 border-b">Status</th>
//             <th className="py-2 px-4 border-b">Customer</th>
//             <th className="py-2 px-4 border-b">Mechanic</th>
//             <th className="py-2 px-4 border-b">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {services.map((service) => (
//             <tr key={service._id}>
//               <td className="py-2 px-4 border-b">{service.vehicleType}</td>
//               <td className="py-2 px-4 border-b">{service.description}</td>
//               <td className="py-2 px-4 border-b">{service.status}</td>
//               <td className="py-2 px-4 border-b">
//                 {service.customerId.firstName} {service.customerId.lastName}
//               </td>
//               <td className="py-2 px-4 border-b">
//                 {service.mechanicId ? (
//                   <>
//                     {service.mechanicId.firstName} {service.mechanicId.lastName}
//                   </>
//                 ) : (
//                   'Not Assigned' // Fallback text when no mechanic is assigned
//                 )}
//               </td>
           
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomerServiceHistory;
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Install jwt-decode if not already
import React, { useEffect, useState } from 'react';

const server = 'http://localhost:5000'; // Adjust as needed

const CustomerServiceHistory = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch services data
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found, please log in.');
        return;
      }

      const decodedToken = jwtDecode(token); // Decode the JWT token
      const customerId = decodedToken.id; // Extract customerId from the token
      console.log("customerid: "+customerId);
      const response = await axios.get(`${server}/api/customers/services/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setServices(response.data);
    } catch (err) {
      setError('Failed to fetch services');
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
            <th className="py-2 px-4 border-b">Mechanic</th>
            <th className="py-2 px-4 border-b">phone-number</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service._id}>
              <td className="py-2 px-4 border-b">{service.vehicleType}</td>
              <td className="py-2 px-4 border-b">{service.description}</td>
              <td className="py-2 px-4 border-b">{service.status}</td>
              <td className="py-2 px-4 border-b">
                {service.mechanicId ? (
                  <>
                    {service.mechanicId.firstName} {service.mechanicId.lastName}
                  </>
                ) : (
                  'Not Assigned' // Fallback text when no mechanic is assigned
                )}
                
              </td>
              <td className="py-2 px-4 border-b">
                {service.mechanicId ? (
                  <>
                    {service.mechanicId.phoneNumber}
                  </>
                ) : (
                  'Not Assigned' // Fallback text when no mechanic is assigned
                )}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerServiceHistory;
