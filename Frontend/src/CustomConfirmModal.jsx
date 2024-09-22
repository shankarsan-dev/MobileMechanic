// CustomConfirmModal.js
import React from 'react';

const CustomConfirmModal = ({ visible, onClose, onAccept, vehicleType, description }) => {
  if (!visible) return null; // Do not render if not visible

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">New Service Request</h2>
        <p className="mb-2"><strong>Vehicle Type:</strong> {vehicleType}</p>
        <p className="mb-4"><strong>Description:</strong> {description}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomConfirmModal;
