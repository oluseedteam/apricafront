import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="w-full py-20 bg-gray-50 px-4">
      <div className="max-w-5xl mx-auto text-center">
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
        <p className="text-gray-500 mb-12">Start for free, upgrade when you scale.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Free Plan */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col">
            <div className="text-left mb-6">
              <h3 className="text-lg font-bold text-gray-900">Starter</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold tracking-tight">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Perfect for hobbyists.</p>
            </div>
            
            <ul className="space-y-4 mb-8 text-left text-sm text-gray-600 flex-1">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                5,000 characters / mo
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Access to 10 basic voices
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Standard quality (128kbps)
              </li>
            </ul>

            <button className="w-full py-3 px-4 bg-gray-100 text-black font-bold rounded-xl hover:bg-gray-200 transition">
              Get Started
            </button>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-black text-white p-8 rounded-3xl shadow-xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">POPULAR</div>
            
            <div className="text-left mb-6">
              <h3 className="text-lg font-bold text-white">Creator Pro</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold tracking-tight">$29</span>
                <span className="text-gray-400">/month</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">For serious content creators.</p>
            </div>
            
            <ul className="space-y-4 mb-8 text-left text-sm text-gray-300 flex-1">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Unlimited characters
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                All 50+ Premium Voices
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Studio Quality (320kbps)
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Commercial License
              </li>
            </ul>

            <button className="w-full py-3 px-4 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition transform hover:scale-105">
              Upgrade to Pro
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;