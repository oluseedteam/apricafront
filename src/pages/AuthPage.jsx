import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { Eye, EyeOff, AlertCircle, CheckCircle, Languages, Mic, Clapperboard } from 'lucide-react'

const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

function PasswordInput({ id, value, onChange, placeholder, onKeyDown }) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <input
        id={id} type={show ? 'text' : 'password'}
        value={value} onChange={onChange} onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="input-field pr-12"
      />
      <button type="button" onClick={() => setShow(s => !s)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted2 hover:text-ink transition-colors p-1">
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  )
}

function StrengthBar({ password }) {
  if (!password) return null
  let score = 0
  if (password.length >= 8)        score++
  if (/[A-Z]/.test(password))      score++
  if (/[0-9]/.test(password))      score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  const levels = [
    { w: '25%',  color: '#E74C3C', label: 'Weak' },
    { w: '50%',  color: '#E67E22', label: 'Fair' },
    { w: '75%',  color: '#F1C40F', label: 'Good' },
    { w: '100%', color: '#27AE60', label: 'Strong' },
  ]
  const lv = levels[Math.max(0, score - 1)]
  return (
    <div className="mt-2">
      <div className="h-[3px] bg-parchment rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: lv.w, background: lv.color }} />
      </div>
      <p className="text-[10px] mt-1.5 font-medium" style={{ color: lv.color }}>{lv.label} password</p>
    </div>
  )
}

function Alert({ type, message }) {
  if (!message) return null
  const isErr = type === 'error'
  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium mb-4 ${
      isErr ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-sage/10 border border-sage/20 text-sage'
    }`}>
      {isErr ? <AlertCircle size={15} /> : <CheckCircle size={15} />}
      {message}
    </div>
  )
}

export default function AuthPage() {
  const [tab, setTab]         = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState('')

  // Login fields
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass,  setLoginPass]  = useState('')

  // Signup fields
  const [fname,      setFname]      = useState('')
  const [lname,      setLname]      = useState('')
  const [signupEmail,setSignupEmail]= useState('')
  const [signupPass, setSignupPass] = useState('')
  const [terms,      setTerms]      = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const clear = () => { setError(''); setSuccess('') }
  const isEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

  const goToDash = (userData) => {
    login(userData)
    navigate('/dashboard')
  }

  const handleGoogle = () => {
    // Replace with real OAuth when backend ready: window.location.href = '/auth/google'
    goToDash({ name: 'User', email: 'user@google.com', avatar: 'G' })
  }

  const handleLogin = async () => {
    clear()
    if (!loginEmail)          return setError('Please enter your email.')
    if (!isEmail(loginEmail)) return setError('Please enter a valid email.')
    if (!loginPass)           return setError('Please enter your password.')

    setLoading(true)
    // Simulate — replace with: const res = await api.login(loginEmail, loginPass)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    goToDash({ name: loginEmail.split('@')[0], email: loginEmail, avatar: loginEmail[0].toUpperCase() })
  }

  const handleSignup = async () => {
    clear()
    if (!fname || !lname)       return setError('Please enter your full name.')
    if (!signupEmail)           return setError('Please enter your email.')
    if (!isEmail(signupEmail))  return setError('Please enter a valid email.')
    if (signupPass.length < 8)  return setError('Password must be at least 8 characters.')
    if (!terms)                 return setError('Please accept the Terms to continue.')

    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setSuccess(`Welcome, ${fname}! Redirecting to your dashboard…`)
    setTimeout(() => goToDash({ name: `${fname} ${lname}`, email: signupEmail, avatar: fname[0].toUpperCase() }), 1400)
  }

  const pills = [
    { icon: Languages,    title: 'Instant Translation',  desc: 'English & French → 4 African languages' },
    { icon: Mic,          title: 'Voice & Audio',        desc: '8 authentic African voice profiles' },
    { icon: Clapperboard, title: 'Video Translation',    desc: 'Dub entire videos into African languages' },
  ]

  return (
    <div className="min-h-screen flex font-sans overflow-hidden">

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex w-[52%] bg-ink flex-col justify-between p-12 relative overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] rounded-full bg-terra/40 blur-[100px] animate-drift1 pointer-events-none" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-sage/25 blur-[90px] animate-drift2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-[250px] h-[250px] rounded-full bg-yellow-500/10 blur-[70px] animate-drift3 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{backgroundImage:'radial-gradient(circle, rgba(250,247,242,0.04) 1px, transparent 1px)', backgroundSize:'32px 32px'}} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 font-bold text-white bg-black flex items-center justify-center text-xl shadow-[0_4px_20px_rgba(196,98,45,0.4)]">A</div>
          <span className="font-display font-bold text-xl tracking-widest text-cream">APRICA</span>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-7 h-px bg-terra" />
            <span className="text-terra text-[11px] font-semibold tracking-[3px] uppercase">Africa's AI Language Platform</span>
          </div>
          <h1 className="font-display font-black text-5xl text-cream leading-[1.06] tracking-tight mb-5">
            Speak<br /><em className="not-italic text-[#E09060]">Africa's</em><br />Languages
          </h1>
          <p className="text-white/45 text-sm leading-relaxed max-w-sm mb-10">
            AI-powered translation, transcription, and voice synthesis for Nigeria and East Africa's most spoken languages.
          </p>
          <div className="flex flex-col gap-3">
            {pills.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 backdrop-blur-sm hover:bg-white/[0.07] transition-all">
                <div className="w-10 h-10 rounded-xl bg-terra/10 border border-terra/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-terra" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="font-semibold text-cream text-sm">{title}</p>
                  <p className="text-white/40 text-xs mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center gap-4">
          <span className="text-2xl">🇳🇬🇰🇪</span>
          <span className="text-white/25 text-xs">Yoruba · Hausa · Swahili · Pidgin</span>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 bg-cream flex items-center justify-center p-6 md:p-10 overflow-y-auto">
        <div className="w-full max-w-[420px]">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-3 mb-8">
            <div className="w-9 h-9 rounded-xl bg-terra-gradient flex items-center justify-center text-lg">🌍</div>
            <span className="font-display font-bold text-xl tracking-widest text-ink">APRICA</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-cream2 border border-black/[0.16] rounded-[14px] p-1 mb-8">
            {['login', 'signup'].map(t => (
              <button key={t} onClick={() => { setTab(t); clear() }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border-none cursor-pointer ${
                  tab === t ? 'bg-ink text-cream shadow-md' : 'bg-transparent text-muted hover:text-ink'
                }`}>
                {t === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          {/* ── LOGIN ── */}
          {tab === 'login' && (
            <div className="animate-fadeUp">
              <h2 className="font-display font-bold text-2xl text-ink mb-1">Welcome back</h2>
              <p className="text-muted text-sm mb-6">Sign in to access your APRICA dashboard.</p>

              <Alert type="error" message={error} />

              <button onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 bg-white border border-black/[0.16] rounded-xl py-3.5 text-[#3C4043] text-sm font-semibold hover:border-blue-400 hover:shadow-[0_4px_20px_rgba(66,133,244,0.15)] hover:-translate-y-0.5 transition-all duration-200 mb-5 cursor-pointer">
                <GoogleLogo /> Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-black/[0.09]" />
                <span className="text-muted2 text-xs">or sign in with email</span>
                <div className="flex-1 h-px bg-black/[0.09]" />
              </div>

              <div className="mb-4">
                <label className="block text-[10px] font-bold text-muted tracking-[2px] uppercase mb-2">Email Address</label>
                <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                  placeholder="you@example.com" className="input-field"
                  onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              </div>

              <div className="mb-2">
                <label className="block text-[10px] font-bold text-muted tracking-[2px] uppercase mb-2">Password</label>
                <PasswordInput id="login-pass" value={loginPass} onChange={e => setLoginPass(e.target.value)}
                  placeholder="Enter your password" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
              </div>

              <div className="flex justify-end mb-5">
                <button className="text-terra text-xs font-semibold hover:underline bg-transparent border-none cursor-pointer">Forgot password?</button>
              </div>

              <button onClick={handleLogin} disabled={loading}
                className="btn-primary w-full py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4">
                {loading ? 'Signing in…' : 'Sign In to APRICA'}
              </button>

              <p className="text-center text-xs text-muted2">
                Don't have an account?{' '}
                <button onClick={() => setTab('signup')} className="text-terra font-semibold hover:underline bg-transparent border-none cursor-pointer">
                  Create one free →
                </button>
              </p>
            </div>
          )}

          {/* ── SIGNUP ── */}
          {tab === 'signup' && (
            <div className="animate-fadeUp">
              <h2 className="font-display font-bold text-2xl text-ink mb-1">Create your account</h2>
              <p className="text-muted text-sm mb-6">Join APRICA and start translating Africa's languages.</p>

              <Alert type="error"   message={error} />
              <Alert type="success" message={success} />

              <button onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 bg-white border border-black/[0.16] rounded-xl py-3.5 text-[#3C4043] text-sm font-semibold hover:border-blue-400 hover:shadow-[0_4px_20px_rgba(66,133,244,0.15)] hover:-translate-y-0.5 transition-all duration-200 mb-5 cursor-pointer">
                <GoogleLogo /> Continue with Google
              </button>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-black/[0.09]" />
                <span className="text-muted2 text-xs">or sign up with email</span>
                <div className="flex-1 h-px bg-black/[0.09]" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-[10px] font-bold text-muted tracking-[2px] uppercase mb-2">First Name</label>
                  <input type="text" value={fname} onChange={e => setFname(e.target.value)} placeholder="Ada" className="input-field" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-muted tracking-[2px] uppercase mb-2">Last Name</label>
                  <input type="text" value={lname} onChange={e => setLname(e.target.value)} placeholder="Obi" className="input-field" />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[10px] font-bold text-muted tracking-[2px] uppercase mb-2">Email Address</label>
                <input type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)}
                  placeholder="you@example.com" className="input-field" />
              </div>

              <div className="mb-5">
                <label className="block text-[10px] font-bold text-muted tracking-[2px] uppercase mb-2">Password</label>
                <PasswordInput id="signup-pass" value={signupPass} onChange={e => setSignupPass(e.target.value)}
                  placeholder="Create a strong password" />
                <StrengthBar password={signupPass} />
              </div>

              <div className="flex items-start gap-3 mb-5">
                <input type="checkbox" id="terms" checked={terms} onChange={e => setTerms(e.target.checked)}
                  className="mt-0.5 accent-terra flex-shrink-0 cursor-pointer" style={{width:'auto'}} />
                <label htmlFor="terms" className="text-xs text-muted leading-relaxed cursor-pointer">
                  I agree to the <a href="#" className="text-terra font-medium hover:underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-terra font-medium hover:underline">Privacy Policy</a>
                </label>
              </div>

              <button onClick={handleSignup} disabled={loading}
                className="btn-primary w-full py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mb-4">
                {loading ? 'Creating account…' : 'Create Free Account'}
              </button>

              <p className="text-center text-xs text-muted2">
                Already have an account?{' '}
                <button onClick={() => setTab('login')} className="text-terra font-semibold hover:underline bg-transparent border-none cursor-pointer">
                  Sign in →
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
