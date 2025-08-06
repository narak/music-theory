import { Notes } from '../constants/NoteConstants';
import { ScaleType, ScaleSteps } from '../constants/ScaleConstants';
import requestIdleCallback from '../utils/requestIdleCallback';
import cancelIdleCallback from '../utils/cancelIdleCallback';

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
 * [notesExistInScale description]
 * @param  {[type]} notes [description]
 * @param  {[type]} key   [description]
 * @param  {[type]} type  [description]
 * @return {[type]}       [description]
 */
function notesExistInScale(notes, key, type) {
    if (!notes || !notes.length) {
        return false;
    }

    const { notes: scaleNotes } = getScale(key, type);
    return notes.every(note => scaleNotes.indexOf(note) > -1);
}

const ScaleTypeList = Object.keys(ScaleType);

/**
 * [findScaleRecurse description]
 * @param  {[type]} notes          [description]
 * @param  {[type]} onUpdateHandle [description]
 * @param  {[type]} onScaleFound   [description]
 * @param  {[type]} onDone         [description]
 * @param  {Number} keyIndex       [description]
 * @param  {Number} scaleTypeIndex [description]
 * @return {[type]}                [description]
 */
function findScaleRecurse(
    notes,
    onUpdateHandle,
    onScaleFound,
    onDone,
    keyIndex = 0,
    scaleTypeIndex = 0
) {
    const finderHandle = requestIdleCallback(deadline => {
        let start = 0,
            end = 0;

        while (end - start < deadline.timeRemaining() && scaleTypeIndex < ScaleTypeList.length) {
            start = Date.now();

            const key = Notes[keyIndex];
            const type = ScaleTypeList[scaleTypeIndex];
            if (notesExistInScale(notes, key, type)) {
                onScaleFound(key, type);
            }

            if (keyIndex < Notes.length) {
                keyIndex++;
            } else {
                keyIndex = 0;
                scaleTypeIndex++;
            }
            end = Date.now();
        }

        if (scaleTypeIndex < ScaleTypeList.length) {
            // looks like we timed out, reschedule
            findScaleRecurse(notes, onUpdateHandle, onScaleFound, onDone, keyIndex, scaleTypeIndex);
        } else {
            onDone();
        }
    });

    onUpdateHandle(finderHandle);
}

/**
 * Finds the scales that match the argument Notes
 * @param   {Array}    notes    Array of notes
 * @param   {Function} callback The callback to be called when the scales are found
 * @returns {Function}          Abort callback to stop the scale finder.
 */
export function findScales(notes, callback) {
    let finderHandle;
    let matchedScales = [];
    findScaleRecurse(
        notes,
        _finderHandle => (finderHandle = _finderHandle),
        (key, type) => matchedScales.push({ key, type }),
        () => callback(matchedScales)
    );

    return () => {
        cancelIdleCallback(finderHandle);
    };
}
