import { Notes } from '../constants/NoteConstants';
import { MajorScaleSteps } from '../constants/ScaleConstants';

/**
 * [getMajorScale description]
 * @param  {[type]} key [description]
 * @return {[type]}     [description]
 */
export function getMajorScale(key) {
    const selKeyIndex = Notes.indexOf(key);

    const notes = [];
    const indexes = [];

    for (let i = 0, j = selKeyIndex; i < MajorScaleSteps.length; i++) {
        j %= Notes.length;
        notes.push(Notes[j]);
        indexes.push(j);
        j += MajorScaleSteps[i];
    }

    return { notes, indexes };
}
