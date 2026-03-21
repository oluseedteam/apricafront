"""
APRICA - Standalone Video Translation Module
Use this script to translate videos from the command line.

Usage:
    python video_translator.py input.mp4 yo nigerian_female output.mp4
"""

import os
import sys
import argparse
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

LANGUAGES = {
    'pcm': 'Nigerian Pidgin', 'yo': 'Yoruba',
    'ha': 'Hausa', 'sw': 'Swahili'
}

def translate_video(input_path, target_lang, voice_style, output_path):
    from openai import OpenAI
    import requests

    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    lang_name = LANGUAGES.get(target_lang, target_lang)

    print(f"\n🎬 APRICA Video Translator")
    print(f"   Input:  {input_path}")
    print(f"   Target: {lang_name} | Voice: {voice_style}")
    print(f"   Output: {output_path}\n")

    # ── Step 1: Transcribe ───────────────────────────────────
    print("Step 1/4: Transcribing video audio with Whisper...")
    with open(input_path, 'rb') as f:
        transcript = client.audio.transcriptions.create(
            model="whisper-1", file=f, response_format="text")
    original_text = transcript.strip()
    print(f"  ✅ Original: {original_text[:100]}...")

    # ── Step 2: Translate ────────────────────────────────────
    print(f"Step 2/4: Translating to {lang_name}...")
    if target_lang == 'pcm':
        resp = client.chat.completions.create(
            model="gpt-4o",
            messages=[{"role":"user","content":f"Translate to Nigerian Pidgin:\n{original_text}"}])
        translated = resp.choices[0].message.content.strip()
    else:
        try:
            from google.cloud import translate_v2 as translate
            tc = translate.Client()
            lang_codes = {'yo':'yo','ha':'ha','sw':'sw'}
            translated = tc.translate(original_text, target_language=lang_codes[target_lang])['translatedText']
        except Exception:
            resp = client.chat.completions.create(
                model="gpt-4o",
                messages=[{"role":"user","content":f"Translate to {lang_name}:\n{original_text}"}])
            translated = resp.choices[0].message.content.strip()
    print(f"  ✅ Translated: {translated[:100]}...")

    # ── Step 3: Generate Voice ───────────────────────────────
    print("Step 3/4: Generating voiceover...")
    audio_path = str(Path(output_path).with_suffix('')) + "_audio.mp3"
    el_key = os.getenv("ELEVENLABS_API_KEY", "")
    VOICE_MAP = {
        'nigerian_female': 'EXAVITQu4vr4xnSDxMaL',
        'nigerian_male':   'pNInz6obpgDQGcFmaJgB',
        'kenyan_female':   'pFZP5JQG7iQjIQuC4Bku',
        'kenyan_male':     'VR6AewLTigWG4xSOukaG',
        'british_female':  'MF3mGyEYCl7XYWbV9V6O',
        'british_male':    'onwK4e9ZLuTAKqWW03F9',
        'american_female': 'ThT5KcBeYPX3keUQqHPh',
        'american_male':   'ErXwobaYiN019PkySvjV',
    }
    OAI_VOICES = {
        'nigerian_female':'nova','nigerian_male':'onyx',
        'kenyan_female':'shimmer','kenyan_male':'echo',
        'british_female':'alloy','british_male':'fable',
        'american_female':'nova','american_male':'onyx',
    }
    if el_key:
        vid = VOICE_MAP.get(voice_style, VOICE_MAP['nigerian_female'])
        r = requests.post(
            f"https://api.elevenlabs.io/v1/text-to-speech/{vid}",
            json={"text": translated, "model_id": "eleven_multilingual_v2",
                  "voice_settings": {"stability": 0.5, "similarity_boost": 0.75}},
            headers={"xi-api-key": el_key}, timeout=60)
        if r.status_code == 200:
            with open(audio_path, 'wb') as f: f.write(r.content)
            print("  ✅ ElevenLabs voice generated")
        else:
            el_key = None  # fallback
    if not el_key:
        resp = client.audio.speech.create(
            model="tts-1-hd", voice=OAI_VOICES.get(voice_style,'nova'), input=translated[:4096])
        resp.stream_to_file(audio_path)
        print("  ✅ OpenAI TTS voice generated")

    # ── Step 4: Merge ────────────────────────────────────────
    print("Step 4/4: Merging audio into video...")
    try:
        from moviepy.editor import VideoFileClip, AudioFileClip
        vc = VideoFileClip(input_path)
        ac = AudioFileClip(audio_path)
        vc.set_audio(ac).write_videofile(output_path, codec='libx264', audio_codec='aac')
        vc.close(); ac.close()
        os.remove(audio_path)
        print(f"\n🎉 Done! Saved to: {output_path}")
    except ImportError:
        print("  ⚠️  moviepy not installed — audio saved separately at: " + audio_path)
        print("  Install with: pip install moviepy")

    return {"original": original_text, "translated": translated}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="APRICA Video Translator")
    parser.add_argument("input", help="Input video path")
    parser.add_argument("lang", choices=['yo','ha','sw','pcm'], help="Target language code")
    parser.add_argument("voice", help="Voice style (e.g., nigerian_female)")
    parser.add_argument("output", help="Output video path")
    args = parser.parse_args()
    translate_video(args.input, args.lang, args.voice, args.output)
