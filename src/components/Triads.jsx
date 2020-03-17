import styles from './triads.cssm';

import React from 'react';
import { Tooltip } from 'antd';

import { MajorScaleSteps } from '../constants/ScaleConstants';
import { getTriadName } from '../utils/chords';

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
                    const triadName = getTriadName(triad);

                    return (
                        <div key={index} className={styles.triad}>
                            <span className={styles.triadNotes}>{triad.join(' - ')}</span>
                            is
                            <Tooltip title={triadName && triadName.keys.join(' - ')}>
                                {triad[0]}
                                {triadName && triadName.type}
                            </Tooltip>
                        </div>
                    );
                })}
        </div>
    );
}
