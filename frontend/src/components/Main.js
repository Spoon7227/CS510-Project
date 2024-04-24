import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './InputForm';
import Section from "./Section"
import './styles/Main.css'

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [isInputing, setIsInputing] = useState(false);

  const [transcriptContent, setTranscriptContent] = useState('');
  const [notesContent, setNotesContent] = useState('');

  const handleFetchResponse = async (formData) => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTranscriptContent(response.data.data.transcript);
      setNotesContent(response.data.data.notes);
      setHasContent(true);
    } catch (error) {
      console.error('Error fetching response: ', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGenerateClick = () => {
    // Opens user input UI
    setIsInputing(true);
  }

  return (
    <div className="main">
      <div className="title">
        <h4>NoteScribe</h4>
        <button className="generate-button title" onClick={handleGenerateClick}>
            +
        </button>
      </div>
      <div className="content">
        {hasContent ? (
          <Section
            transcript={transcriptContent}
            notes={notesContent}
            setTranscriptContent={setTranscriptContent}
            setNotesContent={setNotesContent}
          />
        ) : (
          isLoading ? (
            <div className="intro">
              <p className="guide-text">Loading...</p>
            </div> 
          ) : (
            <div className="intro">
              <p className="guide-text">Click to get started</p>
              <button className="generate-button" onClick={handleGenerateClick}>
                Generate Notes
              </button>
            </div>
          )
        )}
        {isInputing && (
          <div className="blur">
            <InputForm className="input-form" setIsInputing={setIsInputing} handleFetchResponse={handleFetchResponse} /> 
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;