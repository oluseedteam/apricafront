const BASE = '/api'

async function req(path, opts = {}) {
  const res = await fetch(BASE + path, opts)
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data
}

export const api = {
  translateText: (text, target_lang) =>
    req('/translate/text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, target_lang }),
    }),

  translateUrl: (url, target_lang) =>
    req('/translate/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, target_lang }),
    }),

  translateDocument: (file, target_lang, action) => {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('target_lang', target_lang)
    fd.append('action', action)
    return req('/translate/document', { method: 'POST', body: fd })
  },

  chat: (message, lang, history) =>
    req('/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, lang, history }),
    }),

  tts: (text, voice, target_lang, auto_translate) =>
    req('/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice, target_lang, auto_translate }),
    }),

  stt: (audio, target_lang) => {
    const fd = new FormData()
    fd.append('audio', audio, audio.name || 'recording.webm')
    fd.append('target_lang', target_lang)
    return req('/stt', { method: 'POST', body: fd })
  },

  translateVideo: (video, target_lang, voice) => {
    const fd = new FormData()
    fd.append('video', video)
    fd.append('target_lang', target_lang)
    fd.append('voice', voice)
    return req('/translate/video', { method: 'POST', body: fd })
  },

  translateBook: (file, target_lang) => {
    const fd = new FormData()
    fd.append('file', file)
    fd.append('target_lang', target_lang)
    return req('/translate/book', { method: 'POST', body: fd })
  },
}
