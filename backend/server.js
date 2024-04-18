const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.get('/api/message', (req, res) => {
    res.send('Hello from the backend API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
