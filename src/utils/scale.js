import { Notes } from '../constants/NoteConstants';
import { ScaleType, ScaleSteps } from '../constants/ScaleConstants';

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
