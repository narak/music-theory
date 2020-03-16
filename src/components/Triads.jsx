import styles from './triads.cssm';

import React from 'react';
import { MajorScaleSteps } from '../constants/ScaleConstants';

import { getTriadType } from '../utils/triad';

/**
 * [Traid description]
 * @param {[type]} options.scale [description]
 * @returns {[type]} [description]
 */
export default function Triads({ scale }) {
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
                    return (
                        <div key={index} className={styles.triad}>
                            <span className={styles.triadNotes}>{triad.join(' - ')}</span>
                            is
                            <span>
                                {triad[0]} {getTriadType(triad)}
                            </span>
                        </div>
                    );
                })}
        </div>
    );
}
