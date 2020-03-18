import { getMajorScale } from './scale';
import { Notes } from '../constants/NoteConstants';

/**
 * Converts  indexes into length - index.
 * e.g. if val === -1, the return value should be Notes.length - 1
 *      if val === -2, the return value should be Notes.length - 2
 *      if val === 13, the return value should be 13 - Notes.length
 *      if val === 8, the return value should be 8
 * @param  {Number} val The index value
 * @return {Number}     The circular index
 */
function getCircularIndex(val) {
    return Math.abs((val + Notes.length) % Notes.length);
}

const TriadNames = {
    3: {
        5: 'Maj',
        '#5': 'aug',
    },
    b3: {
        5: 'min',
        b5: 'dim',
    },
};

/**
 * [getTriadName description]
 * @param  {[type]} triad [description]
 * @return {[type]}       [description]
 */
export function getTriadName(triad) {
    const majorScale = getMajorScale(triad[0]);
    const keys = [1];
    let currentName;

    let index = Notes.indexOf(triad[1]);
    // Maj 3rd
    if (index === majorScale.indexes[2]) {
        currentName = TriadNames[3];
        keys.push(3);
        // Min 3rd
    } else if (index === getCircularIndex(majorScale.indexes[2] - 1)) {
        currentName = TriadNames.b3;
        keys.push('b3');
    }

    if (currentName) {
        index = Notes.indexOf(triad[2]);
        // Perfect 5th
        if (index === majorScale.indexes[4]) {
            currentName = currentName[5];
            keys.push('5');
            // Dim 5th
        } else if (index === getCircularIndex(majorScale.indexes[4] - 1)) {
            currentName = currentName.b5;
            keys.push('b5');
            // Aug 5th
        } else if (index === getCircularIndex(majorScale.indexes[4] + 1)) {
            currentName = currentName['#5'];
            keys.push('#5');
        }
    }

    return typeof currentName === 'string' ? { type: currentName, keys } : undefined;
}

const SeventhNames = {
    3: {
        5: {
            7: 'Maj7',
            b7: '7 or Dom7',
        },
    },
    b3: {
        5: {
            b7: 'min7',
        },
        b5: {
            b7: 'min7b5 or Half Dim',
            bb7: 'min7bb5 or Full Dim',
        },
    },
};

/**
 * [getSeventhName description]
 * @param  {[type]} seventh [description]
 * @return {[type]}         [description]
 */
export function getSeventhName(seventh) {
    const majorScale = getMajorScale(seventh[0]);
    const keys = [1];
    let currentName;

    let index = Notes.indexOf(seventh[1]);
    // Maj 3rd
    if (index === majorScale.indexes[2]) {
        currentName = SeventhNames[3];
        keys.push(3);
        // Min 3rd
    } else if (index === getCircularIndex(majorScale.indexes[2] - 1)) {
        currentName = SeventhNames.b3;
        keys.push('b3');
    }

    if (currentName) {
        index = Notes.indexOf(seventh[2]);
        // Perfect 5th
        if (index === majorScale.indexes[4]) {
            currentName = currentName[5];
            keys.push(5);
            // Dim 5th
        } else if (index === getCircularIndex(majorScale.indexes[4] - 1)) {
            currentName = currentName.b5;
            keys.push('b5');
        }
    }

    if (currentName) {
        index = Notes.indexOf(seventh[3]);
        // Maj 7th
        if (index === majorScale.indexes[6]) {
            currentName = currentName[7];
            keys.push(7);
            // Min 7th
        } else if (index === getCircularIndex(majorScale.indexes[6] - 1)) {
            currentName = currentName.b7;
            keys.push('b7');
            // Double flat 7th
        } else if (index === getCircularIndex(majorScale.indexes[6] - 2)) {
            currentName = currentName.bb7;
            keys.push('bb7');
        }
    }

    return typeof currentName === 'string' ? { type: currentName, keys } : undefined;
}
