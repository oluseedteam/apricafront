import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import {
  Languages, Mic, Volume2, FileText, Globe, MessageCircle,
  Clapperboard, BookOpen, ArrowRight, ChevronRight, Star, Zap, Shield
} from 'lucide-react'

const features = [
  { icon: Languages,    title: 'Text Translation',    desc: 'Translate English or French into any African language instantly.' },
  { icon: Globe,        title: 'Website Translator',  desc: 'Paste any URL and get the entire webpage translated in seconds.' },
  { icon: FileText,     title: 'Document Translator', desc: 'Upload PDF, Word, or TXT files for full translation and AI summarization.' },
  { icon: MessageCircle,title: 'AI Chatbot',          desc: 'Converse naturally with an AI that replies in your chosen African language.' },
  { icon: Volume2,      title: 'Text to Voice',       desc: '8 authentic voice profiles — Nigerian, Kenyan, British, and American accents.' },
  { icon: Mic,          title: 'Voice to Text',       desc: 'Record or upload audio for instant transcription and translation.' },
  { icon: Clapperboard, title: 'Video Translation',   desc: 'Upload a video and dub it into an African language with real voice synthesis.' },
  { icon: BookOpen,     title: 'Book Translator',     desc: 'Translate and summarize entire books into African languages.' },
]

const stats = [
  { num: '10',   label: 'Languages Now' },
  { num: '54',   label: 'Countries Targeted' },
  { num: '2000+',label: 'African Languages' },
  { num: 'GPT‑4o', label: 'AI Engine' },
]

const supportedLanguages = [
  { flag: '🇳🇬', name: 'Yoruba',           speakers: '45M+',  region: 'Nigeria' },
  { flag: '🇪🇬', name: 'Egyptian Arabic',  speakers: '100M+', region: 'Egypt' },
  { flag: '🇳🇬', name: 'Hausa',            speakers: '70M+',  region: 'West Africa' },
  { flag: '🇰🇪', name: 'Swahili',          speakers: '200M+', region: 'East Africa' },
  { flag: '🇿🇦', name: 'Zulu',             speakers: '12M+',  region: 'South Africa' },
  { flag: '🇳🇬', name: 'Nigerian Pidgin',  speakers: '75M+',  region: 'Nigeria' },
  { flag: '🇷🇼', name: 'Kinyarwanda',      speakers: '20M+',  region: 'Rwanda' },
  { flag: '🇸🇳', name: 'Wolof',            speakers: '12M+',  region: 'Senegal' },
  { flag: '🇪🇹', name: 'Amharic',          speakers: '57M+',  region: 'Ethiopia' },
  { flag: '🇱🇾', name: 'Amazigh',          speakers: '8M+',   region: 'Libya / North Africa' },
]

const africaFlags = [
  '🇳🇬','🇰🇪','🇿🇦','🇪🇹','🇪🇬','🇬🇭','🇹🇿','🇷🇼','🇸🇳',
  '🇨🇮','🇨🇲','🇺🇬','🇲🇿','🇲🇦','🇿🇲','🇿🇼','🇸🇴','🇲🇬',
  '🇦🇴','🇩🇿','🇱🇾','🇸🇩','🇲🇱','🇧🇫','🇳🇪','🇹🇩','🇧🇯',
  '🇹🇬','🇸🇱','🇬🇳','🇬🇦','🇨🇬','🇲🇼','🇳🇦','🇧🇼','🇱🇸',
]

export default function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleCTA = () => navigate(isAuthenticated ? '/dashboard' : '/auth')

  return (
    <div className="min-h-screen bg-cream font-sans">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-xl border-b border-black/[0.07]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black text-white font-bold flex items-center justify-center text-lg shadow-[0_4px_16px_rgba(196,98,45,0.4)]">
              A
            </div>
            <span className="font-display font-bold text-xl tracking-widest text-ink">APRICA</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/auth')} className="btn-ghost text-sm px-4 py-2">
              Sign In
            </button>
            <button onClick={handleCTA} className="btn-terra text-sm px-4 py-2">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-ink overflow-hidden flex items-center">
        <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-terra/30 blur-[100px] animate-drift1 pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-sage/20 blur-[100px] animate-drift2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-yellow-500/10 blur-[80px] animate-drift3 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle, rgba(250,247,242,0.04) 1px, transparent 1px)', backgroundSize:'32px 32px'}} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 grid lg:grid-cols-2 gap-16 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-terra/10 border border-terra/20 rounded-full px-4 py-2 mb-6">
              <Shield size={12} className="text-terra" />
              <span className="text-terra text-[11px] font-semibold tracking-[2px] uppercase">Preserving African Languages</span>
            </div>
            <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.06] tracking-tight mb-6">
              No African<br />Language<br /><em className="not-italic text-[#E09060]">Left Behind</em>
            </h1>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-md mb-4">
              Africa has over <strong className="text-white/80">2,000 languages</strong> — many facing extinction. APRICA uses AI to preserve, translate, and amplify every African voice, starting with the most spoken and expanding to every dialect.
            </p>
            <p className="text-white/35 text-sm leading-relaxed max-w-md mb-10 italic">
              Currently supporting 10 languages across the continent — with hundreds more coming.
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <button onClick={handleCTA} className="btn-terra flex items-center gap-2">
                Start Speaking <ArrowRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('features').scrollIntoView({behavior:'smooth'})}
                className="btn-ghost border-white/20 text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5">
                See Features
              </button>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="font-display font-black text-2xl text-terra">{s.num}</div>
                  <div className="text-xs text-white/35 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* First 4 language cards in hero */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {supportedLanguages.slice(0, 4).map((l) => (
              <div key={l.name}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{l.flag}</span>
                  <span className="text-[9px] font-bold bg-sage/20 text-sage border border-sage/30 px-2 py-0.5 rounded-full tracking-wider">LIVE</span>
                </div>
                <div className="font-display font-bold text-cream text-base mb-1">{l.name}</div>
                <div className="text-white/35 text-xs mb-2">{l.speakers} speakers</div>
                <div className="flex items-center gap-1 text-terra text-xs font-semibold">
                  <Zap size={11} /> Powered by GPT‑4o
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/25 text-xs">
          <span>Scroll</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </section>

      {/* ── SCROLLING FLAG BANNER ── */}
      <section className="bg-ink border-t border-white/[0.06] py-5 overflow-hidden">
        <div
          className="flex gap-5 whitespace-nowrap"
          style={{
            width: 'max-content',
            animation: 'flagScroll 35s linear infinite',
          }}>
          {[...africaFlags, ...africaFlags].map((flag, i) => (
            <span key={i} className="text-3xl opacity-50 hover:opacity-100 transition-opacity cursor-default select-none">
              {flag}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes flagScroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 px-6 bg-cream2">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="w-5 h-px bg-terra" />
            <span className="text-terra text-[11px] font-semibold tracking-[3px] uppercase">Our Mission</span>
            <div className="w-5 h-px bg-terra" />
          </div>
          <h2 className="font-display font-black text-3xl md:text-4xl text-ink mb-6 leading-tight">
            Breaking Language Barriers<br />Across the Continent
          </h2>
          <p className="text-muted text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Africa is home to over <strong className="text-ink">2,000 unique languages</strong> — the richest linguistic diversity on Earth. Yet language barriers divide communities, limit access to information, and put hundreds of languages at risk of extinction. APRICA exists to change that.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            {[
              { icon: '🔗', title: 'Connect Communities',  desc: "Bridge communication gaps between Africa's diverse ethnic groups and nations." },
              { icon: '📚', title: 'Preserve Languages',   desc: 'Digitise and document endangered languages before they are lost forever.' },
              { icon: '🚀', title: 'Empower People',       desc: 'Give every African access to technology in their mother tongue.' },
            ].map(m => (
              <div key={m.title} className="bg-white border border-black/[0.09] rounded-2xl p-6">
                <div className="text-3xl mb-3">{m.icon}</div>
                <h3 className="font-display font-bold text-base text-ink mb-2">{m.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-5 h-px bg-terra" />
              <span className="text-terra text-[11px] font-semibold tracking-[3px] uppercase">Everything You Need</span>
              <div className="w-5 h-px bg-terra" />
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-ink mb-4 leading-tight">
              8 Powerful AI Features
            </h2>
            <p className="text-muted text-base max-w-lg mx-auto leading-relaxed">
              One platform to translate, transcribe, speak, and understand Africa's languages.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title}
                onClick={handleCTA}
                className="bg-white border border-black/[0.09] rounded-2xl p-6 cursor-pointer group hover:-translate-y-1.5 hover:border-black/[0.16] transition-all duration-300 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terra to-[#E8956A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <div className="w-11 h-11 rounded-xl bg-terra/10 border border-terra/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-terra" strokeWidth={1.75} />
                </div>
                <h3 className="font-display font-bold text-sm text-ink mb-2">{title}</h3>
                <p className="text-xs text-muted leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-terra text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Try it <ChevronRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL SUPPORTED LANGUAGES ── */}
      <section className="py-20 px-6 bg-ink">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-black text-4xl text-cream mb-2">Supported Languages</h2>
            <p className="text-white/40 text-sm">All live now — more added every month</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {supportedLanguages.map(l => (
              <div key={l.name}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5 text-center hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-3">{l.flag}</div>
                <div className="font-display font-bold text-cream text-sm mb-1">{l.name}</div>
                <div className="text-white/35 text-xs mb-1">{l.speakers} speakers</div>
                <div className="text-white/20 text-[10px] mb-3">{l.region}</div>
                <span className="text-[9px] font-bold bg-sage/20 text-sage border border-sage/30 px-2 py-0.5 rounded-full tracking-wider">✓ LIVE</span>
              </div>
            ))}
          </div>
          <p className="text-center text-white/20 text-xs mt-8 italic">
            More languages including Twi, Igbo, Shona, Fulfulde, Bambara and hundreds of minor languages are on our roadmap
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-cream">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-terra/10 border border-terra/20 rounded-full px-4 py-2 mb-6">
            <Star size={12} className="text-terra fill-terra" />
            <span className="text-terra text-xs font-semibold">Free to get started</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-ink mb-4 leading-tight">
            Be Part of the Movement
          </h2>
          <p className="text-muted text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Every word translated, every voice recorded, every language preserved — it all starts here. Join APRICA and help ensure no African language is ever lost.
          </p>
          <button onClick={handleCTA} className="btn-terra flex items-center gap-2 mx-auto text-base px-8 py-4">
            Join APRICA Free <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-ink py-10 px-6 border-t border-white/[0.07]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-black text-white font-bold flex items-center justify-center text-base">A</div>
            <span className="font-display font-bold text-cream tracking-widest">APRICA</span>
          </div>
          <p className="text-white/25 text-xs text-center">
            © {new Date().getFullYear()} APRICA — Preserving African Languages with AI. No language left behind.
          </p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/auth')} className="text-white/35 text-xs hover:text-white/60 transition-colors">Sign In</button>
            <button onClick={handleCTA} className="text-terra text-xs font-semibold hover:text-terra/80 transition-colors">Get Started →</button>
          </div>
        </div>
      </footer>

    </div>
  )
}