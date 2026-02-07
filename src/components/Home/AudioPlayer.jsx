import React from 'react';

const AudioPlayer = () => {
  return (
    <div className="w-full max-w-xl mt-8 animate-fade-in-up">
      {/* Container */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-5">
        
        {/* Header Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs">
              ID
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Idera (Female)</h3>
              <p className="text-xs text-gray-500">English (Naija) • 98% Clarity</p>
            </div>
          </div>
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full border border-green-200">
            GENERATED
          </span>
        </div>

        {/* Player Controls & Waveform */}
        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
          
          {/* Play Button */}
          <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-black text-white rounded-full hover:scale-105 transition shadow-md">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>

          {/* Fake Visual Waveform */}
          <div className="flex-1 flex items-center justify-center gap-1 h-8 overflow-hidden">
             {/* Creating 30 random bars to look like audio waves */}
             {[...Array(30)].map((_, i) => (
               <div 
                 key={i} 
                 className="w-1 bg-gray-400 rounded-full transition-all duration-300 hover:bg-black" 
                 style={{ height: `${Math.max(20, Math.random() * 100)}%` }} 
               ></div>
             ))}
          </div>

          {/* Timestamp */}
          <span className="text-xs font-mono text-gray-500 flex-shrink-0">00:14</span>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">Generated in 0.4s</p>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black transition">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Download
            </button>
            <button className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-black transition">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AudioPlayer;