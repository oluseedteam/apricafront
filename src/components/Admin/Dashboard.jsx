import React from 'react';
import Sidebar from './Sidebar';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      
      {/* 1. Sidebar Component */}
      <Sidebar />

      {/* 2. Main Content (Offset by sidebar width ml-64) */}
      <div className="flex-1 ml-64 p-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-gray-500">Welcome back, Admin.</p>
          </div>
          <div className="flex items-center gap-4">
             <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">Download Report</button>
             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600 border border-gray-300">
                AD
             </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Total Users</p>
                  <h3 className="text-3xl font-bold text-gray-900">12,405</h3>
               </div>
               <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
               </span>
            </div>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full mt-4 inline-block">+15% this month</span>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Audio Generated</p>
                    <h3 className="text-3xl font-bold text-gray-900">842 hrs</h3>
                </div>
                <span className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                </span>
            </div>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full mt-4 inline-block">+8% this week</span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-500 font-medium mb-1">Revenue</p>
                    <h3 className="text-3xl font-bold text-gray-900">$45.2k</h3>
                </div>
                <span className="p-2 bg-green-50 text-green-600 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
            </div>
            <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full mt-4 inline-block">+12% this month</span>
          </div>
        </div>

        {/* Recent Activity Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">Recent Generations</h3>
            <button className="text-sm text-gray-500 hover:text-black">View all</button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase font-semibold text-gray-500">
                   <tr>
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Input Type</th>
                      <th className="px-6 py-3">Language</th>
                      <th className="px-6 py-3">Voice</th>
                      <th className="px-6 py-3">Status</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                   <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">Phoenix Admin</td>
                      <td className="px-6 py-4">Text Input</td>
                      <td className="px-6 py-4">English (Naija)</td>
                      <td className="px-6 py-4">Idera</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Completed</span></td>
                   </tr>
                   <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">sarah_j@gmail.com</td>
                      <td className="px-6 py-4">URL Import</td>
                      <td className="px-6 py-4">French</td>
                      <td className="px-6 py-4">Camille</td>
                      <td className="px-6 py-4"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Processing</span></td>
                   </tr>
                   <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">mike_dev@yahoo.com</td>
                      <td className="px-6 py-4">Document (PDF)</td>
                      <td className="px-6 py-4">English</td>
                      <td className="px-6 py-4">Jude</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Completed</span></td>
                   </tr>
                   <tr className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900">tayo.business@co.ng</td>
                      <td className="px-6 py-4">Text Input</td>
                      <td className="px-6 py-4">Yoruba</td>
                      <td className="px-6 py-4">Remi</td>
                      <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Completed</span></td>
                   </tr>
                </tbody>
             </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
