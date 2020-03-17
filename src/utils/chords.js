import { getMajorScale } from './scale';
import { Notes } from '../constants/NoteConstants';

const TriadTypes = {
    3: {
        5: 'Major',
        '#5': 'Augmented',
    },
    b3: {
        5: 'Minor',
        b5: 'Diminished',
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
    // Major 3rd
    if (index === majorScale.indexes[2]) {
        currentType = TriadTypes[3];
    // Minor 3rd
    } else if (index === majorScale.indexes[2] - 1) {
        currentType = TriadTypes.b3;
    }

    if (currentType) {
        index = Notes.indexOf(triad[2]);
        // Perfect 5th
        if (index === majorScale.indexes[4]) {
            currentType = currentType[5];
        // Diminished 5th
        } else if (index === majorScale.indexes[4] - 1) {
            currentType = currentType.b5;
        // Augmented 5th
        } else if (index === majorScale.indexes[4] + 1) {
            currentType = currentType['#5'];
        }
    }

    return typeof currentType === 'string' ? currentType : undefined;
}

const SeventhTypes = {
    3: {
        5: {
            7: 'Major 7',
            b7: '7 or Dominant 7',
        },
    },
    b3: {
        5: {
            b7: 'Minor 7',
        },
        b5: {
            b7: 'Minor 7 b5 or Half Diminished',
            bb7: 'Minor 7 bb5 or Full Diminished',
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
    // Major 3rd
    if (index === majorScale.indexes[2]) {
        currentType = SeventhTypes[3];
    // Minor 3rd
    } else if (index === majorScale.indexes[2] - 1) {
        currentType = SeventhTypes.b3;
    }

    if (currentType) {
        index = Notes.indexOf(seventh[2]);
        // Perfect 5th
        if (index === majorScale.indexes[4]) {
            currentType = currentType[5];
        // Diminished 5th
        } else if (index === majorScale.indexes[4] - 1) {
            currentType = currentType.b5;
        }
    }

    if (currentType) {
        index = Notes.indexOf(seventh[3]);
        // Major 7th
        if (index === majorScale.indexes[6]) {
            currentType = currentType[7];
        // Minor 7th
        } else if (index === majorScale.indexes[6] - 1) {
            currentType = currentType.b7;
        // Double flat 7th
        } else if (index === majorScale.indexes[6] - 2) {
            currentType = currentType.bb7;
        }
    }

    return typeof currentType === 'string' ? currentType : undefined;
}
