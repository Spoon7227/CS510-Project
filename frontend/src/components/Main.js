import React, { useState } from 'react';
import Section from "./Section"
import './styles/Main.css'

function Main() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasContent, setHasContent] = useState(false);

  const [transcriptContent, setTranscriptContent] = useState('');
  const [notesContent, setNotesContent] = useState('');

  const fetchResponse = async () => {
    // TODO
    // Send user input to backend 
    // Set content with returned result


    // On complete
    // setTranscriptContent('');
    // setNotesContent('');
    // setHasContent(true);
    // setIsGenerating(false);
  }

  const handleGenerateClick = () => {
    // Remove when user input / fetch response is complete
    setHasContent(true);

    // Opens user input UI
    setIsGenerating(true);
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
            onTranscriptChange={setTranscriptContent}
            onNotesChange={setNotesContent}
          />
        ) : (
          isGenerating ? (
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

        {isGenerating && (
          // TODO: Add input window and call fetchResponse with user input 
          null
        )}
      </div>
    </div>
  );
}

export default Main;