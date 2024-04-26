import React, { useState } from 'react';
import './styles/Section.css'

function Section({ transcript, notes, setTranscriptContent, setNotesContent }) {
    const onTranscriptChange = (event) => {
        setTranscriptContent(event.target.value);
    };

    const onNotesChange = (event) => {
        setNotesContent(event.target.value);
    };

    return (
    <div className="section">
        <div className="subsection">
            <h2>Transcript</h2> 
            <textarea
                className="transcript"
                value={transcript}
                onChange={onTranscriptChange}
                placeholder="Transcript"
            />
        </div>
        <div className="subsection">
            <h2>Notes</h2> 
            <textarea
                className="notes"
                value={notes}
                onChange={onNotesChange}
                placeholder="Notes"
            />    
        </div>
    </div>
    );
}

export default Section;