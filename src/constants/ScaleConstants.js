import keyMirror from '../utils/keyMirror';

export const ScaleType = keyMirror('MAJOR', 'MINOR');
export const ScaleLabel = {
    [ScaleType.MAJOR]: 'Major',
    [ScaleType.MINOR]: 'Minor',
};

export const MajorScaleSteps = [2, 2, 1, 2, 2, 2, 1];
export const MinorScaleSteps = [2, 1, 2, 2, 1, 2, 2];
export const MajorScaleIntervals = [
    'Unison',
    'Major 2nd',
    'Major 3rd',
    'Perfect 4th',
    'Perfect 5th',
    'Major 6th',
    'Major 7th',
    'Octave',
];

// 6th note - 1 because indexed by 0
export const MinorKeyNoteIndex = 6 - 1;

export const ScaleSteps = {
    [ScaleType.MAJOR]: MajorScaleSteps,
    [ScaleType.MINOR]: MinorScaleSteps,
};
