import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; 

function App() {
  const [choice, setChoice] = useState('');
  const [keywords, setKeywords] = useState('');
  const [inputType, setInputType] = useState('upload');
  const [file, setFile] = useState(null);
  const [link, setLink] = useState('');

  const handleChoiceChange = (event) => {
    setChoice(event.target.value);
  };

  const handleKeywordsChange = (event) => {
    setKeywords(event.target.value);
  };

  const handleInputTypeChange = (event) => {
    setInputType(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('choice', choice);
    formData.append('keywords', keywords);
    if (inputType === 'upload') {
      formData.append('file', file);
    } else {
      formData.append('link', link);
    }

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>NoteScribe</h2>
          <label htmlFor="choice">Prompt Choice:</label>
          <select id="choice" value={choice} onChange={handleChoiceChange}>
            <option value="">Select</option>
            <option value="1">Choice 1</option>
            <option value="2">Choice 2</option>
            <option value="3">Choice 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="keywords">Keywords:</label>
          <input type="text" id="keywords" value={keywords} onChange={handleKeywordsChange} />
        </div>
        <div>
          <label htmlFor="inputType">Input Type:</label>
          <select id="inputType" value={inputType} onChange={handleInputTypeChange}>
            <option value="upload">Upload File</option>
            <option value="link">Enter Link</option>
          </select>
          {inputType === 'upload' ? (
            <input type="file" accept="audio/mp3" onChange={handleFileChange} />
          ) : (
            <input type="text" value={link} onChange={handleLinkChange} placeholder="Enter your link here" />
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
