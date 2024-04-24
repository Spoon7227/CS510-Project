import sys
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

# Function to generate detailed notes using OpenAI Chat API
def generate_detailed_notes(user_input):
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

    # Return the generated detailed notes
    return completion.choices[0].message.content

# Function to generate short bullet points using OpenAI Chat API
def generate_bullet_points(user_input):
    # Initialize the OpenAI client
    client = OpenAI(api_key=config.API_KEY)

    # Define the prompt with the system message and user query
    prompt = [
        {"role": "system", "content": "You are a knowledgeable assistant, capable of summarizing complex concepts with clarity."},
        {"role": "user", "content": user_input},
        {"role": "system", "content": "Please provide concise bullet points summarizing the main points."}  # Instruction for concise notes
    ]

    # Generate completion
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=prompt
    )

    # Process the response into bullet points
    response = completion.choices[0].message.content
    # bullet_points = "- " + response.replace("\n", "\n- ")  # Add bullet points
    return response

# Function to process audio file and generate transcripts
def process_audio_file(audio_clip, notes_type, chunk_length=60):
    chunks_transcript = []
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

        chunks_transcript.append(chunk_transcript)

    # Concatenate all chunks into a single transcript
    transcript = "\n".join(chunks_transcript)

    # Generate notes based on the chosen type
    if notes_type == '1':
        notes = generate_detailed_notes(transcript)
    elif notes_type == '2':
        notes = generate_bullet_points(transcript)
    else:
        notes = "Invalid notes type choice."

    # Display final transcript and notes
    print("\nFinal Transcript:")
    print(transcript)
    print("\nFinal Notes:")
    print(notes)

# Function to process YouTube URL and generate transcripts
def process_youtube_link(url, notes_type):
    yt = YouTube(url)

    # Get the best audio stream
    audio_stream = yt.streams.filter(only_audio=True, file_extension='webm').first()

    if audio_stream:
        # Create a temporary directory
        with tempfile.TemporaryDirectory() as temp_dir:
            # Download the audio stream into the temporary directory
            file_path = audio_stream.download(output_path=temp_dir)

            # Process audio file in chunks
            audio_clip = AudioFileClip(file_path)
            process_audio_file(audio_clip, notes_type)

            # The temporary directory and its contents are automatically cleaned up
    else:
        print("No suitable audio stream found.")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python script.py <choice> <audio_file_or_youtube_link> <notes_type>")
        sys.exit(1)

    choice = sys.argv[1]
    if choice == '1':
        audio_file_path = sys.argv[2]
        notes_type = sys.argv[3]
        audio_clip = AudioFileClip(audio_file_path)
        process_audio_file(audio_clip, notes_type)
    elif choice == '2':
        url = sys.argv[2]
        notes_type = sys.argv[3]
        process_youtube_link(url, notes_type)
    else:
        print("Invalid choice.")

