import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSession, removeSession } from '../services/session.service';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = getSession();

  const handleLogout = () => {
    removeSession();
    toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto max-w-7xl flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <button className="md:hidden mr-2" onClick={() => setSidebarOpen(true)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
            <span className="text-xl font-bold text-indigo-700 tracking-tight">Prompt AI</span>
        </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-gray-700 font-medium">{user?.name || 'Guest'}</span>
            <span className="text-gray-500 text-sm hidden sm:block">{user?.email || 'user@example.com'}</span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-200"
                />
          </div>
          </div>
        </header>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:w-64 md:static md:z-auto`}> 
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 md:hidden">
            <span className="text-lg font-bold text-indigo-700">Prompt AI</span>
            <button onClick={() => setSidebarOpen(false)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition">Dashboard</Link>
            <Link to="/product-categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition">Product Categories</Link>
            <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition">Products</Link>
            <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition">Settings</Link>
            <button onClick={handleLogout} className="mt-4 w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition">Logout</button>
          </nav>
        </aside>
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        {/* Main Content */}
        <main className="flex-1 min-w-0 flex flex-col">
          <div className="container mx-auto max-w-7xl flex-1 px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 