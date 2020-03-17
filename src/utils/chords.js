import { getMajorScale } from './scale';
import { Notes } from '../constants/NoteConstants';

const TriadTypes = {
    3: {
        5: 'maj',
        '#5': 'aug',
    },
    b3: {
        5: 'min',
        b5: 'dim',
    },
};

/**
 * [getTriadType description]
 * @param  {[type]} triad [description]
 * @return {[type]}       [description]
 */
export function getTriadType(triad) {
    const majorScale = getMajorScale(triad[0]);
    let currentType;

    let index = Notes.indexOf(triad[1]);
    // Maj 3rd
    if (index === majorScale.indexes[2]) {
        currentType = TriadTypes[3];
    // Min 3rd
    } else if (index === majorScale.indexes[2] - 1) {
        currentType = TriadTypes.b3;
    }

    if (currentType) {
        index = Notes.indexOf(triad[2]);
        // Perfect 5th
        if (index === majorScale.indexes[4]) {
            currentType = currentType[5];
        // Dim 5th
        } else if (index === majorScale.indexes[4] - 1) {
            currentType = currentType.b5;
        // Aug 5th
        } else if (index === majorScale.indexes[4] + 1) {
            currentType = currentType['#5'];
        }
    }

    return typeof currentType === 'string' ? currentType : undefined;
}

const SeventhTypes = {
    3: {
        5: {
            7: 'maj7',
            b7: '7 or Dominant 7',
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
 * [getSeventhType description]
 * @param  {[type]} seventh [description]
 * @return {[type]}         [description]
 */
export function getSeventhType(seventh) {
    const majorScale = getMajorScale(seventh[0]);
    let currentType;

    let index = Notes.indexOf(seventh[1]);
    // Maj 3rd
    if (index === majorScale.indexes[2]) {
        currentType = SeventhTypes[3];
    // Min 3rd
    } else if (index === majorScale.indexes[2] - 1) {
        currentType = SeventhTypes.b3;
    }

    if (currentType) {
        index = Notes.indexOf(seventh[2]);
        // Perfect 5th
        if (index === majorScale.indexes[4]) {
            currentType = currentType[5];
        // Dim 5th
        } else if (index === majorScale.indexes[4] - 1) {
            currentType = currentType.b5;
        }
    }

    if (currentType) {
        index = Notes.indexOf(seventh[3]);
        // Maj 7th
        if (index === majorScale.indexes[6]) {
            currentType = currentType[7];
        // Min 7th
        } else if (index === majorScale.indexes[6] - 1) {
            currentType = currentType.b7;
        // Double flat 7th
        } else if (index === majorScale.indexes[6] - 2) {
            currentType = currentType.bb7;
        }
    }

    return typeof currentType === 'string' ? currentType : undefined;
}
