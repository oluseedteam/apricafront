import React from "react";

const Search = () => {
  // Comprehensive list of major world languages
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
      <div className="flex items-center gap-3 w-full max-w-xl px-5 py-3 bg-white rounded-full shadow-lg border border-gray-200">

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
      <div className="flex justify-between w-full max-w-xl px-2">

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