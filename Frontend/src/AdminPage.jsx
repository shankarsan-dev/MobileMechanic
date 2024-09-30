// import React from 'react';
// import { Link } from 'react-router-dom';

// const server = 'http://localhost:5000'; // Adjust as needed

// const AdminPage = () => {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
        
//       <img src="Frontend\src\assets\mechanic-2.png" alt="" />
//       {/* Button Box for Navigation */}
//       <div className="mb-6 justify-evenly align-middle">
//         <Link to="/admin/mechanics">
//           <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 max-w-sm">
//             <img src="src/assets/mechanic-2.png" alt="not found" />
//             Mechanic Details
//           </button>

//         </Link>
//         <Link to="/admin/customers">
//           <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 max-w-sm">
//             <img src="src/assets/working.png" alt="" />
//             Customer Details
//           </button>
//         </Link>
//         <Link to="/admin/services">
//           <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 max-w-sm">
//             <img src="src/assets/services.png" alt="" />
//             Service Details
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
// import React from 'react';
// import { Link } from 'react-router-dom';

// const server = 'http://localhost:5000'; // Adjust as needed

// const AdminPage = () => {
//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center"> {/* Centering the content */}
//       <div className="flex flex-row items-center space-x-4 justify-center"> {/* Horizontal spacing */}
//         <Link to="/admin/mechanics">
//           <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 max-w-sm flex items-center">
//             <img src="src/assets/mechanic-2.png" alt="not found" className="mr-2" />
//             Mechanic Details
//           </button>
//         </Link>

//         <Link to="/admin/customers">
//           <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 max-w-sm flex items-center">
//             <img src="src/assets/working.png" alt="" className="mr-2" />
//             Customer Details
//           </button>
//         </Link>

//         <Link to="/admin/services">
//           <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 max-w-sm flex items-center">
//             <img src="src/assets/services.png" alt="" className="mr-2" />
//             Service Details
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AdminPage;
import React from 'react';
import { Link } from 'react-router-dom';

const server = 'http://localhost:5000'; // Adjust as needed

const AdminPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center"> {/* Centering the content */}
  
      <div className="flex flex-row items-center space-x-4 justify-center"> {/* Horizontal spacing */}
        <Link to="/admin/mechanics">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 max-w-sm flex flex-col items-center"> {/* Flex column for image and text */}
            <img src="src/assets/mechanic-2.png" alt="Mechanic Details" className="mb-2" /> {/* Space below image */}
            Mechanic Details
          </button>
        </Link>

        <Link to="/admin/customers">
          <button   className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 max-w-sm flex flex-col items-center"> {/* Flex column for image and text */}
            <img src="src/assets/working.png" alt="Customer Details" className="mb-2" /> {/* Space below image */}
            Customer Details
          </button>
        </Link>

        <Link to="/admin/services">
          <button className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 max-w-sm flex flex-col items-center"> {/* Flex column for image and text */}
            <img src="src/assets/services.png" alt="Service Details" className="mb-2" /> {/* Space below image */}
            Service Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
