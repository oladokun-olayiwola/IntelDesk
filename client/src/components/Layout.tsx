import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow px-6 py-8 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
      <footer className="bg-white border-t text-center py-4 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} IntelDesk — Created by Ibrahim Oladokun.
      </footer>
    </div>
  );
};

export default Layout;
