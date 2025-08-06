import keyMirror from '../utils/keyMirror';

export const Notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export const Tunings = keyMirror(
    'E4',
    'E',
    'Eb',
    'DropD',
    'DropDb',
    'DropC',
    'DropB',
    'DropBb',
    'OpenD',
    'OpenC',
    'OpenG'
);

export const TuningLabel = {
    [Tunings.E4]: 'E 4ths',
    [Tunings.E]: 'E',
    [Tunings.Eb]: 'Eb / D#',
    [Tunings.DropD]: 'Drop D',
    [Tunings.DropDb]: 'Drop Db / Drop C#',
    [Tunings.DropC]: 'Drop C',
    [Tunings.DropB]: 'Drop B',
    [Tunings.DropBb]: 'Drop Bb / Drop A#',
    [Tunings.OpenD]: 'Open D',
    [Tunings.OpenC]: 'Open C',
    [Tunings.OpenG]: 'Open G',
};

export const TuningNotes = {
    [Tunings.E4]: ['E', 'A', 'D', 'G', 'C', 'F'],
    [Tunings.E]: ['E', 'A', 'D', 'G', 'B', 'E'],
    [Tunings.Eb]: ['Eb', 'Ab', 'C#', 'F#', 'Bb', 'Eb'],
    [Tunings.DropD]: ['D', 'A', 'D', 'G', 'B', 'E'],
    [Tunings.DropDb]: ['C#', 'Ab', 'C#', 'F#', 'Bb', 'Eb'],
    [Tunings.DropC]: ['C', 'G', 'C', 'F', 'A', 'D'],
    [Tunings.DropB]: ['B', 'F#', 'B', 'E', 'Ab', 'C#'],
    [Tunings.DropBb]: ['Bb', 'F', 'Bb', 'Eb', 'G', 'C'],
    [Tunings.OpenD]: ['D', 'A', 'D', 'F#', 'A', 'D'],
    [Tunings.OpenC]: ['C', 'G', 'C', 'G', 'C', 'E'],
    [Tunings.OpenG]: ['D', 'G', 'D', 'G', 'B', 'D'],
};


export const DotFrets = [0, 3, 5, 7, 9];
export const DoubleDotFrets = [12, 24];
