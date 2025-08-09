import keyMirror from '../utils/keyMirror';

export const Mode = keyMirror(
    'IONIAN',
    'DORIAN',
    'PHRYGIAN',
    'LYDIAN',
    'MIXOLYDIAN',
    'AEOLIAN',
    'LOCRIAN'
);

export const ModeLabel = {
    [Mode.IONIAN]: 'Ionian (Major)',
    [Mode.DORIAN]: 'Dorian',
    [Mode.PHRYGIAN]: 'Phrygian',
    [Mode.LYDIAN]: 'Lydian',
    [Mode.MIXOLYDIAN]: 'Mixolydian',
    [Mode.AEOLIAN]: 'Aeolian (Natural Minor)',
    [Mode.LOCRIAN]: 'Locrian',
};

export const ModeSteps = {
    [Mode.IONIAN]: [2, 2, 1, 2, 2, 2, 1], // W W H W W W H
    [Mode.DORIAN]: [2, 1, 2, 2, 2, 1, 2], // W H W W W H W
    [Mode.PHRYGIAN]: [1, 2, 2, 2, 1, 2, 2], // H W W W H W W
    [Mode.LYDIAN]: [2, 2, 2, 1, 2, 2, 1], // W W W H W W H
    [Mode.MIXOLYDIAN]: [2, 2, 1, 2, 2, 1, 2], // W W H W W H W
    [Mode.AEOLIAN]: [2, 1, 2, 2, 1, 2, 2], // W H W W H W W
    [Mode.LOCRIAN]: [1, 2, 2, 1, 2, 2, 2], // H W W H W W W
};

export const ModeCharacteristics = {
    [Mode.IONIAN]: {
        feeling: 'Happy, bright, resolved',
        characteristicNote: 'Natural 7th',
        chords: ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'],
        description: 'The major scale. Most common in Western music.',
    },
    [Mode.DORIAN]: {
        feeling: 'Sophisticated, jazzy, minor with a bright twist',
        characteristicNote: 'Natural 6th',
        chords: ['i', 'ii', 'bIII', 'IV', 'v', 'vi°', 'bVII'],
        description: 'Minor scale with raised 6th. Popular in jazz and folk.',
    },
    [Mode.PHRYGIAN]: {
        feeling: 'Dark, Spanish, mysterious',
        characteristicNote: 'Flat 2nd',
        chords: ['i', 'bII', 'bIII', 'iv', 'v°', 'bVI', 'bvii'],
        description: 'Minor scale with lowered 2nd. Common in metal and Spanish music.',
    },
    [Mode.LYDIAN]: {
        feeling: 'Dreamy, ethereal, floating',
        characteristicNote: 'Sharp 4th',
        chords: ['I', 'II', 'iii', '#iv°', 'V', 'vi', 'vii'],
        description: 'Major scale with raised 4th. Creates an otherworldly sound.',
    },
    [Mode.MIXOLYDIAN]: {
        feeling: 'Bluesy, rock, dominant',
        characteristicNote: 'Flat 7th',
        chords: ['I', 'ii', 'iii°', 'IV', 'v', 'vi', 'bVII'],
        description: 'Major scale with lowered 7th. Common in rock and blues.',
    },
    [Mode.AEOLIAN]: {
        feeling: 'Sad, melancholy, natural minor',
        characteristicNote: 'Flat 6th and 7th',
        chords: ['i', 'ii°', 'bIII', 'iv', 'v', 'bVI', 'bVII'],
        description: 'The natural minor scale. Most common minor scale.',
    },
    [Mode.LOCRIAN]: {
        feeling: 'Unstable, dissonant, diminished',
        characteristicNote: 'Flat 2nd and 5th',
        chords: ['i°', 'bII', 'biii', 'iv', 'bV', 'bVI', 'bvii'],
        description: 'Very dissonant scale, rarely used as tonal center.',
    },
};

export const ModeIntervals = {
    [Mode.IONIAN]: [1, 2, 3, 4, 5, 6, 7],
    [Mode.DORIAN]: [1, 2, '♭3', 4, 5, 6, '♭7'],
    [Mode.PHRYGIAN]: [1, '♭2', '♭3', 4, 5, '♭6', '♭7'],
    [Mode.LYDIAN]: [1, 2, 3, '♯4', 5, 6, 7],
    [Mode.MIXOLYDIAN]: [1, 2, 3, 4, 5, 6, '♭7'],
    [Mode.AEOLIAN]: [1, 2, '♭3', 4, 5, '♭6', '♭7'],
    [Mode.LOCRIAN]: [1, '♭2', '♭3', 4, '♭5', '♭6', '♭7'],
};
