import React from 'react';

const CustomAlert = ({ show, message, onClose }) => {
  if (!show) return null; // Don't render if not shown

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <p className="text-gray-800 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
