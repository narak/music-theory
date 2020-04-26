import keyMirror from '../utils/keyMirror';

export const Notes = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

export const Tunings = keyMirror(
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
