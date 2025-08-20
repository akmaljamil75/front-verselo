import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getSession, removeSession } from '../services/session.service';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const { user } = getSession();

  const handleLogout = () => {
    removeSession();
    toast.success("Logged out successfully!");
    navigate('/login'); // Redirect ke halaman login (ubah sesuai route kamu)
  };

  // Fungsi untuk menutup sidebar jika di mobile
  const handleSidebarLinkClick = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  // Tutup dropdown saat klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LEFT: Logo & Sidebar Toggle */}
            <div className="flex items-center space-x-2">
              <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-xl font-bold text-indigo-700">Prompt AI</span>
            </div>

            {/* RIGHT: User Info & Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center space-x-4 cursor-pointer" onClick={() => setDropdownOpen(prev => !prev)}>
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-gray-700 font-medium">{user?.name || 'Guest'}</span>
                  <span className="text-gray-500 text-sm">{user?.email || 'user@example.com'}</span>
                </div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-200"
                />
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
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
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition" onClick={handleSidebarLinkClick}>Dashboard</Link>
            <Link to="/product-categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition" onClick={handleSidebarLinkClick}>Product Categories</Link>
            <Link to="/products" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition" onClick={handleSidebarLinkClick}>Products</Link>
            <Link to="/transactions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition" onClick={handleSidebarLinkClick}>Transactions</Link>
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
