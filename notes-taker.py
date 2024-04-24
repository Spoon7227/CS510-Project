from pytube import YouTube
import os
from openai import OpenAI
from backend import config


# Function to transcribe audio using OpenAI API
def transcribe_audio_with_openai(audio_file_path):
    # Initialize the OpenAI client
    client = OpenAI(api_key=config.API_KEY)

    # Load audio file
    with open(audio_file_path, "rb") as audio_file:
        # Transcribe
        transcription = client.audio.transcriptions.create(
            model="whisper-1",
            file=audio_file
        )

    # Return the transcribed text
    return transcription.text

# Function to generate notes using OpenAI Chat API
def generate_notes_with_chat_api(user_input):
    # Initialize the OpenAI client
    client = OpenAI(api_key=config.API_KEY)

    # Define the prompt with the system message and user query
    prompt = [
        {"role": "system", "content": "You are a knowledgeable assistant, capable of summarizing complex concepts with clarity."},
        {"role": "user", "content": user_input}
    ]

    # Generate completion
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=prompt
    )

    # Return the generated notes
    return completion.choices[0].message.content

# Function to process audio file and generate transcripts
def process_audio_file(audio_file_path):
    # Transcribe audio
    transcription_text = transcribe_audio_with_openai(audio_file_path)

    # Display extracted text
    print("Extracted Text:")
    print(transcription_text)

    # Generate notes using Chat API
    notes = generate_notes_with_chat_api(transcription_text)

    # Display notes
    print("\nGenerated Notes:")
    print(notes)

# Function to process YouTube URL and generate transcripts
def process_youtube_link(url):
    yt = YouTube(url)

    # Get the best audio stream
    audio_streams = yt.streams.filter(only_audio=True, file_extension='webm').first()

    if audio_streams:
        filename = 'downloaded_video.webm'

        # Download the audio stream
        audio_streams.download(filename=filename)

        # Process downloaded audio file
        process_audio_file(filename)

        # Clean up downloaded audio file
        os.remove(filename)
    else:
        print("No suitable audio stream found.")

# Main function
def main():
    choice = input("Choose an option (1 for uploading audio file, 2 for providing YouTube link): ")

    if choice == '1':
        # audio_file_path = input("Enter the path to the audio file: ")
        audio_file_path = "sample-audio.mp3"
        process_audio_file(audio_file_path)
    elif choice == '2':
        # url = input("Enter the YouTube link: ")
        url = 'https://www.youtube.com/watch?v=3cGYEjQuCKc'
        process_youtube_link(url)
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()
