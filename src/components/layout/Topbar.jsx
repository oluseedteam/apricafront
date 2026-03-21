import { Menu } from 'lucide-react'

const TITLES = {
  home:'Dashboard', translate:'Text Translation', url:'Website Translator',
  document:'Document Translator', chat:'AI Chatbot', tts:'Text to Voice',
  stt:'Voice to Text', video:'Video Translator', book:'Book Translator'
}

export default function Topbar({ active, setMobileOpen }) {
  return (
    <header className="h-16 flex items-center px-6 md:px-8 bg-cream/90 backdrop-blur-xl border-b border-black/[0.07] sticky top-0 z-40 gap-4">
      <button onClick={() => setMobileOpen(true)}
        className="lg:hidden bg-transparent border-none text-ink cursor-pointer p-2 rounded-xl hover:bg-cream2 transition-colors">
        <Menu size={20} />
      </button>

      <h1 className="font-display font-semibold text-base text-ink tracking-wide">
        {TITLES[active] || 'Dashboard'}
      </h1>

      <div className="ml-auto flex items-center gap-2.5 bg-sage/10 border border-sage/20 rounded-full px-3.5 py-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-sage animate-breathe" />
        <span className="text-sage text-[11px] font-semibold tracking-wide">APRICA Live</span>
      </div>
    </header>
  )
}
