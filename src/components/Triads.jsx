import styles from './chords.module.css';

import React from 'react';
import cns from 'classnames';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import { MajorScaleSteps } from '../constants/ScaleConstants';
import { getTriadName } from '../utils/chords';
import isEqual from '../utils/isEqual';

/**
 * [Traid description]
 * @param {[type]} options.scale [description]
 * @returns {[type]} [description]
 */
export default function Triads({ scale, selectedChord, onSelect }) {
    return (
        <div>
            {Array(MajorScaleSteps.length)
                .fill()
                .map((_, index) => {
                    const triad = [
                        scale[index % scale.length],
                        scale[(index + 2) % scale.length],
                        scale[(index + 4) % scale.length],
                    ];
                    const triadName = getTriadName(triad);

                    return (
                        <TooltipProvider key={index}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className={cns(styles.chord, {
                                            [styles.active]: isEqual(triad, selectedChord),
                                        })}
                                        onClick={onSelect.bind(this, triad)}
                                    >
                                        <span className={styles.chordNotes}>{triad.join(' - ')}</span>
                                        is
                                        <span>
                                            {triad[0]}
                                            {triadName && triadName.type}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                {triadName && triadName.keys && (
                                    <TooltipContent side="right">
                                        {triadName.keys.join(' - ')}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
        </div>
    );
}
