// import React, { useState } from 'react';

// const PopupForm = ({ onClose, onSave }) => {
//   const [charge, setCharge] = useState('');
//   const [error, setError] = useState('');

//   const handleSave = () => {
//     const numericCharge = Number(charge);
//     if (numericCharge >= 100 && numericCharge <= 10000) {
//       setError('');
//       onSave(numericCharge);
//     } else {
//       setError('Please enter a valid charge between  100 a nd 10000.');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Enter Service Charge</h2>
//         <input
//           type="number"
//           value={charge}
//           onChange={(e) => setCharge(e.target.value)}
//           className="border p-2 w-full mb-4"
//           placeholder="Enter charge (50 - 10000)"
//         />
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <div className="flex justify-end">
//           <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
//           <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PopupForm;
import React, { useState } from 'react';

const PopupForm = ({ onClose, onSave }) => {
  const [charge, setCharge] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const numericCharge = Number(charge);
    if (numericCharge >= 100 && numericCharge <= 10000) {
      setError('');
      onSave(numericCharge);
    } else {
      setError('Please enter a valid charge between 100 and 10000.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Enter Service Charge</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={charge}
            onChange={(e) => setCharge(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="Enter charge (100 - 10000)"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
