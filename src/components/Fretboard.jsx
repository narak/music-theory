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
 * [Notes description]
 * @param {[type]} options.notes         [description]
 * @param {[type]} options.selectedNotes [description]
 * @returns {[type]} [description]
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
