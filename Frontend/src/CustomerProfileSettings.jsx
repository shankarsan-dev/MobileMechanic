// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'; // Ensure jwt-decode is installed
// import React, { useEffect, useState } from 'react';

// const server = 'http://localhost:5000'; // Adjust as needed

// const CustomerProfileSettings = () => {
//   const [profile, setProfile] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phoneNumber: '',
//     password: '',
//   });
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');

//   // Function to fetch customer profile data
//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No token found. Please log in.');
//         return;
//       }
//       const decodedToken = jwtDecode(token); // Decode the JWT token
//       const customerId = decodedToken.customerId;

//       const response = await axios.get(`${server}/api/customers/profile`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setProfile(response.data);
//     } catch (err) {
//       setError('Failed to fetch profile data.');
//     }
//   };

//   // Function to handle form submission (update profile)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('No token found. Please log in.');
//         return;
//       }

//       const decodedToken = jwtDecode(token);
//       const customerId = decodedToken.customerId;

//       const response = await axios.put(
//         `${server}/api/customers/profile/${customerId}`,
//         profile,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setMessage('Profile updated successfully.');
//     } catch (err) {
//       setError('Failed to update profile.');
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   // Fetch customer profile data when component mounts
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

//       {error && <p className="text-red-600 mb-4">{error}</p>}
//       {message && <p className="text-green-600 mb-4">{message}</p>}

//       <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">First Name</label>
//           <input
//             type="text"
//             name="firstName"
//             value={profile.firstName}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Last Name</label>
//           <input
//             type="text"
//             name="lastName"
//             value={profile.lastName}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={profile.email}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Phone Number</label>
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={profile.phoneNumber}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={profile.password}
//             onChange={handleChange}
//             className="border rounded w-full py-2 px-3"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CustomerProfileSettings;

    import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure jwt-decode is installed
import React, { useEffect, useState } from 'react';

    const server = 'http://localhost:5000'; // Adjust as needed

    const CustomerProfileSettings = () => {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '', // Add initial empty strings to ensure controlled inputs
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Function to fetch customer profile data
    const fetchProfile = async () => {
        try {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        const decodedToken = jwtDecode(token); // Decode the JWT token
        const customerId = decodedToken.id;

        const response = await axios.get(`${server}/api/customers/profile/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        setProfile({
            firstName: response.data.firstName || '',
            lastName: response.data.lastName || '',
            email: response.data.email || '',
            phoneNumber: response.data.phoneNumber || '',
            password: '', // Password field remains empty on load
        });
        } catch (err) {
        setError('Failed to fetch profile data.');
        }
    };

    // Function to handle form submission (update profile)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        const decodedToken = jwtDecode(token);
        const customerId = decodedToken.id;

        const response = await axios.put(
            `${server}/api/customers/profile/${customerId}`
        );

        setMessage('Profile updated successfully.');
        } catch (err) {
        setError('Failed to update profile.');
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Fetch customer profile data when component mounts
    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {message && <p className="text-green-600 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">First Name</label>
            <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Last Name</label>
            <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Email</label>
            <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Phone Number</label>
            <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
                required
            />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-bold mb-2">Password</label>
            <input
                type="password"
                name="password"
                value={profile.password}
                onChange={handleChange}
                className="border rounded w-full py-2 px-3"
            />
            </div>

            <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
            Update Profile
            </button>
        </form>
        </div>
    );
    };

    export default CustomerProfileSettings;
