import styles from './sevenths.cssm';

import React from 'react';
import { MajorScaleSteps } from '../constants/ScaleConstants';

import { getSeventhType } from '../utils/chords';

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
                    return (
                        <div key={index} className={styles.seventh}>
                            <span className={styles.seventhNotes}>{seventh.join(' - ')}</span>
                            is
                            <span>
                                {seventh[0]} {getSeventhType(seventh)}
                            </span>
                        </div>
                    );
                })}
        </div>
    );
}
