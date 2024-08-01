import React from 'react';

const MechanicPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-red-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mechanic Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-gray-200">Home</a></li>
              <li><a href="#" className="hover:text-gray-200">Services</a></li>
              <li><a href="#" className="hover:text-gray-200">Profile</a></li>
              <li><a href="#" className="hover:text-gray-200">Logout</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="container mx-auto p-8">
        <section className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome, Mechanic!</h2>
          <p className="text-gray-600">Here you can manage your services, view requests, and update your profile.</p>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Current Requests</h3>
            <p className="text-gray-600">View and manage your current service requests.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Service History</h3>
            <p className="text-gray-600">Check your past service records.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Profile Settings</h3>
            <p className="text-gray-600">Update your profile information and preferences.</p>
          </div>
        </section>
      </main>
      
      <footer className="bg-red-600 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 MobileMechanic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MechanicPage;
