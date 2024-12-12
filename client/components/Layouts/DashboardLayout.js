import React from 'react';
import Sidebar from './navigation/Sidebar';
import Header from './navigation/Header';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:ml-64 min-h-screen"> {/* Sidebar margin only on medium+ screens */}
        <Header />
        <main className="p-4 md:p-6"> {/* Smaller padding on mobile */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
