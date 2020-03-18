import styles from './notes.cssm';

import React from 'react';
import cns from 'classnames';

import { Tooltip } from 'antd';

import { MajorScaleIntervals, MinorKeyNoteIndex } from '../constants/ScaleConstants';

/**
 * [Notes description]
 * @param {[type]} options.notes         [description]
 * @param {[type]} options.selectedNotes [description]
 * @returns {[type]} [description]
 */
export default function Notes({ notes, selectedNotes, highlightedNotes }) {
    return (
        <div className={styles.notes}>
            {notes.map(note => {
                const index = selectedNotes.indexOf(note);
                const isRelativeMinor = index === MinorKeyNoteIndex;
                const isActive = index > -1;

                let tooltip;
                if (isActive) {
                    tooltip = MajorScaleIntervals[index];

                    if (isRelativeMinor) {
                        tooltip += ', Relative Minor';
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
                                [styles.relativeMinor]: isRelativeMinor,
                                [styles.highlight]: highlightedNotes.indexOf(note) > -1,
                                [styles.root]: index === 0,
                            })}
                        >
                            {note}
                        </div>
                    </Tooltip>
                );
            })}
        </div>
    );
}
