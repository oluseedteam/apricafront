import React, { useState } from 'react';

const InputSelector = () => {
  const [activeTab, setActiveTab] = useState('url'); // Default active tab

  const tabs = [
    {
      id: 'text',
      label: 'Text Input',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    },
    {
      id: 'url',
      label: 'URL Input',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
    },
    {
      id: 'document',
      label: 'Document',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
    },
    {
      id: 'chatbot',
      label: 'Chatbot',
      isExclusive: true,
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"></path><rect x="4" y="8" width="16" height="12" rx="2"></rect><path d="M2 14h2"></path><path d="M20 14h2"></path><path d="M15 13v2"></path><path d="M9 13v2"></path></svg>
    },
    {
      id: 'video',
      label: 'Video Translate',
      badge: 'BETA',
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>
    }
  ];

  return (
    // Mobile: overflow-x-auto allows horizontal scrolling
    // Desktop: justify-center centers them
    <div className="w-full overflow-x-auto no-scrollbar px-4 sm:px-0 mb-6">
      <div className="flex gap-3 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 whitespace-nowrap
                ${isActive 
                  ? 'bg-[#0f172a] border-[#0f172a] text-white shadow-md' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <span className={isActive ? 'text-white' : 'text-gray-500'}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>

              {/* Exclusive Badge */}
              {tab.isExclusive && (
                <span className={`
                  text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 tracking-wide
                  ${isActive ? 'bg-amber-400/20 text-amber-200' : 'bg-amber-100 text-amber-700'}
                `}>
                  EXCLUSIVE
                </span>
              )}

              {/* Beta Badge */}
              {tab.badge && (
                <span className={`
                  text-[9px] font-bold px-1.5 py-0.5 rounded ml-1 tracking-wide
                  ${isActive ? 'bg-blue-400/20 text-blue-200' : 'bg-blue-100 text-blue-600'}
                `}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InputSelector;