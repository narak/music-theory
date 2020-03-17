import styles from './triads.cssm';

import React from 'react';
import { Tooltip } from 'antd';

import { MajorScaleSteps } from '../constants/ScaleConstants';
import { getTriadType } from '../utils/chords';

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
                    const triadType = getTriadType(triad);

                    return (
                        <div key={index} className={styles.triad}>
                            <span className={styles.triadNotes}>{triad.join(' - ')}</span>
                            is
                            <Tooltip title={triadType && triadType.keys.join(' - ')}>
                                {triad[0]}
                                {triadType && triadType.type}
                            </Tooltip>
                        </div>
                    );
                })}
        </div>
    );
}
