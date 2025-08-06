import styles from './chords.module.css';

import React from 'react';
import cns from 'classnames';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import { MajorScaleSteps } from '../constants/ScaleConstants';
import { getSeventhName } from '../utils/chords';
import isEqual from '../utils/isEqual';

/**
 * [Traid description]
 * @param {[type]} options.scale [description]
 * @returns {[type]} [description]
 */
export default function Sevenths({ scale, selectedChord, onSelect }) {
    return (
        <div>
            {Array(MajorScaleSteps.length)
                .fill()
                .map((_, index) => {
                    const seventh = [
                        scale[index % scale.length],
                        scale[(index + 2) % scale.length],
                        scale[(index + 4) % scale.length],
                        scale[(index + 6) % scale.length],
                    ];

                    const seventhName = getSeventhName(seventh);

                    return (
                        <TooltipProvider key={index}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className={cns(styles.chord, 'flex gap-2 px-2', {
                                            [styles.active]: isEqual(seventh, selectedChord),
                                        })}
                                        onClick={onSelect.bind(this, seventh)}
                                    >
                                        <span className={styles.chordNotes}>{seventh.join(' - ')}</span>
                                        is
                                        <span>
                                            {seventh[0]}
                                            {seventhName && seventhName.type}
                                        </span>
                                    </div>
                                </TooltipTrigger>
                                {seventhName && seventhName.keys && (
                                    <TooltipContent side="right">
                                        {seventhName.keys.join(' - ')}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    );
                })}
        </div>
    );
}
