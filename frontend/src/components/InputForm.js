import React, { useState } from 'react';
import axios from 'axios';
import './styles/InputForm.css'; 

function InputForm({ className, setIsInputing, handleFetchResponse }) {
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

  const handleCancelClick = () => {
    setIsInputing(false);
  }

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

    handleFetchResponse(formData);
    setIsInputing(false);
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="choice">Prompt Choice:</label>
          <select id="choice" value={choice} onChange={handleChoiceChange}>
            <option value="">Select</option>
            <option value="1">Detailed Summary</option>
            <option value="2">Concise bullet points</option>
            <option value="3">Choice 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="keywords">Keywords:</label>
          <input type="text" id="keywords" value={keywords} onChange={handleKeywordsChange} placeholder="Comma seperated Keywords"/>
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
        <div className="button-group">
          <button className="cancel-button" type="cancel" onClick={handleCancelClick}>Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default InputForm; 