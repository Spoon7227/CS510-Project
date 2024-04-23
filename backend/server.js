const express = require('express');
<<<<<<< HEAD
=======
const { spawn } = require('child_process');
>>>>>>> kiruthika
const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

<<<<<<< HEAD
app.get('/api/message', (req, res) => {
    res.send('Hello from the backend API!');
=======
app.get('/api/transcribe', (req, res) => {
    const choice = 2;
    const input = "https://www.youtube.com/watch?v=3cGYEjQuCKc";

    const pythonProcess = spawn('python3', ['../transcribe_audio.py', choice, input]);

    let responseData = '';

    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        responseData += data;
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        res.send(responseData); // Send the response after the child process finishes
    });
>>>>>>> kiruthika
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
<<<<<<< HEAD
=======

>>>>>>> kiruthika
