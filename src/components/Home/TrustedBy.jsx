import React from 'react';

const TrustedBy = () => {
  // Using text for logos to keep it simple, but you can replace with IMG tags later
  const companies = ["Spotify", "Netflix", "Google", "Duolingo", "Mtn"];

  return (
    <div className="w-full mt-20 mb-10 text-center">
      <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-6">
        Trusted by content creators at
      </p>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {companies.map((company) => (
          <h3 key={company} className="text-xl md:text-2xl font-bold text-gray-400 hover:text-black cursor-default">
            {company}
          </h3>
        ))}
      </div>
    </div>
  );
};

export default TrustedBy;