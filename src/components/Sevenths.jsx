import styles from './chords.cssm';

import React from 'react';
import cns from 'classnames';

import { Tooltip } from 'antd';

import { MajorScaleSteps } from '../constants/ScaleConstants';
import { getSeventhName, isEqual } from '../utils/chords';

/**
 * [Traid description]
 * @param {[type]} options.scale [description]
 * @returns {[type]} [description]
 */
export default function Sevenths({ scale, highlightedNotes, onSelect }) {
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
                        <div
                            key={index}
                            className={cns(styles.chord, styles.chordSeventh, {
                                [styles.active]: isEqual(seventh, highlightedNotes),
                            })}
                            onClick={onSelect.bind(this, seventh)}
                        >
                            <span className={styles.chordNotes}>{seventh.join(' - ')}</span>
                            is
                            <Tooltip
                                title={seventhName && seventhName.keys.join(' - ')}
                                placement="right"
                            >
                                {seventh[0]}
                                {seventhName && seventhName.type}
                            </Tooltip>
                        </div>
                    );
                })}
        </div>
    );
}
