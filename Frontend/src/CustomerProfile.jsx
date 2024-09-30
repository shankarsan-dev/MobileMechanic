// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// const server = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

// const CustomerProfile = () => {
//   const [profile, setProfile] = useState({
//     email: '',
//     phone: '',
//     address: '',
//     profilePicture: null,
//   });
//   const [preview, setPreview] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get(`${server}/api/customers/profile`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setProfile({
//           email: response.data.email,
//           phone: response.data.phone,
//           address: response.data.address,
//           profilePicture: response.data.profilePicture,
//         });
//         setPreview(response.data.profilePicture);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProfile((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setProfile((prevState) => ({
//       ...prevState,
//       profilePicture: file,
//     }));

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
//     formData.append('email', profile.email);
//     formData.append('phone', profile.phone);
//     formData.append('address', profile.address);
//     if (profile.profilePicture instanceof File) {
//       formData.append('profilePicture', profile.profilePicture);
//     }

//     try {
//       await axios.put(`${server}/api/customers/profile`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert('Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile');
//     }
//   };

//   const handleLogoutClick = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <header className="bg-red-600 text-white p-4 shadow-md">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-3xl font-bold">Customer Profile</h1>
//           <nav>
//             <ul className="flex space-x-4">
//               <li><a href="/" className="hover:text-gray-200">Home</a></li>
//               <li><a href="/customer" className="hover:text-gray-200">Dashboard</a></li>
//               <li><a href="" onClick={handleLogoutClick} className="hover:text-gray-200">Logout</a></li>
//             </ul>
//           </nav>
//         </div>
//       </header>

//       <main className="container mx-auto p-8">
//         <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
//           <h2 className="text-2xl font-bold text-gray-700 mb-4">Update Profile</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={profile.email}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">Phone</label>
//               <input
//                 type="text"
//                 id="phone"
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 value={profile.address}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//                 required
//               />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="profilePicture" className="block text-gray-700 font-bold mb-2">Profile Picture</label>
//               <input
//                 type="file"
//                 id="profilePicture"
//                 name="profilePicture"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 className="w-full px-3 py-2 border rounded-lg"
//               />
//               {preview && (
//                 <img src={preview} alt="Profile Preview" className="mt-4 w-32 h-32 rounded-full object-cover" />
//               )}
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-700"
//             >
//               Update Profile
//             </button>
//           </form>
//         </section>
//       </main>

//       <footer className="bg-red-600 text-white p-4 mt-8">
//         <div className="container mx-auto text-center">
//           <p>&copy; 2024 MobileMechanic. All rights reserved.</p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default CustomerProfile;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const server = 'http://localhost:5000';

const DisplayProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${server}/api/customers/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: response.data.phoneNumber,
          address: response.data.address,
          profilePicture: response.data.profilePicture,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    
    <div className="min-h-screen bg-slate-50 flex flex-col">

      <main className="container mx-auto flex-grow p-8 flex justify-center items-center">
        <section className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg w-full">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Profile Information</h2>
          <div className="flex flex-col items-center mb-4">
            {profile.profilePicture && (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            )}
            <div className='text-center'>
              <p className="text-gray-700 font-bold text-xl">{profile.firstName} {profile.lastName}</p>
              <p className="text-gray-700">Email: {profile.email}</p>
              <p className="text-gray-700">Phone: {profile.phone}</p>
              <p className="text-gray-700">Address: {profile.address}</p>
  
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-red-600 text-white p-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MobileMechanic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DisplayProfile;
