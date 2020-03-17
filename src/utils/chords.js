import { getMajorScale } from './scale';
import { Notes } from '../constants/NoteConstants';

const Types = {
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
    if (index === majorScale.indexes[2]) {
        currentType = Types[3];
    } else if (index === majorScale.indexes[2] - 1) {
        currentType = Types.b3;
    }

    if (currentType) {
        index = Notes.indexOf(triad[2]);
        if (index === majorScale.indexes[4]) {
            currentType = currentType[5];
        } else if (index === majorScale.indexes[4] - 1) {
            currentType = currentType.b5;
        } else if (index === majorScale.indexes[4]) {
            currentType = currentType['#5'];
        }
    }

    return typeof currentType === 'string' ? currentType : undefined;
}

/**
 * [getTriadType description]
 * @param  {[type]} seventh [description]
 * @return {[type]}       [description]
 */
export function getSeventhType(seventh) {
    const majorScale = getMajorScale(seventh[0]);
    let currentType;

    let index = Notes.indexOf(seventh[1]);
    if (index === majorScale.indexes[2]) {
        currentType = Types[3];
    } else if (index === majorScale.indexes[2] - 1) {
        currentType = Types.b3;
    }

    if (currentType) {
        index = Notes.indexOf(seventh[2]);
        if (index === majorScale.indexes[4]) {
            currentType = currentType[5];
        } else if (index === majorScale.indexes[4] - 1) {
            currentType = currentType.b5;
        } else if (index === majorScale.indexes[4]) {
            currentType = currentType['#5'];
        }
    }

    return typeof currentType === 'string' ? currentType : undefined;
}
