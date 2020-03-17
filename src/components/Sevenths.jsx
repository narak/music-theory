import styles from './sevenths.cssm';

import React from 'react';
import { Tooltip } from 'antd';

import { MajorScaleSteps } from '../constants/ScaleConstants';
import { getSeventhName } from '../utils/chords';

/**
 * [Traid description]
 * @param {[type]} options.scale [description]
 * @returns {[type]} [description]
 */
export default function Sevenths({ scale }) {
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
                        <div key={index} className={styles.seventh}>
                            <span className={styles.seventhNotes}>{seventh.join(' - ')}</span>
                            is
                            <Tooltip title={seventhName && seventhName.keys.join(' - ')}>
                                {seventh[0]}
                                {seventhName && seventhName.type}
                            </Tooltip>
                        </div>
                    );
                })}
        </div>
    );
}
