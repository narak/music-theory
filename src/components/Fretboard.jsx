import styles from './fretboard.module.css';

import React from 'react';
import cns from 'classnames';

import { Notes, TuningNotes, DotFrets, DoubleDotFrets } from '../constants/NoteConstants';

import NotesComponent from './Notes';

/**
 * Gets all the notes for the string.
 * @param  {String} string The starting note of the guitar string
 * @return {Array}         Array of notes identifying each fret note
 */
function getStringNotes(string) {
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
    const noteCount = 25;
    const fretNumMarkup = [];
    const inlayMarkup = [];
    for (let fretIndex = 0; fretIndex < noteCount; fretIndex++) {
        fretNumMarkup.push(<div key={fretIndex}>{fretIndex}</div>);

        if (DotFrets.indexOf(fretIndex) > -1) {
            inlayMarkup.push(
                <div
                    key={fretIndex}
                    className={cns({
                        [styles.dot]: true,
                    })}
                />
            );
        } else if (DoubleDotFrets.indexOf(fretIndex) > -1) {
            inlayMarkup.push(
                <div
                    key={fretIndex}
                    className={cns({
                        [styles.doubleDot]: true,
                    })}
                >
                    <div />
                    <div />
                </div>
            );
        } else {
            inlayMarkup.push(<div key={fretIndex} />);
        }
    }

    return (
        <div>
            <div className={styles.numbers}>{fretNumMarkup}</div>

            {TuningNotes[tuning]
                .slice()
                .reverse()
                .map((note, index) => (
                    <NotesComponent
                        key={index}
                        notes={getStringNotes(note)}
                        zeroFret={true}
                        noteCount={noteCount}
                        {...props}
                    />
                ))}

            <div className={styles.inlays}>{inlayMarkup}</div>
        </div>
    );
}
