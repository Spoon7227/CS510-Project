# NoteScribe

NoteScribe is a web application that transcribes audio files or YouTube videos and generates meeting or lecture notes using OpenAI's language models.

## Prerequisites

Before running the application, ensure you have the following installed:

- Python 3.x
- Node.js (with npm)
- Git

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Spoon7227/CS510-Project.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd backend
    ```

3. Install backend dependencies:

    ```bash
    npm install
    pip install -r requirements.txt
    ```

4. Navigate to the frontend directory:

    ```bash
    cd ../frontend
    ```

5. Install frontend dependencies:

    ```bash
    npm install
    ```

6. Install `react-scripts`:

    ```bash
    npm install react-scripts
    ```

## Usage

1. Start the backend server:

    ```bash
    node server.js
    ```

2. Start the frontend development server:

    ```bash
    npm start
    ```

3. Access the application in your browser:

    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Configuration

Before running the application, ensure to configure the following:

- Set up the OpenAI API key in the `config.js` file.
