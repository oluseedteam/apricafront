import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Login from "./Login";
import Signup from "./Signup";

export default function Navbar() {
  const [open, setOpen] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [authView, setAuthView] = useState("login"); 

  const navigate = useNavigate(); 

  const openLogin = () => { setAuthView("login"); setIsModalOpen(true); setOpen(false); };
  const openSignup = () => { setAuthView("signup"); setIsModalOpen(true); setOpen(false); };
  const closeModal = () => { setIsModalOpen(false); };

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Learn", href: "#learn" },
    { name: "Business", href: "#business" },
    { name: "Pricing", href: "#pricing" },
    { name: "Images", href: "#images" },
    { name: "Download", href: "#download" },
  ];

  return (
    <>
      <header className="bg-white text-black sticky top-0 z-50" style={{ fontFamily: 'var(--font-dm-sans)' }}>
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Changed grid to flex to better control spacing if needed, but grid works fine usually. 
              Sticking to grid-cols-3 to keep your layout structure, but adjusting alignment. */}
          <div className="grid grid-cols-3 items-center h-16">
            
            {/* Left: Brand */}
            <div className="flex items-center">
              <a href="#" className="flex items-center gap-3">
                <span className="w-8 h-8 rounded bg-black flex items-center justify-center text-white font-bold">A</span>
                <span className="font-medium text-black text-xl font-outfit">Aprica</span>
              </a>
            </div>

            {/* Center: Nav links (desktop) */}
            <div className="hidden md:flex justify-center space-x-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm text-black/90 hover:text-black hover:underline">
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex justify-end items-center">
              <div className="hidden md:flex items-center gap-3">
                
                {/* ================================================= */}
                {/*  🔴 ADMIN BUTTON - PLACED HERE AS REQUESTED  🔴  */}
                {/* ================================================= */}
                <button 
                  onClick={() => navigate('/admin')}
                  className="px-4 py-2 text-sm font-bold text-red-600 bg-red-50 border border-red-200 rounded-full hover:bg-red-100 transition shadow-sm mr-2"
                >
                  Dashboard ↗
                </button>
                {/* ================================================= */}

                <button 
                  onClick={openLogin}
                  className="px-4 py-1 rounded-full text-sm text-black hover:bg-black/5 transition cursor-pointer"
                >
                  Log in
                </button>
                <button 
                  onClick={openSignup}
                  className="px-5 py-2 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition cursor-pointer"
                >
                  Sign up for free
                </button>
              </div>

              {/* Mobile menu toggle */}
              <div className="md:hidden absolute right-1 top-1/2 -translate-y-1/2 md:static">
                <button
                  onClick={() => setOpen(!open)}
                  className="p-2 rounded-md inline-flex items-center justify-center text-black hover:bg-black/5"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {open ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="block text-black py-2">
                  {link.name}
                </a>
              ))}
              
              <div className="flex flex-col gap-3">
                 {/* MOBILE ADMIN BUTTON */}
                 <button 
                  onClick={() => {
                    navigate('/admin');
                    setOpen(false);
                  }}
                  className="w-full text-center px-4 py-3 text-red-600 bg-red-50 border border-red-200 rounded-lg font-bold text-sm"
                >
                  Go to Admin Dashboard ↗
                </button>

                <div className="flex gap-3">
                  <button onClick={openLogin} className="flex-1 text-center px-4 py-2 border border-black text-black rounded-full">
                    Log in
                  </button>
                  <button onClick={openSignup} className="flex-1 text-center px-4 py-3 bg-black text-white rounded-full">
                    Sign up for free
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          <div className="relative z-[1010] w-full max-w-[400px] mx-4">
            {authView === 'login' ? (
              <Login 
                onClose={closeModal} 
                onSwitchToSignup={() => setAuthView('signup')} 
              />
            ) : (
              <Signup 
                onClose={closeModal} 
                onSwitchToLogin={() => setAuthView('login')} 
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}