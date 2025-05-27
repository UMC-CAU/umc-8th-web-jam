import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Sidebar from '../components/Sidebar.tsx';

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2C3E50] text-white">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1">
        <div
          className={`${isSidebarOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}
        >
          <Sidebar />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
