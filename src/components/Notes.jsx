import styles from './notes.module.css';

import React from 'react';
import cns from 'classnames';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import {
    MajorScaleIntervals,
    ScaleRelativeIndex,
    ScaleRelativeLabel,
} from '../constants/ScaleConstants';

/**
 * [Notes description]
 * @param {[type]} options.notes         [description]
 * @param {[type]} options.scaleNotes [description]
 * @returns {[type]} [description]
 */
export default function Notes({
    notes,
    scaleNotes,
    highlightedNotes,
    scaleType,
    zeroFret,
    onToggleNote,
    noteCount = 12,
}) {
    const notesMarkup = [];
    for (let fretIndex = 0; fretIndex < noteCount; fretIndex++) {
        const index = fretIndex % 12;
        const note = notes[index];
        const noteIndex = scaleNotes.indexOf(note);
        const isRelative = noteIndex === ScaleRelativeIndex[scaleType];
        const isActive = noteIndex > -1;
        const isHighlighted = highlightedNotes && highlightedNotes.indexOf(note) > -1;
        const isRoot = noteIndex === 0;

        let tooltip;
        if (isActive) {
            tooltip = MajorScaleIntervals[noteIndex];

            if (isRelative) {
                tooltip += ', ' + ScaleRelativeLabel[scaleType];
            } else if (noteIndex === 0) {
                tooltip = 'Root';
            }
        }

        notesMarkup.push(
            <TooltipProvider key={fretIndex}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div
                            key={note}
                            className={cns(styles.note, {
                                [styles.active]: isActive,
                                [styles.relative]: isRelative,
                                [styles.highlight]: isHighlighted,
                                [styles.root]: isRoot,
                                [styles.clickable]: !!onToggleNote,
                                [styles.zeroFret]: fretIndex === 0 && zeroFret,
                            })}
                            onClick={onToggleNote && onToggleNote.bind(this, note)}
                        >
                            {note}
                        </div>
                    </TooltipTrigger>
                    {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <div
            className={cns(styles.notes, {
                [styles.notes25]: noteCount === 25,
            })}
        >
            {notesMarkup}
        </div>
    );
}
