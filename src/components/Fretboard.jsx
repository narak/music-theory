import styles from './fretboard.cssm';

import React from 'react';

import { Notes } from '../constants/NoteConstants';

import NotesComponent from './Notes';

/**
 * [getStringNotes description]
 * @param  {[type]} string [description]
 * @return {[type]}        [description]
 */
function getStringNotes(string) {
    const selKeyIndex = Notes.indexOf(string);
    return Notes.slice(selKeyIndex).concat(Notes.slice(0, selKeyIndex));
}

const ENotes = getStringNotes('E');
const ANotes = getStringNotes('A');
const DNotes = getStringNotes('D');
const GNotes = getStringNotes('G');
const BNotes = getStringNotes('B');

/**
 * The freboard component that composes the Notes component for each
 * string
 * @param {Object} props The component props
 * @returns {Component}  The fretboard component
 */
export default function Fretboard(props) {
    return (
        <div>
            <div className={styles.numbers}>
                {Notes.map((_, index) => (
                    <div key={index}>{index}</div>
                ))}
            </div>

            <NotesComponent notes={ENotes} zeroFret={true} {...props} />
            <NotesComponent notes={BNotes} zeroFret={true} {...props} />
            <NotesComponent notes={GNotes} zeroFret={true} {...props} />
            <NotesComponent notes={DNotes} zeroFret={true} {...props} />
            <NotesComponent notes={ANotes} zeroFret={true} {...props} />
            <NotesComponent notes={ENotes} zeroFret={true} {...props} />

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
