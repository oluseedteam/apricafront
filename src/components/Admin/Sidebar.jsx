import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 fixed h-full z-10">
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
  );
};

export default Sidebar;
