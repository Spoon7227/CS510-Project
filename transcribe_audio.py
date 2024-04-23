from pytube import YouTube
import os
from openai import OpenAI
import config
from moviepy.editor import AudioFileClip
import io
import tempfile


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
def process_audio_file(audio_clip, chunks_transcript, chunks_notes, chunk_length=60):
    total_duration = audio_clip.duration

    # Determine the number of chunks
    num_chunks = int(total_duration / chunk_length) + 1

    for i in range(num_chunks):
        start_time = i * chunk_length
        end_time = min((i + 1) * chunk_length, total_duration)
        chunk_audio_clip = audio_clip.subclip(start_time, end_time)

        # Save the chunk to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmpfile:
            chunk_audio_clip.write_audiofile(tmpfile.name, codec='pcm_s16le')
            chunk_transcript = transcribe_audio_with_openai(tmpfile.name)
            os.unlink(tmpfile.name)  # Delete the temp file after transcription

        chunk_notes = generate_notes_with_chat_api(chunk_transcript)
        chunks_transcript.append(chunk_transcript)
        chunks_notes.append(chunk_notes)

# Function to process YouTube URL and generate transcripts
def process_youtube_link(url):
    yt = YouTube(url)

    # Get the best audio stream
    audio_stream = yt.streams.filter(only_audio=True, file_extension='webm').first()

    if audio_stream:
        # Create a temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            # Download the audio stream into the temporary directory
            file_path = audio_stream.download(output_path=temp_dir)

            # Process audio file in chunks
            chunks_transcript = []
            chunks_notes = []
            audio_clip = AudioFileClip(file_path)
            process_audio_file(audio_clip, chunks_transcript, chunks_notes)

            # Display final fully appended notes and transcript
            print("\nFinal Transcript:")
            print("\n".join(chunks_transcript))
            print("\nFinal Notes:")
            print("\n".join(chunks_notes))

            # The temporary directory and its contents are automatically cleaned up
    else:
        print("No suitable audio stream found.")




# Main function
def main():
    choice = input("Choose an option (1 for uploading audio file, 2 for providing YouTube link): ")

    if choice == '1':
        audio_file_path = input("Enter the path to the audio file: ")
        process_audio_file(audio_file_path)
    elif choice == '2':
        url = input("Enter the YouTube link: ")
        process_youtube_link(url)
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()
