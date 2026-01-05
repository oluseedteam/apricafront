import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
    <header className="bg-white text-black sticky top-0 z-50 border-b" style={{ fontFamily: 'var(--font-dm-sans)' }}>
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center h-16">
          {/* Left: Brand */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-black flex items-center justify-center text-white font-bold">A</span>
              <span className="font-medium text-sm text-black">Aprica</span>
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
          <div className="flex justify-end items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <a href="#" className="px-4 py-1 rounded-full text-sm text-black hover:bg-black/5 transition">Log in</a>
              <a href="#" className="px-4 py-1 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition">Sign up for free</a>
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden absolute right-10 top-1/2 -translate-y-1/2 md:static">
              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="p-2 rounded-md inline-flex items-center justify-center text-black hover:bg-black/5"
              >
                {!open ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div className={`${open ? "block" : "hidden"} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="block text-black py-2">
              {link.name}
            </a>
          ))}

          <div className="flex gap-3">
            <a href="#" className="flex-1 text-center px-4 py-2 border border-black text-black rounded-full">Log in</a>
            <a href="#" className="flex-1 text-center px-4 py-2 bg-black text-white rounded-full">Sign up for free</a>
          </div>
        </div>
      </div>
    </header>
  );
}
