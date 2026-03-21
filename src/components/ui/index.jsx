import { useEffect, useState, useRef } from 'react'
import { Music, Upload, Loader2 } from 'lucide-react'

// ── LANG CHIPS ──────────────────────────────────────────
const LANGS = [
  { code: 'yo',  label: '🇳🇬 Yoruba' },
  { code: 'ha',  label: '🇳🇬 Hausa' },
  { code: 'sw',  label: '🇰🇪 Swahili' },
  { code: 'pcm', label: '🇳🇬 Pidgin' },
]

export function LangChips({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {LANGS.map(l => (
        <button key={l.code} onClick={() => onChange(l.code)}
          className={`chip ${value === l.code ? 'chip-active' : ''}`}>
          {l.label}
        </button>
      ))}
    </div>
  )
}

// ── FILE DROP ZONE ──────────────────────────────────────
export function FileDropZone({ accept, onFile, fileName, icon: Icon = Upload, label, sublabel }) {
  const [drag, setDrag] = useState(false)
  const inp = useRef()

  const handle = file => { if (file) onFile(file) }

  return (
    <div
      onClick={() => inp.current.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); handle(e.dataTransfer.files[0]) }}
      className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200 bg-cream2 ${
        drag ? 'border-terra bg-terra/5' : 'border-black/[0.16] hover:border-terra hover:bg-terra/[0.03]'
      }`}>
      <input ref={inp} type="file" accept={accept} className="hidden" onChange={e => handle(e.target.files[0])} />
      <Icon size={36} className="mx-auto mb-3 text-muted2" strokeWidth={1.25} />
      <p className="text-sm text-muted">{label}</p>
      <p className="text-xs text-muted2 mt-1">{sublabel}</p>
      {fileName && <p className="text-xs text-terra font-semibold mt-3">📎 {fileName}</p>}
    </div>
  )
}

// ── LOADER ──────────────────────────────────────────────
export function Loader({ text = 'Processing…' }) {
  return (
    <div className="flex items-center gap-3 py-4 text-sm text-muted italic">
      <Loader2 size={18} className="text-terra animate-spin" />
      {text}
    </div>
  )
}

// ── RESULT BOX ──────────────────────────────────────────
export function ResultBox({ children, visible }) {
  if (!visible) return null
  return (
    <div className="bg-cream2 border border-black/[0.16] rounded-xl p-5 mt-4 text-sm leading-relaxed whitespace-pre-wrap break-words animate-fadeUp">
      {children}
    </div>
  )
}

export function ResultPlaceholder({ text = 'Result will appear here…' }) {
  return (
    <div className="bg-cream2 border-2 border-dashed border-black/[0.13] rounded-xl p-5 min-h-[128px] flex items-center justify-center">
      <p className="font-serif italic text-muted2 text-sm">{text}</p>
    </div>
  )
}

// ── AUDIO PLAYER ────────────────────────────────────────
export function AudioPlayer({ src, visible }) {
  if (!visible || !src) return null
  return (
    <div className="bg-sage/10 border border-sage/20 rounded-xl p-4 mt-4 animate-fadeUp">
      <p className="text-[10px] font-bold text-sage tracking-[2px] uppercase mb-2.5 flex items-center gap-1.5">
        <Music size={11} /> Audio Output
      </p>
      <audio controls src={src} className="w-full rounded-lg" />
    </div>
  )
}

// ── SECTION LABEL ───────────────────────────────────────
export function SectionLabel({ children }) {
  return (
    <p className="text-[10px] font-bold text-muted tracking-[2px] uppercase mb-2">{children}</p>
  )
}

// ── TOAST ────────────────────────────────────────────────
export function useToast() {
  const [toasts, setToasts] = useState([])
  const add = (msg, type = 'ok') => {
    const id = Date.now()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }
  return { toasts, toast: add }
}

export function ToastContainer({ toasts }) {
  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2">
      {toasts.map(({ id, msg, type }) => (
        <div key={id}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium shadow-soft2 bg-white border animate-slideR ${
            type === 'ok' ? 'border-l-4 border-sage' : 'border-l-4 border-red-500'
          }`}>
          {type === 'ok' ? '✅' : '❌'} {msg}
        </div>
      ))}
    </div>
  )
}

// ── CARD HEADER ─────────────────────────────────────────
export function CardHeader({ icon: Icon, title, sub }) {
  return (
    <div className="flex items-center gap-3.5 mb-6 pb-5 border-b border-black/[0.07]">
      <div className="w-11 h-11 rounded-xl bg-terra/10 border border-terra/15 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-terra" strokeWidth={1.75} />
      </div>
      <div>
        <h2 className="font-display font-bold text-lg text-ink">{title}</h2>
        {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ── TAB BAR ─────────────────────────────────────────────
export function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-cream2 border border-black/[0.16] rounded-xl p-1 mb-5">
      {tabs.map(({ id, label }) => (
        <button key={id} onClick={() => onChange(id)}
          className={`flex-1 py-2 rounded-[9px] text-xs font-semibold transition-all duration-200 border-none cursor-pointer ${
            active === id ? 'bg-ink text-cream' : 'bg-transparent text-muted hover:text-ink'
          }`}>
          {label}
        </button>
      ))}
    </div>
  )
}
