import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api/message')
        .then(response => response.text())
        .then(data => setMessage(data))
        .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <h1>{message}</h1>
        </header>
      </div>
  );
}

export default App;
