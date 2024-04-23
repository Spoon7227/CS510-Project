import React, { useState, useEffect } from 'react';
<<<<<<< HEAD

function App() {
  const [message, setMessage] = useState('');
=======
import Main from './components/Main';

function App() {
  const [message, setMessage] = useState('hi');
>>>>>>> kiruthika

  useEffect(() => {
    fetch('http://localhost:5001/api/message')
        .then(response => response.text())
        .then(data => setMessage(data))
        .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
      <div className="App">
        <header className="App-header">
<<<<<<< HEAD
          <h1>{message}</h1>
=======
          <Main/>
>>>>>>> kiruthika
        </header>
      </div>
  );
}

export default App;
