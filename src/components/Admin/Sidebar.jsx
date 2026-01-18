import React from 'react';

const Sidebar = () => {
  const handleLogout = () => {
    // Replace this with your actual logout logic
    alert('Logout clicked!');
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 flex flex-col">
      <div>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Aprica</h1>
        </div>
        <nav className="mt-6">
          <div>
            <a className="flex items-center px-6 py-3 text-gray-700 bg-gray-100" href="/admin">
              <span className="font-medium">Dashboard</span>
            </a>
            <a className="flex items-center px-6 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700" href="#">
              <span>Users</span>
            </a>
            <a className="flex items-center px-6 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700" href="#">
              <span>Audio</span>
            </a>
            <a className="flex items-center px-6 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700" href="#">
              <span>Reports</span>
            </a>
            <a className="flex items-center px-6 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700" href="#">
              <span>Settings</span>
            </a>
          </div>
        </nav>
      </div>
      <div className="mt-auto p-6">
        <button 
          onClick={handleLogout} 
          className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
