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
            <NotesComponent notes={ENotes} {...props} />
            <NotesComponent notes={BNotes} {...props} />
            <NotesComponent notes={GNotes} {...props} />
            <NotesComponent notes={DNotes} {...props} />
            <NotesComponent notes={ANotes} {...props} />
            <NotesComponent notes={ENotes} {...props} />
        </div>
    );
}
