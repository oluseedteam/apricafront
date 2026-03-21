import { useState, useRef } from 'react'
import {
  Languages, Globe, FileText, MessageCircle, Volume2,
  Mic, Clapperboard, BookOpen, Send, Trash2, StopCircle
} from 'lucide-react'
import { api } from '../../lib/api'
import {
  LangChips, FileDropZone, Loader, ResultBox, ResultPlaceholder,
  AudioPlayer, SectionLabel, CardHeader, TabBar
} from '../ui'

// ── HOME PANEL ──────────────────────────────────────────
export function HomePanel({ setActive }) {
  const features = [
    { id:'translate', icon:Languages,    title:'Text Translation',    desc:'English & French → 4 African languages' },
    { id:'url',       icon:Globe,        title:'Website Translator',  desc:'Translate any webpage instantly' },
    { id:'document',  icon:FileText,     title:'Document Translator', desc:'PDF, Word & TXT with summarization' },
    { id:'chat',      icon:MessageCircle,title:'AI Chatbot',          desc:'Chat in any African language' },
    { id:'tts',       icon:Volume2,      title:'Text to Voice',       desc:'8 authentic voice profiles' },
    { id:'stt',       icon:Mic,          title:'Voice to Text',       desc:'Transcribe & translate audio' },
    { id:'video',     icon:Clapperboard, title:'Video Translation',   desc:'Dub videos into African languages' },
    { id:'book',      icon:BookOpen,     title:'Book Translator',     desc:'Translate & summarize entire books' },
  ]
  return (
    <div className="animate-fadeUp">
      {/* Hero */}
      <div className="bg-ink rounded-3xl p-8 md:p-12 mb-6 relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-terra/20 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[40%] w-[200px] h-[200px] rounded-full bg-sage/10 blur-[60px] pointer-events-none" />
        <div className="relative z-10">
          <p className="text-terra text-[11px] font-semibold tracking-[3px] uppercase mb-3 flex items-center gap-2">
            <span className="w-5 h-px bg-terra inline-block" /> Africa's AI Language Platform
          </p>
          <h1 className="font-display font-black text-3xl md:text-4xl text-cream mb-3 leading-tight">
            The <em className="not-italic text-[#E09060]">Voice</em> of a Continent
          </h1>
          <p className="text-white/45 text-sm leading-relaxed max-w-md mb-6">
            Translate, transcribe, and communicate in Nigerian Pidgin, Yoruba, Hausa, and Swahili — powered by GPT‑4o.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setActive('translate')} className="btn-terra text-sm px-5 py-2.5">Start Translating →</button>
            <button onClick={() => setActive('chat')} className="bg-white/10 text-white/70 border border-white/15 hover:bg-white/15 hover:text-white font-semibold rounded-xl text-sm px-5 py-2.5 transition-all cursor-pointer">Try Chatbot</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[{n:'4',l:'Languages'},{n:'8',l:'Voices'},{n:'8',l:'Features'},{n:'GPT‑4o',l:'AI Engine'}].map(s => (
          <div key={s.l} className="card text-center py-5 px-3 relative overflow-hidden">
            <div className="font-display font-black text-3xl text-terra mb-1" style={{fontSize: s.n.length > 3 ? '22px' : undefined}}>{s.n}</div>
            <div className="text-xs text-muted">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {features.map(({ id, icon: Icon, title, desc }) => (
          <button key={id} onClick={() => setActive(id)}
            className="card text-left cursor-pointer group hover:-translate-y-1 hover:shadow-soft2 hover:border-black/[0.16] transition-all duration-300 relative overflow-hidden p-5">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-terra to-[#E8956A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <div className="w-10 h-10 rounded-xl bg-terra/10 border border-terra/15 flex items-center justify-center mb-3">
              <Icon size={18} className="text-terra" strokeWidth={1.75} />
            </div>
            <p className="font-display font-bold text-sm text-ink mb-1">{title}</p>
            <p className="text-xs text-muted leading-relaxed">{desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── TEXT TRANSLATION ────────────────────────────────────
export function TranslatePanel({ globalLang }) {
  const [lang,   setLang]   = useState(globalLang)
  const [text,   setText]   = useState('')
  const [result, setResult] = useState('')
  const [loading,setLoading]= useState(false)
  const [audio,  setAudio]  = useState('')

  const translate = async () => {
    if (!text.trim()) return
    setLoading(true); setResult(''); setAudio('')
    try {
      const d = await api.translateText(text, lang)
      setResult(d.translated)
    } catch (e) { setResult('Error: ' + e.message) }
    setLoading(false)
  }

  const translateAndSpeak = async () => {
    if (!text.trim()) return
    setLoading(true); setResult(''); setAudio('')
    try {
      const d = await api.translateText(text, lang)
      setResult(d.translated)
      const a = await api.tts(d.translated, 'nigerian_female', lang, false)
      setAudio(a.audio_url)
    } catch (e) { setResult('Error: ' + e.message) }
    setLoading(false)
  }

  return (
    <div className="card animate-fadeUp">
      <CardHeader icon={Languages} title="Text Translation" sub="Translate into any of the 4 African languages" />
      <LangChips value={lang} onChange={setLang} />
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <SectionLabel>Source Text</SectionLabel>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={7}
            placeholder="Type or paste text to translate…"
            className="input-field resize-none w-full" />
        </div>
        <div>
          <SectionLabel>Translation</SectionLabel>
          {result ? <ResultBox visible>{result}</ResultBox> : <ResultPlaceholder />}
        </div>
      </div>
      {loading && <Loader text="Translating…" />}
      <div className="flex flex-wrap gap-2 mt-2">
        <button onClick={translate} disabled={loading} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50">
          <Languages size={14} /> Translate
        </button>
        <button onClick={translateAndSpeak} disabled={loading} className="btn-sage text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50">
          <Volume2 size={14} /> Translate + Speak
        </button>
        <button onClick={() => { setText(''); setResult(''); setAudio('') }} className="btn-ghost text-sm px-4 py-2.5 flex items-center gap-1.5">
          <Trash2 size={13} /> Clear
        </button>
      </div>
      <AudioPlayer src={audio} visible={!!audio} />
    </div>
  )
}

// ── URL TRANSLATION ─────────────────────────────────────
export function UrlPanel({ globalLang }) {
  const [lang,   setLang]   = useState(globalLang)
  const [url,    setUrl]    = useState('')
  const [result, setResult] = useState(null)
  const [loading,setLoading]= useState(false)

  const translate = async () => {
    if (!url.trim()) return
    setLoading(true); setResult(null)
    try { setResult(await api.translateUrl(url, lang)) }
    catch (e) { setResult({ error: e.message }) }
    setLoading(false)
  }

  return (
    <div className="card animate-fadeUp">
      <CardHeader icon={Globe} title="Website Translator" sub="Translate any webpage into African languages" />
      <LangChips value={lang} onChange={setLang} />
      <div className="mb-4">
        <SectionLabel>Website URL</SectionLabel>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com"
          className="input-field" onKeyDown={e => e.key === 'Enter' && translate()} />
      </div>
      {loading && <Loader text="Fetching and translating…" />}
      <div className="flex gap-2 mt-2">
        <button onClick={translate} disabled={loading} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50">
          <Globe size={14} /> Translate Website
        </button>
        <button onClick={() => { setUrl(''); setResult(null) }} className="btn-ghost text-sm px-4 py-2.5">Clear</button>
      </div>
      {result && (
        <div className="bg-cream2 border border-black/[0.16] rounded-xl p-5 mt-4 animate-fadeUp">
          {result.error ? <p className="text-red-600 text-sm">{result.error}</p> : (
            <>
              <p className="text-[9px] font-bold text-sage tracking-[2px] uppercase mb-2">{result.target_name}</p>
              {result.translated_title && <p className="font-display font-bold text-terra text-base mb-3">{result.translated_title}</p>}
              <p className="text-sm leading-[1.85] whitespace-pre-wrap">{result.translated_body}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ── DOCUMENT TRANSLATION ────────────────────────────────
export function DocumentPanel({ globalLang }) {
  const [lang,   setLang]   = useState(globalLang)
  const [file,   setFile]   = useState(null)
  const [action, setAction] = useState('both')
  const [result, setResult] = useState(null)
  const [loading,setLoading]= useState(false)

  const process = async () => {
    if (!file) return
    setLoading(true); setResult(null)
    try { setResult(await api.translateDocument(file, lang, action)) }
    catch (e) { setResult({ error: e.message }) }
    setLoading(false)
  }

  return (
    <div className="card animate-fadeUp">
      <CardHeader icon={FileText} title="Document Translator" sub="PDF, Word, TXT — translate and summarize" />
      <LangChips value={lang} onChange={setLang} />
      <TabBar active={action} onChange={setAction}
        tabs={[{id:'translate',label:'📝 Translate'},{id:'summarize',label:'📋 Summarize'},{id:'both',label:'✨ Both'}]} />
      <FileDropZone accept=".pdf,.txt,.docx" onFile={setFile} fileName={file?.name}
        label="Drop PDF, TXT or Word document here" sublabel="or click to browse" />
      {loading && <Loader text="Processing document…" />}
      <div className="flex gap-2 mt-4">
        <button onClick={process} disabled={loading || !file} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50">
          <FileText size={14} /> Process Document
        </button>
      </div>
      {result && (
        <div className="bg-cream2 border border-black/[0.16] rounded-xl p-5 mt-4 animate-fadeUp text-sm leading-[1.85]">
          {result.error ? <p className="text-red-600">{result.error}</p> : (
            <>
              {result.summary && <><p className="font-display font-bold text-terra mb-2">📋 Summary</p><p className="whitespace-pre-wrap mb-4">{result.summary}</p></>}
              {result.translation && <><p className="font-display font-bold text-terra mb-2">📝 Translation</p><p className="whitespace-pre-wrap">{result.translation}</p></>}
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ── CHAT ────────────────────────────────────────────────
export function ChatPanel({ globalLang }) {
  const [lang,    setLang]    = useState(globalLang)
  const [input,   setInput]   = useState('')
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [msgs,    setMsgs]    = useState([
    { role: 'bot', text: '👋 Ẹ káàbọ̀! I\'m APRICA — your African language AI assistant. Ask me anything!' }
  ])
  const bottom = useRef()

  const scroll = () => bottom.current?.scrollIntoView({ behavior: 'smooth' })

  const send = async () => {
    const msg = input.trim(); if (!msg) return
    setInput('')
    const newMsgs = [...msgs, { role: 'user', text: msg }]
    setMsgs([...newMsgs, { role: 'bot', text: '…' }])
    setLoading(true)
    setTimeout(scroll, 50)
    const updatedHistory = [...history, { role: 'user', content: msg }]
    try {
      const d = await api.chat(msg, lang, updatedHistory)
      setMsgs([...newMsgs, { role: 'bot', text: d.reply }])
      setHistory([...updatedHistory, { role: 'assistant', content: d.reply }])
    } catch (e) {
      setMsgs([...newMsgs, { role: 'bot', text: '⚠️ ' + e.message }])
    }
    setLoading(false); setTimeout(scroll, 50)
  }

  return (
    <div className="card animate-fadeUp">
      <CardHeader icon={MessageCircle} title="AI Chatbot" sub="Converse in any African language" />
      <LangChips value={lang} onChange={setLang} />
      <div className="h-[340px] overflow-y-auto bg-cream2 border border-black/[0.16] rounded-xl rounded-b-none p-4 flex flex-col gap-3">
        {msgs.map((m, i) => (
          <div key={i} className={`max-w-[76%] ${m.role === 'user' ? 'self-end' : 'self-start'}`}>
            <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-ink text-cream font-medium rounded-br-sm'
                : 'bg-white text-ink border border-black/[0.07] rounded-bl-sm'
            }`}>{m.text}</div>
          </div>
        ))}
        <div ref={bottom} />
      </div>
      <div className="flex border border-black/[0.16] border-t-0 rounded-xl rounded-t-none overflow-hidden bg-white">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !loading && send()}
          placeholder="Ask anything… press Enter to send"
          className="flex-1 border-none bg-transparent px-4 py-3.5 text-sm font-sans text-ink outline-none" />
        <button onClick={send} disabled={loading}
          className="bg-ink text-cream px-5 flex items-center gap-2 text-sm font-semibold hover:bg-terra transition-colors border-none cursor-pointer disabled:opacity-50">
          <Send size={14} />
        </button>
        <button onClick={() => { setMsgs([{ role:'bot', text:'👋 Chat cleared!' }]); setHistory([]) }}
          className="bg-cream2 text-muted border-none border-l border-black/[0.09] px-3 cursor-pointer hover:bg-cream3 transition-colors">
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}

// ── TTS ─────────────────────────────────────────────────
const VOICES = [
  {k:'nigerian_female',e:'👩🏾',n:'Nigerian Female',a:'Nigerian'},
  {k:'nigerian_male',  e:'👨🏾',n:'Nigerian Male',  a:'Nigerian'},
  {k:'kenyan_female',  e:'👩🏿',n:'Kenyan Female',  a:'Kenyan'},
  {k:'kenyan_male',    e:'👨🏿',n:'Kenyan Male',    a:'Kenyan'},
  {k:'british_female', e:'👩🏻',n:'British Female', a:'British'},
  {k:'british_male',   e:'👨🏻',n:'British Male',   a:'British'},
  {k:'american_female',e:'👩🏼',n:'American Female',a:'American'},
  {k:'american_male',  e:'👨🏼',n:'American Male',  a:'American'},
]

export function TTSPanel({ globalLang }) {
  const [lang,   setLang]   = useState(globalLang)
  const [text,   setText]   = useState('')
  const [voice,  setVoice]  = useState('nigerian_female')
  const [auto,   setAuto]   = useState(false)
  const [audio,  setAudio]  = useState('')
  const [loading,setLoading]= useState(false)

  const generate = async () => {
    if (!text.trim()) return
    setLoading(true); setAudio('')
    try {
      const d = await api.tts(text, voice, lang, auto)
      setAudio(d.audio_url)
    } catch (e) { alert(e.message) }
    setLoading(false)
  }

  return (
    <div className="card animate-fadeUp">
      <CardHeader icon={Volume2} title="Text to Voice" sub="8 authentic African and international voices" />
      <LangChips value={lang} onChange={setLang} />
      <SectionLabel>Select Voice Profile</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
        {VOICES.map(v => (
          <button key={v.k} onClick={() => setVoice(v.k)}
            className={`rounded-xl p-3 text-center cursor-pointer transition-all border ${
              voice === v.k
                ? 'bg-ink border-ink text-cream'
                : 'bg-cream2 border-black/[0.16] hover:border-terra hover:bg-terra/5'
            }`}>
            <div className="text-2xl mb-1.5">{v.e}</div>
            <div className={`text-[11px] font-bold mb-0.5 ${voice === v.k ? 'text-cream' : 'text-ink'}`}>{v.n}</div>
            <div className={`text-[10px] ${voice === v.k ? 'text-white/50' : 'text-muted'}`}>{v.a}</div>
          </button>
        ))}
      </div>
      <div className="mb-3">
        <SectionLabel>Text to Speak</SectionLabel>
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4}
          placeholder="Enter text to convert to speech…" className="input-field resize-none" />
      </div>
      <label className="flex items-center gap-2.5 text-sm text-muted cursor-pointer mb-4">
        <input type="checkbox" checked={auto} onChange={e => setAuto(e.target.checked)} className="accent-terra" style={{width:'auto'}} />
        Auto-translate before speaking
      </label>
      {loading && <Loader text="Generating audio…" />}
      <div className="flex gap-2">
        <button onClick={generate} disabled={loading} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50">
          <Volume2 size={14} /> Generate Audio
        </button>
        <button onClick={() => setText('')} className="btn-ghost text-sm px-4 py-2.5">Clear</button>
      </div>
      <AudioPlayer src={audio} visible={!!audio} />
    </div>
  )
}

// ── STT ─────────────────────────────────────────────────
export function STTPanel({ globalLang }) {
  const [lang,    setLang]    = useState(globalLang)
  const [result,  setResult]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [recording, setRec]   = useState(false)
  const mediaRef = useRef(null)
  const chunksRef = useRef([])

  const toggleRecord = async () => {
    if (!recording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mr = new MediaRecorder(stream)
        chunksRef.current = []
        mr.ondataavailable = e => chunksRef.current.push(e.data)
        mr.onstop = async () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          const file = new File([blob], 'recording.webm', { type: 'audio/webm' })
          setLoading(true)
          try { setResult(await api.stt(file, lang)) }
          catch (e) { setResult({ error: e.message }) }
          setLoading(false)
        }
        mr.start(); mediaRef.current = mr; setRec(true)
      } catch { alert('Microphone not accessible') }
    } else {
      mediaRef.current?.stop(); setRec(false)
    }
  }

  const handleFile = async file => {
    setLoading(true); setResult(null)
    try { setResult(await api.stt(file, lang)) }
    catch (e) { setResult({ error: e.message }) }
    setLoading(false)
  }

  return (
    <div className="card animate-fadeUp">
      <CardHeader icon={Mic} title="Voice to Text" sub="Transcribe and translate audio in real-time" />
      <LangChips value={lang} onChange={setLang} />
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-cream2 border border-black/[0.16] rounded-xl p-8 text-center">
          <p className="text-xs text-muted italic mb-4">Record your voice in real-time</p>
          <button onClick={toggleRecord}
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 transition-all border-none cursor-pointer text-xl font-semibold ${
              recording
                ? 'bg-red-500 text-white shadow-[0_0_0_0_rgba(229,62,62,0.4)] animate-[recPulse_1.5s_infinite]'
                : 'bg-terra text-white shadow-[0_4px_20px_rgba(196,98,45,0.35)] hover:scale-105'
            }`}>
            {recording ? <StopCircle size={26} /> : <Mic size={26} />}
          </button>
          <p className="text-xs text-muted italic">{recording ? 'Recording… click to stop' : 'Click to start recording'}</p>
        </div>
        <div>
          <SectionLabel>Or upload audio</SectionLabel>
          <FileDropZone accept="audio/*,video/*" onFile={handleFile} label="Drop audio or video file" sublabel="MP3, WAV, M4A, MP4…" />
        </div>
      </div>
      {loading && <Loader text="Transcribing…" />}
      {result && (
        <div className="bg-cream2 border border-black/[0.16] rounded-xl p-5 mt-2 animate-fadeUp text-sm">
          {result.error ? <p className="text-red-600">{result.error}</p> : (
            <>
              <p className="text-[9px] font-bold text-muted tracking-[1.5px] uppercase mb-1.5">Original Speech</p>
              <p className="mb-4 leading-relaxed">{result.original_text}</p>
              <p className="text-[9px] font-bold text-muted tracking-[1.5px] uppercase mb-1.5">Translated</p>
              <p className="text-sage font-medium leading-relaxed">{result.translated_text}</p>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ── VIDEO TRANSLATION ───────────────────────────────────
export function VideoPanel({ globalLang }) {
  const [lang,   setLang]   = useState(globalLang)
  const [file,   setFile]   = useState(null)
  const [voice,  setVoice]  = useState('nigerian_female')
  const [result, setResult] = useState(null)
  const [loading,setLoading]= useState(false)

  const translate = async () => {
    if (!file) return
    setLoading(true); setResult(null)
    try { setResult(await api.translateVideo(file, lang, voice)) }
    catch (e) { setResult({ error: e.message }) }
    setLoading(false)
  }

  return (
    <div className="card animate-fadeUp">
      <CardHeader icon={Clapperboard} title="Video Translation" sub="Dub videos into African languages" />
      <LangChips value={lang} onChange={setLang} />
      <div className="mb-4 max-w-xs">
        <SectionLabel>Voice Profile</SectionLabel>
        <select value={voice} onChange={e => setVoice(e.target.value)} className="input-field">
          {VOICES.map(v => <option key={v.k} value={v.k}>{v.e} {v.n}</option>)}
        </select>
      </div>
      <FileDropZone accept="video/*" onFile={f => { setFile(f); setResult(null) }} fileName={file?.name}
        icon={Clapperboard} label="Drop your video file here" sublabel="MP4, MOV, AVI, MKV… (max 50MB)" />
      {loading && <Loader text="Translating video… this may take a moment" />}
      <div className="flex gap-2 mt-4">
        <button onClick={translate} disabled={loading || !file} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50">
          <Clapperboard size={14} /> Translate Video
        </button>
      </div>
      {result && (
        <div className="bg-cream2 border border-black/[0.16] rounded-xl p-5 mt-4 animate-fadeUp text-sm">
          {result.error ? <p className="text-red-600">{result.error}</p> : (
            <>
              <p className="text-[9px] font-bold text-muted tracking-[1.5px] uppercase mb-1.5">Original</p>
              <p className="mb-4 leading-relaxed">{result.original_text}</p>
              <p className="text-[9px] font-bold text-muted tracking-[1.5px] uppercase mb-1.5">Translation</p>
              <p className="text-sage font-medium leading-relaxed mb-4">{result.translated_text}</p>
              {result.audio_url && <AudioPlayer src={result.audio_url} visible />}
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ── BOOK TRANSLATION ────────────────────────────────────
export function BookPanel({ globalLang }) {
  const [lang,   setLang]   = useState(globalLang)
  const [file,   setFile]   = useState(null)
  const [result, setResult] = useState(null)
  const [loading,setLoading]= useState(false)

  const translate = async () => {
    if (!file) return
    setLoading(true); setResult(null)
    try { setResult(await api.translateBook(file, lang)) }
    catch (e) { setResult({ error: e.message }) }
    setLoading(false)
  }

  return (
    <div className="card animate-fadeUp">
      <CardHeader icon={BookOpen} title="Book Translator" sub="Translate and summarize entire books" />
      <LangChips value={lang} onChange={setLang} />
      <FileDropZone accept=".pdf,.txt" onFile={f => { setFile(f); setResult(null) }} fileName={file?.name}
        icon={BookOpen} label="Drop your book or document (PDF or TXT)" sublabel="Up to 50MB supported" />
      {loading && <Loader text="Analyzing and translating…" />}
      <div className="flex gap-2 mt-4">
        <button onClick={translate} disabled={loading || !file} className="btn-primary text-sm px-5 py-2.5 flex items-center gap-2 disabled:opacity-50">
          <BookOpen size={14} /> Translate & Summarize
        </button>
      </div>
      {result && (
        <div className="bg-cream2 border border-black/[0.16] rounded-xl p-5 mt-4 animate-fadeUp text-sm">
          {result.error ? <p className="text-red-600">{result.error}</p> : (
            <>
              <div className="flex justify-between items-center mb-4">
                <span className="text-[9px] font-bold text-sage tracking-[2px] uppercase bg-sage/10 px-2 py-1 rounded">{result.target_name}</span>
                <span className="text-xs text-muted">{(result.word_count||0).toLocaleString()} words</span>
              </div>
              <p className="font-display font-bold text-terra mb-2">📋 Summary</p>
              <p className="whitespace-pre-wrap leading-[1.85] mb-5">{result.summary}</p>
              <div className="border-t border-black/[0.07] pt-4">
                <p className="font-display font-bold text-terra mb-2">📖 Translated Preview</p>
                <p className="whitespace-pre-wrap leading-[1.85] text-muted">{result.translated_sample}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
