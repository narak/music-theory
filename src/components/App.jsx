import styles from './app.module.css';

import React, { Fragment } from 'react';
import cns from 'classnames';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';

import { Notes, Tunings, TuningLabel } from '../constants/NoteConstants';
import { ScaleType, ScaleTypeLabel } from '../constants/ScaleConstants';
import { getScale, findScales } from '../utils/scale';
import isEqual from '../utils/isEqual';
import requestIdleCallback from '../utils/requestIdleCallback';

import NotesComponent from './Notes';
import Fretboard from './Fretboard';
import Triads from './Triads';
import Sevenths from './Sevenths';
import Tour from './Tour';
import ModeExplorer from './ModeExplorer';
import TextButton from './common/TextButton';

const { Option } = Select;

const STORAGE_KEY = 'music-theory';
const PersistKeys = ['scaleKey', 'scaleType', 'tuning', 'chordNotes', 'selectedNotes'];

const storedState = localStorage.getItem(STORAGE_KEY);
const defaultState = storedState
    ? JSON.parse(storedState)
    : {
          scaleKey: Notes[0],
          scaleType: ScaleType.MAJOR,
          tuning: Tunings.E,
          chordNotes: undefined,
          selectedNotes: undefined,
          foundScales: undefined,
      };

class App extends React.Component {
    state = defaultState;

    componentDidUpdate(prevProps, prevState) {
        requestIdleCallback(() => {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(
                    PersistKeys.reduce((acc, key) => {
                        acc[key] = this.state[key];
                        return acc;
                    }, {})
                )
            );
        });

        const notesToFindFor = this.state.selectedNotes || this.state.chordNotes;
        const prevNotesToFindFor = prevState.selectedNotes || prevState.chordNotes;

        if (!isEqual(prevNotesToFindFor, notesToFindFor)) {
            this.scaleFinderAbort && this.scaleFinderAbort();

            if (notesToFindFor && notesToFindFor.length > 2) {
                /* eslint-disable react/no-did-update-set-state */
                this.setState({
                    findingScales: true,
                });
                this.scaleFinderAbort = findScales(notesToFindFor, foundScales => {
                    this.setState({
                        foundScales,
                        findingScales: false,
                    });
                });
            } else if (this.state.findingScales) {
                this.setState({
                    findingScales: false,
                });
            }
        }
    }

    render() {
        const {
            scaleKey,
            scaleType,
            tuning,
            chordNotes,
            selectedNotes,
            findingScales,
            foundScales,
        } = this.state;
        const { notes: scaleNotes } = getScale(scaleKey, scaleType);

        const selKeyIndex = Notes.indexOf(scaleKey);
        const reindexedNotes = Notes.slice(selKeyIndex).concat(Notes.slice(0, selKeyIndex));
        const notesToFindFor = selectedNotes || chordNotes;

        return (
            <div className={styles.app}>
                <section className={styles.scaleSelector}>
                    <Select
                        value={scaleKey}
                        onValueChange={this.onChangeScaleKey}
                        data-tour="scale-key-selector"
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Notes.map(note => (
                                <SelectItem value={note} key={note}>
                                    {note}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div data-tour="scale-type-selector">
                        <RadioGroup value={scaleType} onValueChange={this.onChangeScaleType}>
                            {Object.keys(ScaleTypeLabel).map(type => (
                                <div key={type} className="flex items-center space-x-2">
                                    <RadioGroupItem value={type} id={type} />
                                    <Label htmlFor={type}>{ScaleTypeLabel[type]}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                    <div className={styles.center} data-tour="take-a-tour">
                        <TextButton type="button" onClick={this.onStartTour}>
                            Take a Tour!
                        </TextButton>
                    </div>
                    <div className={styles.scaleFinder} data-tour="scale-finder">
                        {notesToFindFor ? (
                            notesToFindFor.length > 2 ? (
                                findingScales ? (
                                    <Fragment>Finding scales...</Fragment>
                                ) : foundScales && foundScales.length ? (
                                    <Fragment>
                                        {foundScales.map(({ key, type }, index) => (
                                            <Badge
                                                key={index}
                                                onClick={this.onChangeScale.bind(this, {
                                                    key,
                                                    type,
                                                })}
                                                variant={
                                                    type === ScaleType.MAJOR
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                                className="cursor-pointer hover:opacity-80 mr-1 mb-1"
                                            >
                                                {key} {ScaleTypeLabel[type]}
                                            </Badge>
                                        ))}
                                        <br />
                                        <TextButton
                                            type="button"
                                            onClick={this.onClearSelectedNotes}
                                        >
                                            Clear
                                        </TextButton>
                                    </Fragment>
                                ) : (
                                    'No scales match these notes'
                                )
                            ) : (
                                <Fragment>
                                    Select <strong>three or more</strong> notes to find matching
                                    scales
                                </Fragment>
                            )
                        ) : (
                            <Fragment>Select a chord or any notes to find matching scales</Fragment>
                        )}
                    </div>
                </section>
                <section className={styles.notes} data-tour="rooted-scale">
                    <strong>Rooted Scale</strong>
                    <div className={styles.scroll}>
                        <NotesComponent
                            notes={reindexedNotes}
                            scaleNotes={scaleNotes}
                            highlightedNotes={chordNotes || selectedNotes}
                            scaleType={scaleType}
                            onToggleNote={this.onToggleNote}
                        />
                    </div>
                </section>
                <section data-tour="fretboard">
                    <strong>Fretboard</strong>
                    <Select
                        value={tuning}
                        onValueChange={this.onChangeTuning}
                        className={styles.tunings}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Tunings.map(tuning => (
                                <SelectItem value={tuning} key={tuning}>
                                    {TuningLabel[tuning]}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className={styles.scroll}>
                        <Fretboard
                            tuning={tuning}
                            scaleNotes={scaleNotes}
                            highlightedNotes={chordNotes || selectedNotes}
                            scaleType={scaleType}
                            onToggleNote={this.onToggleNote}
                        />
                    </div>
                </section>
                <section data-tour="chords-container">
                    <section>
                        <strong>Chords</strong>
                        <div className="flex gap-6">
                            <Card data-tour="triads">
                                <CardHeader>
                                    <CardTitle>Triads</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Triads
                                        scale={scaleNotes}
                                        selectedChord={chordNotes}
                                        onSelect={this.noSelectChord}
                                    />
                                </CardContent>
                            </Card>
                            <Card data-tour="sevenths">
                                <CardHeader>
                                    <CardTitle>7ths</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Sevenths
                                        scale={scaleNotes}
                                        selectedChord={chordNotes}
                                        onSelect={this.noSelectChord}
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </section>
                <section data-tour="mode-explorer">
                    <strong>Mode Explorer</strong>
                    <ModeExplorer
                        scaleKey={scaleKey}
                        scaleType={scaleType}
                        scaleNotes={scaleNotes}
                        onChangeScale={this.onChangeScale}
                        onToggleNote={this.onToggleNote}
                        highlightedNotes={chordNotes || selectedNotes}
                        onClearSelectedNotes={this.onClearSelectedNotes}
                    />
                </section>
                <Tour isOpen={this.state.showingTour} onStopTour={this.onStopTour} />
            </div>
        );
    }

    onToggleNote = note => {
        const { selectedNotes } = this.state;
        const newNotes = selectedNotes ? [...selectedNotes] : [];

        const noteIndex = newNotes.indexOf(note);
        if (noteIndex > -1) {
            newNotes.splice(noteIndex, 1);
        } else {
            newNotes.push(note);
        }

        this.setState({
            selectedNotes: newNotes.length ? newNotes : undefined,
            chordNotes: undefined,
        });
    };

    onClearSelectedNotes = () => {
        this.setState({
            selectedNotes: undefined,
            chordNotes: undefined,
        });
    };

    onChangeScaleKey = scaleKey => {
        this.setState({ scaleKey });
    };

    onChangeScaleType = scaleType => {
        this.setState({ scaleType });
    };

    onChangeTuning = tuning => {
        this.setState({ tuning });
    };

    onChangeScale = ({ key, type }) => {
        this.setState({
            scaleKey: key,
            scaleType: type,
        });
    };

    noSelectChord = chordNotes => {
        this.setState({ chordNotes, selectedNotes: undefined });
    };

    onStartTour = () => {
        this.setState({ showingTour: true });
    };

    onStopTour = () => {
        this.setState({ showingTour: false });
    };
}

export default App;
