import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext'
import {
  LayoutDashboard, Languages, Globe, FileText, MessageCircle,
  Volume2, Mic, Clapperboard, BookOpen, LogOut, X
} from 'lucide-react'

const navItems = [
  { section: 'Core',
    items: [
      { id: 'home',     label: 'Dashboard',          icon: LayoutDashboard },
      { id: 'translate',label: 'Text Translation',    icon: Languages },
      { id: 'url',      label: 'Website Translator',  icon: Globe },
      { id: 'document', label: 'Document Translator', icon: FileText },
    ]
  },
  { section: 'AI Tools',
    items: [
      { id: 'chat',  label: 'AI Chatbot',   icon: MessageCircle, badge: 'AI' },
      { id: 'tts',   label: 'Text to Voice',icon: Volume2 },
      { id: 'stt',   label: 'Voice to Text',icon: Mic },
    ]
  },
  { section: 'Advanced',
    items: [
      { id: 'video', label: 'Video Translator', icon: Clapperboard, badge: 'NEW' },
      { id: 'book',  label: 'Book Translator',  icon: BookOpen },
    ]
  },
]

export default function Sidebar({ active, setActive, mobileOpen, setMobileOpen, globalLang, setGlobalLang }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-7 py-8 border-b border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 text-white font-bold bg-black flex items-center justify-center text-xl shadow-[0_4px_16px_rgba(196,98,45,0.4)]">A</div>
          <span className="font-display font-bold text-xl tracking-widest text-cream">APRICA</span>
        </div>
        <button onClick={() => setMobileOpen(false)}
          className="lg:hidden bg-transparent border-none text-white/40 hover:text-white cursor-pointer p-1">
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-5 overflow-y-auto">
        {navItems.map(({ section, items }) => (
          <div key={section} className="mb-5">
            <p className="text-[9px] font-bold text-white/25 tracking-[2.5px] uppercase px-3 mb-2">{section}</p>
            {items.map(({ id, label, icon: Icon, badge }) => (
              <button key={id}
                onClick={() => { setActive(id); setMobileOpen(false) }}
                className={`nav-item w-full text-left ${active === id ? 'nav-item-active' : ''}`}>
                <Icon size={16} strokeWidth={1.75} />
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badge === 'AI' ? 'bg-terra text-white' : 'bg-sage text-white'}`}>
                    {badge}
                  </span>
                )}
                {!badge && active === id && <div className="w-1.5 h-1.5 rounded-full bg-terra shadow-[0_0_8px_#C4622D]" />}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Language selector */}
      <div className="px-4 py-4 border-t border-white/[0.07]">
        <div className="flex items-center gap-3 bg-white/[0.06] border border-white/[0.1] rounded-xl px-3.5 py-3 mb-3">
          <span className="text-base">🌍</span>
          <select value={globalLang} onChange={e => setGlobalLang(e.target.value)}
            className="bg-transparent border-none text-white/75 font-sans text-xs flex-1 outline-none cursor-pointer">
            <option value="yo">Yoruba 🇳🇬</option>
            <option value="ha">Hausa 🇳🇬</option>
            <option value="sw">Swahili 🇰🇪</option>
            <option value="pcm">Nigerian Pidgin 🇳🇬</option>
          </select>
        </div>
        {/* User */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-8 h-8 rounded-full bg-terra flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {user?.avatar || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-cream text-xs font-semibold truncate">{user?.name || 'User'}</p>
            <p className="text-white/35 text-[10px] truncate">{user?.email || ''}</p>
          </div>
          <button onClick={handleLogout} title="Sign out"
            className="text-white/30 hover:text-red-400 transition-colors bg-transparent border-none cursor-pointer p-1">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 min-w-[256px] bg-ink flex-col fixed top-0 left-0 h-screen z-50">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-ink h-full z-10 flex flex-col">
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  )
}
