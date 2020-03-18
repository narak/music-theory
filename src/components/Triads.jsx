import styles from './chords.cssm';

import React from 'react';
import cns from 'classnames';
import { Tooltip } from 'antd';

import { MajorScaleSteps } from '../constants/ScaleConstants';
import { getTriadName, isEqual } from '../utils/chords';

/**
 * [Traid description]
 * @param {[type]} options.scale [description]
 * @returns {[type]} [description]
 */
export default function Triads({ scale, highlightedNotes, onSelect }) {
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
                        <div
                            key={index}
                            className={cns(styles.chord, {
                                [styles.active]: isEqual(triad, highlightedNotes),
                            })}
                            onClick={onSelect.bind(this, triad)}
                        >
                            <span className={styles.chordNotes}>{triad.join(' - ')}</span>
                            is
                            <Tooltip
                                title={triadName && triadName.keys.join(' - ')}
                                placement="right"
                            >
                                {triad[0]}
                                {triadName && triadName.type}
                            </Tooltip>
                        </div>
                    );
                })}
        </div>
    );
}
