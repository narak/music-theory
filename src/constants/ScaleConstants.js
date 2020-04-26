import keyMirror from '../utils/keyMirror';

export const ScaleType = keyMirror('MAJOR', 'MINOR', 'MINOR_PENT');
export const ScaleTypeLabel = {
    [ScaleType.MAJOR]: 'Major',
    [ScaleType.MINOR]: 'Minor',
    [ScaleType.MINOR_PENT]: 'Minor Pentatonic',
};

export const MajorScaleSteps = [2, 2, 1, 2, 2, 2, 1];
export const MinorScaleSteps = [2, 1, 2, 2, 1, 2, 2];
export const MinorPentScaleSteps = [3, 2, 2, 3, 2];
export const ScaleSteps = {
    [ScaleType.MAJOR]: MajorScaleSteps,
    [ScaleType.MINOR]: MinorScaleSteps,
    [ScaleType.MINOR_PENT]: MinorPentScaleSteps,
};

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

export const ScaleRelativeIndex = {
    // 6th note - 1 because indexed by 0
    [ScaleType.MAJOR]: 6 - 1,
    // 3rd note - 1 because indexed by 0
    [ScaleType.MINOR]: 3 - 1,
};
export const ScaleRelativeLabel = {
    [ScaleType.MAJOR]: 'Relative Minor',
    [ScaleType.MINOR]: 'Relative Major',
};
