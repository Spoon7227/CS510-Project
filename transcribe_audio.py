from pytube import YouTube
import os
from openai import OpenAI
import config

url = 'https://www.youtube.com/watch?v=3cGYEjQuCKc'

yt = YouTube(url)

audio_streams = yt.streams.filter(only_audio=True, file_extension='webm').first()

if audio_streams:
    filename = 'downloaded_video.webm'
    
    filesize = audio_streams.filesize
    
    audio_streams.download(filename=filename)

    client = OpenAI(api_key=config.API_KEY)

    with open(filename, "rb") as audio_file:
        transcription = client.audio.transcriptions.create(model="whisper-1", file=audio_file)
        
        text = transcription.text
        
        print(text)
else:
    print("No suitable audio stream found.")

