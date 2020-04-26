import styles from './fretboard.cssm';

import React from 'react';

import { Notes, TuningNotes } from '../constants/NoteConstants';

import NotesComponent from './Notes';

/**
 * Gets all the notes for the string.
 * @param  {String} string The starting note of the guitar string
 * @return {Array}         Array of notes identifying each fret note
 */
function getStringNotes(string) {
    console.log('calculating notes for ', string);
    const selKeyIndex = Notes.indexOf(string);
    return Notes.slice(selKeyIndex).concat(Notes.slice(0, selKeyIndex));
}

/**
 * The freboard component that composes the Notes component for each
 * string
 * @param {Object} props The component props
 * @returns {Component}  The fretboard component
 */
export default function Fretboard({ tuning, ...props }) {
    return (
        <div>
            <div className={styles.numbers}>
                {Notes.map((_, index) => (
                    <div key={index}>{index}</div>
                ))}
            </div>

            {TuningNotes[tuning].reverse().map((note, index) => (
                <NotesComponent
                    key={index}
                    notes={getStringNotes(note)}
                    zeroFret={true}
                    {...props}
                />
            ))}

            <div className={styles.inlays}>
                {Notes.map((_, index) => (
                    <div
                        key={index}
                        className={[0, 3, 5, 7, 9].indexOf(index) > -1 ? styles.dot : undefined}
                    />
                ))}
            </div>
        </div>
    );
}
