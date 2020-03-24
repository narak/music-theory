import { Notes } from '../constants/NoteConstants';
import { ScaleType, ScaleSteps } from '../constants/ScaleConstants';
import requestIdleCallback from '../utils/requestIdleCallback';

/**
 * Gets the notes based on the scale type
 * @param  {String} key       The key of the scale
 * @param  {String} scaleType The type of the scale
 * @return {Object}           An array containing the names and indexes of the notes in the scale
 */
export function getScale(key, scaleType = ScaleType.MAJOR) {
    const selKeyIndex = Notes.indexOf(key);
    const scaleSteps = ScaleSteps[scaleType];

    const notes = [];
    const indexes = [];

    for (let i = 0, j = selKeyIndex; i < scaleSteps.length; i++) {
        j %= Notes.length;
        notes.push(Notes[j]);
        indexes.push(j);
        j += scaleSteps[i];
    }

    return { notes, indexes };
}

/**
 * Finds the scales that match the argument Notes
 * @param  {Array}    notes    Array of notes
 * @param  {Function} callback The callback to be called when the scales are found
 * @returns {Function}         Abort callback to stop the scale finder.
 */
export function findScales(notes, callback) {
    requestIdleCallback(deadline => {
        console.log(deadline.timeRemaining());
        for (let i = 0; i < 10000; i++) {
            let b = i + i;
        }
        console.log(deadline.timeRemaining());
    });

    const finderTimeout = setTimeout(() => {
        callback(['C Major', 'A minor']);
    }, 1500);

    return () => {
        clearTimeout(finderTimeout);
    };
}
