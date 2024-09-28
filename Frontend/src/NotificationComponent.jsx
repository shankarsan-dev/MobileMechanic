import React, { useEffect } from 'react';

const NotificationComponent = ({ notification, onClose }) => {
  const { title, message } = notification;

  // Automatically close the notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer); // Clear timeout on component unmount or close
  }, [onClose]);

  return (
    <div className="absolute  top-5 right-5 bg-white border border-gray-300 shadow-lg p-4 rounded-lg w-72 z-50">
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-lg">{title}</h4>
        <button onClick={onClose} className="text-red-500 font-bold">X</button>
      </div>
      <p className="text-gray-700 mt-2">{message}</p>
    </div>
  );
};

export default NotificationComponent;
