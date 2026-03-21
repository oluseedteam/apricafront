"""
APRICA - African Language AI Platform
Main Flask Application
Transforming African Voices: Speech-to-Text | Text-to-Speech | Translation
"""

import os
import uuid
import requests
from pathlib import Path
from flask import Flask, render_template, request, jsonify, send_file
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs('uploads', exist_ok=True)

# ── API CLIENT INITIALISATION ──────────────────────────────────────────
_openai_client = None
_translate_client = None

def get_openai():
    global _openai_client
    if _openai_client is None:
        from openai import OpenAI
        _openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", ""))
    return _openai_client

def get_translate():
    global _translate_client
    if _translate_client is None:
        try:
            from google.cloud import translate_v2 as translate
            cred = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "google_key.json")
            if os.path.exists(cred):
                _translate_client = translate.Client()
        except Exception:
            pass
    return _translate_client

# ── LANGUAGE & VOICE CONFIG ────────────────────────────────────────────
LANGUAGES = {
    'pcm': {'name': 'Nigerian Pidgin', 'flag': '🇳🇬', 'code': 'en'},
    'yo':  {'name': 'Yoruba',          'flag': '🇳🇬', 'code': 'yo'},
    'ha':  {'name': 'Hausa',           'flag': '🇳🇬', 'code': 'ha'},
    'sw':  {'name': 'Swahili',         'flag': '🇰🇪', 'code': 'sw'},
}

VOICE_PROFILES = {
    'nigerian_male':   'Nigerian Male',
    'nigerian_female': 'Nigerian Female',
    'kenyan_male':     'Kenyan Male',
    'kenyan_female':   'Kenyan Female',
    'british_male':    'British Male',
    'british_female':  'British Female',
    'american_male':   'American Male',
    'american_female': 'American Female',
}

ELEVENLABS_VOICES = {
    'nigerian_male':   os.getenv('EL_NIGERIAN_MALE',   'pNInz6obpgDQGcFmaJgB'),
    'nigerian_female': os.getenv('EL_NIGERIAN_FEMALE', 'EXAVITQu4vr4xnSDxMaL'),
    'kenyan_male':     os.getenv('EL_KENYAN_MALE',     'VR6AewLTigWG4xSOukaG'),
    'kenyan_female':   os.getenv('EL_KENYAN_FEMALE',   'pFZP5JQG7iQjIQuC4Bku'),
    'british_male':    os.getenv('EL_BRITISH_MALE',    'onwK4e9ZLuTAKqWW03F9'),
    'british_female':  os.getenv('EL_BRITISH_FEMALE',  'MF3mGyEYCl7XYWbV9V6O'),
    'american_male':   os.getenv('EL_AMERICAN_MALE',   'ErXwobaYiN019PkySvjV'),
    'american_female': os.getenv('EL_AMERICAN_FEMALE', 'ThT5KcBeYPX3keUQqHPh'),
}

OPENAI_VOICES = {
    'nigerian_male': 'onyx',   'nigerian_female': 'nova',
    'kenyan_male':   'echo',   'kenyan_female':   'shimmer',
    'british_male':  'fable',  'british_female':  'alloy',
    'american_male': 'onyx',   'american_female': 'nova',
}

# ── CORE TRANSLATE HELPER ─────────────────────────────────────────────
def _translate(text, target_lang):
    lang_name = LANGUAGES.get(target_lang, {}).get('name', target_lang)
    if target_lang == 'pcm' or not get_translate():
        prompt = (f"Translate accurately into {lang_name}. "
                  f"Preserve tone and natural idioms. Return ONLY translation:\n\n{text}")
        resp = get_openai().chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3)
        return resp.choices[0].message.content.strip()
    try:
        lc = LANGUAGES[target_lang]['code']
        return get_translate().translate(text, target_language=lc)['translatedText']
    except Exception:
        prompt = f"Translate to {lang_name}. Only return translation:\n\n{text}"
        resp = get_openai().chat.completions.create(
            model="gpt-4o",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3)
        return resp.choices[0].message.content.strip()

# ── HOME ──────────────────────────────────────────────────────────────
@app.route('/')
def index():
    return jsonify({"message": "APRICA API is running", "version": "1.0.0"})

# ── FEATURE 1: TEXT TRANSLATION ───────────────────────────────────────
@app.route('/api/translate/text', methods=['POST'])
def translate_text():
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        target_lang = data.get('target_lang', 'yo')
        if not text:
            return jsonify({"error": "No text provided"}), 400
        translated = _translate(text, target_lang)
        return jsonify({"original": text, "translated": translated,
                        "target_lang": target_lang, "target_name": LANGUAGES[target_lang]['name']})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ── FEATURE 2: URL TRANSLATION ────────────────────────────────────────
@app.route('/api/translate/url', methods=['POST'])
def translate_url():
    try:
        from bs4 import BeautifulSoup
        data = request.get_json()
        url = data.get('url', '').strip()
        target_lang = data.get('target_lang', 'yo')
        if not url:
            return jsonify({"error": "No URL provided"}), 400
        if not url.startswith(('http://', 'https://')):
            url = 'https://' + url
        headers = {'User-Agent': 'Mozilla/5.0'}
        resp = requests.get(url, headers=headers, timeout=15)
        soup = BeautifulSoup(resp.text, 'html.parser')
        texts = []
        for tag in soup.find_all(['h1','h2','h3','p','li'], limit=40):
            t = tag.get_text(strip=True)
            if len(t) > 20:
                texts.append(t)
        page_text = '\n'.join(texts[:25])
        title = soup.title.string if soup.title else url
        return jsonify({
            "url": url,
            "original_title": title,
            "translated_title": _translate(title, target_lang),
            "translated_body": _translate(page_text[:3000], target_lang),
            "target_lang": target_lang, "target_name": LANGUAGES[target_lang]['name']
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ── FEATURE 3: DOCUMENT TRANSLATION ──────────────────────────────────
@app.route('/api/translate/document', methods=['POST'])
def translate_document():
    try:
        target_lang = request.form.get('target_lang', 'yo')
        action = request.form.get('action', 'both')
        file = request.files.get('file')
        if not file:
            return jsonify({"error": "No file uploaded"}), 400
        ext = Path(file.filename).suffix.lower()
        raw_text = ''
        if ext == '.pdf':
            from PyPDF2 import PdfReader
            reader = PdfReader(file)
            for page in reader.pages:
                raw_text += (page.extract_text() or '') + '\n'
        elif ext in ('.docx', '.doc'):
            import docx
            doc = docx.Document(file)
            raw_text = '\n'.join([p.text for p in doc.paragraphs])
        elif ext == '.txt':
            raw_text = file.read().decode('utf-8', errors='ignore')
        else:
            return jsonify({"error": f"Unsupported file: {ext}"}), 400
        raw_text = raw_text.strip()[:8000]
        lang_name = LANGUAGES[target_lang]['name']
        result = {}
        if action in ('translate', 'both'):
            result['translation'] = _translate(raw_text, target_lang)
        if action in ('summarize', 'both'):
            prompt = (f"Summarize in {lang_name} in 5-7 bullet points. Key ideas only:\n\n{raw_text[:4000]}")
            resp = get_openai().chat.completions.create(
                model="gpt-4o", messages=[{"role":"user","content":prompt}])
            result['summary'] = resp.choices[0].message.content.strip()
        result.update({'filename': file.filename, 'target_lang': target_lang,
                       'target_name': lang_name, 'char_count': len(raw_text)})
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ── FEATURE 4: CHATBOT ────────────────────────────────────────────────
@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '').strip()
        lang = data.get('lang', 'yo')
        history = data.get('history', [])
        lang_name = LANGUAGES.get(lang, {}).get('name', 'English')
        system_prompt = (
            f"You are APRICA, an intelligent AI assistant for African languages. "
            f"ALWAYS respond in {lang_name}. You know African history, culture, and languages deeply. "
            f"Be warm, helpful, and culturally respectful."
        )
        messages = [{"role": "system", "content": system_prompt}]
        for h in history[-10:]:
            messages.append({"role": h['role'], "content": h['content']})
        messages.append({"role": "user", "content": message})
        resp = get_openai().chat.completions.create(model="gpt-4o", messages=messages, temperature=0.7)
        return jsonify({"reply": resp.choices[0].message.content.strip(),
                        "lang": lang, "lang_name": lang_name})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ── FEATURE 5: TEXT TO SPEECH ─────────────────────────────────────────
@app.route('/api/tts', methods=['POST'])
def text_to_speech():
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        voice_key = data.get('voice', 'nigerian_female')
        target_lang = data.get('target_lang', 'yo')
        auto_translate = data.get('auto_translate', False)
        if not text:
            return jsonify({"error": "No text provided"}), 400
        if auto_translate:
            text = _translate(text, target_lang)
        filename = f"tts_{uuid.uuid4().hex[:8]}.mp3"
        filepath = os.path.join('uploads', filename)
        el_key = os.getenv("ELEVENLABS_API_KEY", "")
        if el_key:
            voice_id = ELEVENLABS_VOICES.get(voice_key, list(ELEVENLABS_VOICES.values())[0])
            r = requests.post(
                f"https://api.elevenlabs.io/v1/text-to-speech/{voice_id}",
                json={"text": text, "model_id": "eleven_multilingual_v2",
                      "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}},
                headers={"xi-api-key": el_key, "Content-Type": "application/json"}, timeout=30)
            if r.status_code == 200:
                with open(filepath, 'wb') as f:
                    f.write(r.content)
                return jsonify({"audio_url": f"/api/audio/{filename}", "text": text})
        # Fallback: OpenAI TTS
        oai_voice = OPENAI_VOICES.get(voice_key, 'nova')
        resp = get_openai().audio.speech.create(model="tts-1-hd", voice=oai_voice, input=text[:4096])
        resp.stream_to_file(filepath)
        return jsonify({"audio_url": f"/api/audio/{filename}", "text": text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/audio/<filename>')
def serve_audio(filename):
    p = os.path.join('uploads', filename)
    return send_file(p, mimetype='audio/mpeg') if os.path.exists(p) else (jsonify({"error": "Not found"}), 404)

# ── FEATURE 6: SPEECH TO TEXT ─────────────────────────────────────────
@app.route('/api/stt', methods=['POST'])
def speech_to_text():
    try:
        audio_file = request.files.get('audio')
        target_lang = request.form.get('target_lang', 'yo')
        if not audio_file:
            return jsonify({"error": "No audio provided"}), 400
        ext = Path(audio_file.filename).suffix or '.webm'
        tmp = os.path.join('uploads', f"stt_{uuid.uuid4().hex[:8]}{ext}")
        audio_file.save(tmp)
        try:
            with open(tmp, 'rb') as f:
                transcript = get_openai().audio.transcriptions.create(
                    model="whisper-1", file=f, response_format="text")
            original = transcript.strip()
            translated = _translate(original, target_lang)
            return jsonify({"original_text": original, "translated_text": translated,
                            "target_lang": target_lang, "target_name": LANGUAGES[target_lang]['name']})
        finally:
            if os.path.exists(tmp):
                os.remove(tmp)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ── FEATURE 7: VIDEO TRANSLATION ──────────────────────────────────────
@app.route('/api/translate/video', methods=['POST'])
def translate_video():
    try:
        vf = request.files.get('video')
        target_lang = request.form.get('target_lang', 'yo')
        voice_key = request.form.get('voice', 'nigerian_female')
        if not vf:
            return jsonify({"error": "No video provided"}), 400
        jid = uuid.uuid4().hex[:10]
        vpath = os.path.join('uploads', f"vid_{jid}.mp4")
        vf.save(vpath)
        with open(vpath, 'rb') as f:
            transcript = get_openai().audio.transcriptions.create(
                model="whisper-1", file=f, response_format="text")
        original = transcript.strip()
        translated = _translate(original, target_lang)
        apath = os.path.join('uploads', f"aud_{jid}.mp3")
        el_key = os.getenv("ELEVENLABS_API_KEY", "")
        if el_key:
            vid = ELEVENLABS_VOICES.get(voice_key, list(ELEVENLABS_VOICES.values())[0])
            r = requests.post(f"https://api.elevenlabs.io/v1/text-to-speech/{vid}",
                json={"text": translated, "model_id": "eleven_multilingual_v2"},
                headers={"xi-api-key": el_key}, timeout=30)
            if r.status_code == 200:
                with open(apath, 'wb') as fa:
                    fa.write(r.content)
        else:
            resp = get_openai().audio.speech.create(
                model="tts-1-hd", voice=OPENAI_VOICES.get(voice_key,'nova'), input=translated[:4096])
            resp.stream_to_file(apath)
        video_url = None
        try:
            from moviepy.editor import VideoFileClip, AudioFileClip
            opath = os.path.join('uploads', f"out_{jid}.mp4")
            vc = VideoFileClip(vpath)
            ac = AudioFileClip(apath)
            vc.set_audio(ac).write_videofile(opath, codec='libx264', audio_codec='aac', verbose=False)
            vc.close(); ac.close()
            video_url = f"/api/video/{os.path.basename(opath)}"
        except ImportError:
            pass
        return jsonify({"job_id": jid, "original_text": original, "translated_text": translated,
                        "target_lang": target_lang, "target_name": LANGUAGES[target_lang]['name'],
                        "audio_url": f"/api/audio/aud_{jid}.mp3", "video_url": video_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/video/<filename>')
def serve_video(filename):
    p = os.path.join('uploads', filename)
    return send_file(p, mimetype='video/mp4') if os.path.exists(p) else (jsonify({"error":"Not found"}), 404)

# ── FEATURE 8: BOOK TRANSLATION & SUMMARY ────────────────────────────
@app.route('/api/translate/book', methods=['POST'])
def translate_book():
    try:
        target_lang = request.form.get('target_lang', 'yo')
        file = request.files.get('file')
        if not file:
            return jsonify({"error": "No file provided"}), 400
        ext = Path(file.filename).suffix.lower()
        raw_text = ''
        if ext == '.pdf':
            from PyPDF2 import PdfReader
            for page in PdfReader(file).pages:
                raw_text += (page.extract_text() or '') + '\n'
        elif ext == '.txt':
            raw_text = file.read().decode('utf-8', errors='ignore')
        else:
            return jsonify({"error": "Upload PDF or TXT"}), 400
        lang_name = LANGUAGES[target_lang]['name']
        prompt = (f"Create a comprehensive {lang_name} summary covering:\n"
                  f"1. Main theme  2. Key sections  3. Important insights  4. Conclusion\n\n{raw_text[:6000]}")
        resp = get_openai().chat.completions.create(
            model="gpt-4o", messages=[{"role":"user","content":prompt}])
        return jsonify({"filename": file.filename, "word_count": len(raw_text.split()),
                        "target_lang": target_lang, "target_name": lang_name,
                        "summary": resp.choices[0].message.content.strip(),
                        "translated_sample": _translate(raw_text[:1500], target_lang)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/info')
def api_info():
    return jsonify({"platform": "APRICA", "version": "1.0.0",
                    "languages": LANGUAGES, "voices": VOICE_PROFILES})

if __name__ == '__main__':
    print("\n🌍 APRICA Platform starting...")
    print("   Visit: http://localhost:5000\n")
    app.run(debug=True, host='0.0.0.0', port=5000)


# ── SERVE REACT BUILD (for production) ───────────────────────────────
import os as _os
_dist = _os.path.join(_os.path.dirname(__file__), 'dist')

@app.route('/app', defaults={'path': ''})
@app.route('/app/<path:path>')
def serve_react(path):
    from flask import send_from_directory
    if path and _os.path.exists(_os.path.join(_dist, path)):
        return send_from_directory(_dist, path)
    return send_from_directory(_dist, 'index.html')
