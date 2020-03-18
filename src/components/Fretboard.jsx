// import styles from './notes.cssm';

import React from 'react';
// import cns from 'classnames';

import { Notes } from '../constants/NoteConstants';
// import { MajorScaleIntervals, MinorKeyNoteIndex } from '../constants/ScaleConstants';

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
 * [Notes description]
 * @param {[type]} options.notes         [description]
 * @param {[type]} options.selectedNotes [description]
 * @returns {[type]} [description]
 */
export default function Fretboard({ selectedNotes, highlightedNotes }) {
    return (
        <div>
            <NotesComponent
                notes={ENotes}
                selectedNotes={selectedNotes}
                highlightedNotes={highlightedNotes}
            />
            <NotesComponent
                notes={BNotes}
                selectedNotes={selectedNotes}
                highlightedNotes={highlightedNotes}
            />
            <NotesComponent
                notes={GNotes}
                selectedNotes={selectedNotes}
                highlightedNotes={highlightedNotes}
            />
            <NotesComponent
                notes={DNotes}
                selectedNotes={selectedNotes}
                highlightedNotes={highlightedNotes}
            />
            <NotesComponent
                notes={ANotes}
                selectedNotes={selectedNotes}
                highlightedNotes={highlightedNotes}
            />
            <NotesComponent
                notes={ENotes}
                selectedNotes={selectedNotes}
                highlightedNotes={highlightedNotes}
            />
        </div>
    );
}
