import styles from './notes.cssm';

import React from 'react';
import cns from 'classnames';

import { Tooltip } from 'antd';

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
}) {
    return (
        <div className={styles.notes}>
            {notes.map((note, fretIndex) => {
                const index = scaleNotes.indexOf(note);
                const isRelative = index === ScaleRelativeIndex[scaleType];
                const isActive = index > -1;
                const isHighlighted = highlightedNotes && highlightedNotes.indexOf(note) > -1;
                const isRoot = index === 0;

                let tooltip;
                if (isActive) {
                    tooltip = MajorScaleIntervals[index];

                    if (isRelative) {
                        tooltip += ', ' + ScaleRelativeLabel[scaleType];
                    } else if (index === 0) {
                        tooltip = 'Root';
                    }
                }

                return (
                    <Tooltip key={note} title={tooltip}>
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
                    </Tooltip>
                );
            })}
        </div>
    );
}
