const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, `audio.mp3`);
    }
});
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    console.log("Received request:", req.body);
    const prompt_choice = req.body.choice;
    const keywords = req.body.keywords;
    const link = req.body.link;

    // Audio File: 1, Link: 2
    const inputType = link ? 2 : 1;
    // Audio filepath or Link
    const input = link || './uploads/audio.mp3';

    // Call Python script (inputType, link or audio path, prompt_choice, keywords)
    const pythonProcess = spawn('python3', ['transcribe_audio.py', inputType, input, prompt_choice, keywords]);

    let responseData = '';
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
        responseData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        // Failure
        if (code !== 0) {
            res.status(500).json({
                success: false,
                message: 'Failed'
            });
        } else {
            res.status(200).json({
                success: true,
                data: JSON.parse(responseData)
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
