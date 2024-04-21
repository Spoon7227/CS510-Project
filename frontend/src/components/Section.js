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
        <textarea
            className="transcript"
            value={transcript}
            onChange={onTranscriptChange}
            placeholder="Transcript"
        />
        <textarea
            className="notes"
            value={notes}
            onChange={onNotesChange}
            placeholder="Notes"
        />
    </div>
    );
}

export default Section;