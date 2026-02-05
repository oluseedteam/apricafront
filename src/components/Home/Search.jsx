import React, { useState, useEffect, useRef } from "react";

const Search = () => {
  // State for the Document Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  // Document Types Data
  // position classes define where they fly out to
  const docOptions = [
    { 
      id: "pdf", 
      label: "Upload PDF", 
      color: "bg-red-500 text-white", 
      position: isMenuOpen ? "-translate-y-[60px]" : "translate-y-0 opacity-0 scale-0",
      icon: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path> 
    },
    { 
      id: "word", 
      label: "Upload Word", 
      color: "bg-blue-500 text-white", 
      position: isMenuOpen ? "-translate-y-[45px] translate-x-[45px]" : "translate-y-0 translate-x-0 opacity-0 scale-0",
      icon: <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path> 
    },
    { 
      id: "img", 
      label: "Scan Image", 
      color: "bg-purple-500 text-white", 
      position: isMenuOpen ? "-translate-y-[45px] -translate-x-[45px]" : "translate-y-0 translate-x-0 opacity-0 scale-0",
      icon: <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect> 
    },
  ];

  // Language List
  const languages = [
    "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Assamese", "Aymara", "Azerbaijani",
    "Bambara", "Basque", "Belarusian", "Bengali", "Bhojpuri", "Bosnian", "Bulgarian", "Burmese",
    "Catalan", "Cebuano", "Chichewa", "Chinese (Simplified)", "Chinese (Traditional)", "Corsican", "Croatian", "Czech",
    "Danish", "Dhivehi", "Dogri", "Dutch",
    "English", "Esperanto", "Estonian", "Ewe",
    "Filipino", "Finnish", "French", "Frisian",
    "Galician", "Georgian", "German", "Greek", "Guarani", "Gujarati",
    "Haitian Creole", "Hausa", "Hawaiian", "Hebrew", "Hindi", "Hmong", "Hungarian",
    "Icelandic", "Igbo", "Ilocano", "Indonesian", "Irish", "Italian",
    "Japanese", "Javanese",
    "Kannada", "Kazakh", "Khmer", "Kinyarwanda", "Konkani", "Korean", "Krio", "Kurdish (Kurmanji)", "Kurdish (Sorani)", "Kyrgyz",
    "Lao", "Latin", "Latvian", "Lingala", "Lithuanian", "Luganda", "Luxembourgish",
    "Macedonian", "Maithili", "Malagasy", "Malay", "Malayalam", "Maltese", "Maori", "Marathi", "Meiteilon (Manipuri)", "Mizo", "Mongolian", "Myanmar (Burmese)",
    "Nepali", "Norwegian",
    "Odia (Oriya)", "Oromo",
    "Pashto", "Persian", "Polish", "Portuguese", "Punjabi",
    "Quechua",
    "Romanian", "Russian",
    "Samoan", "Sanskrit", "Scots Gaelic", "Sepedi", "Serbian", "Sesotho", "Shona", "Sindhi", "Sinhala", "Slovak", "Slovenian", "Somali", "Spanish", "Sundanese", "Swahili", "Swedish",
    "Tajik", "Tamil", "Tatar", "Telugu", "Thai", "Tigrinya", "Tsonga", "Turkish", "Turkmen", "Twi",
    "Ukrainian", "Urdu", "Uyghur", "Uzbek",
    "Vietnamese",
    "Welsh",
    "Xhosa",
    "Yiddish", "Yoruba",
    "Zulu"
  ];

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4">

      {/* --- Search Bar --- */}
      <div 
        className="relative flex items-center gap-3 w-full max-w-xl px-4 py-3 bg-white rounded-full shadow-lg border border-gray-200 z-20"
        ref={menuRef}
      >

        {/* 1. ANIMATED ADD BUTTON CONTAINER */}
        <div className="relative flex items-center justify-center">
          
          {/* Floating Action Buttons (Behind the main button initially) */}
          {docOptions.map((opt) => (
            <div 
              key={opt.id}
              className={`absolute flex flex-col items-center justify-center transition-all duration-300 ease-out z-0 group ${opt.position}`}
            >
              {/* The Hover Label */}
              <span className="absolute -top-8 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {opt.label}
              </span>

              {/* The Round Icon Bubble */}
              <button 
                className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform ${opt.color}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {opt.icon}
                </svg>
              </button>
            </div>
          ))}

          {/* The Main Plus (+) Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`
              relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-all duration-300
              ${isMenuOpen ? 'rotate-45 bg-gray-200 text-black' : 'rotate-0'}
            `}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Input sentence to search"
          className="flex-1 bg-transparent text-gray-700 placeholder-gray-400 outline-none text-sm"
        />

        {/* Mic Icon */}
        <button className="text-gray-400 hover:text-gray-600 transition p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
        </button>

        {/* Airplane Button */}
        <button className="bg-black text-white rounded-full p-2 hover:scale-105 transition active:scale-95">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2.5 19.5l19-7.5-19-7.5v6l13 1.5-13 1.5v6z" />
          </svg>
        </button>
      </div>

      {/* --- Dropdowns Row --- */}
      <div className="flex justify-between w-full max-w-xl px-2 z-10">

        {/* Left Dropdown (All Languages) */}
        <div className="relative group w-[48%]">
          <select 
            className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 shadow-sm cursor-pointer hover:border-gray-400 transition"
            defaultValue="English"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {/* Custom Arrow Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Right Dropdown (Voices) */}
        <div className="relative group w-[48%]">
          <select className="w-full appearance-none bg-white border border-gray-300 text-gray-700 text-sm rounded-lg pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-black/10 shadow-sm cursor-pointer hover:border-gray-400 transition">
            <option value="Idera">Idera (Female)</option>
            <option value="Jude">Jude (Male)</option>
            <option value="Emma">Emma (Female)</option>
            <option value="Joke">Joke (Female)</option>
            <option value="Osagie">Osagie (Male)</option>
            <option value="Remi">Remi (Female)</option>
            <option value="Tayo">Tayo (Male)</option>
          </select> 

          {/* Custom Arrow Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
