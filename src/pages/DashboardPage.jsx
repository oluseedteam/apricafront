import { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import {
  HomePanel, TranslatePanel, UrlPanel, DocumentPanel,
  ChatPanel, TTSPanel, STTPanel, VideoPanel, BookPanel
} from '../components/features/Panels'

export default function DashboardPage() {
  const [active,      setActive]      = useState('home')
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [globalLang,  setGlobalLang]  = useState('yo')

  const panels = {
    home:     <HomePanel setActive={setActive} />,
    translate:<TranslatePanel globalLang={globalLang} />,
    url:      <UrlPanel globalLang={globalLang} />,
    document: <DocumentPanel globalLang={globalLang} />,
    chat:     <ChatPanel globalLang={globalLang} />,
    tts:      <TTSPanel globalLang={globalLang} />,
    stt:      <STTPanel globalLang={globalLang} />,
    video:    <VideoPanel globalLang={globalLang} />,
    book:     <BookPanel globalLang={globalLang} />,
  }

  return (
    <div className="flex h-screen bg-cream font-sans overflow-hidden">
      <Sidebar
        active={active}
        setActive={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        globalLang={globalLang}
        setGlobalLang={setGlobalLang}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
        <Topbar active={active} setMobileOpen={setMobileOpen} />
        <main className="flex-1 overflow-y-auto p-5 md:p-7 lg:p-8">
          <div key={active} className="max-w-5xl mx-auto">
            {panels[active]}
          </div>
        </main>
      </div>
    </div>
  )
}
