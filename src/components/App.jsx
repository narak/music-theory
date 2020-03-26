import styles from './app.cssm';

import { hot } from 'react-hot-loader/root';
import React, { Fragment } from 'react';

import { Select, Radio, Layout, Card, Spin, Tag } from 'antd';

import { Notes } from '../constants/NoteConstants';
import { ScaleType, ScaleTypeLabel } from '../constants/ScaleConstants';
import { getScale, findScales } from '../utils/scale';
import isEqual from '../utils/isEqual';

import NotesComponent from './Notes';
import Fretboard from './Fretboard';
import Triads from './Triads';
import Sevenths from './Sevenths';
import Tour from './Tour';
import TextButton from './common/TextButton';

const { Option } = Select;
const { Content } = Layout;

class App extends React.Component {
    state = {
        scaleKey: Notes[0],
        scaleType: ScaleType.MAJOR,
        chordNotes: undefined,
        selectedNotes: undefined,
        foundScales: undefined,
    };

    componentDidUpdate(prevProps, prevState) {
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
                <Layout>
                    <Content className={styles.scaleSelector}>
                        <Select
                            name="scaleKey"
                            value={scaleKey}
                            onChange={this.onChangeScaleKey}
                            data-tour="scale-key-selector"
                        >
                            {Notes.map(note => (
                                <Option value={note} key={note}>
                                    {note}
                                </Option>
                            ))}
                        </Select>
                        <div data-tour="scale-type-selector">
                            <Radio.Group
                                name="scaleType"
                                onChange={this.onChange}
                                value={scaleType}
                            >
                                {Object.keys(ScaleTypeLabel).map(type => (
                                    <Radio key={type} value={type}>
                                        {ScaleTypeLabel[type]}
                                    </Radio>
                                ))}
                            </Radio.Group>
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
                                        <Fragment>
                                            Finding scales <Spin size="small" />
                                        </Fragment>
                                    ) : foundScales && foundScales.length ? (
                                        foundScales.map(({ key, type }, index) => (
                                            <Tag
                                                key={index}
                                                onClick={this.onChangeScale.bind(this, {
                                                    key,
                                                    type,
                                                })}
                                                color={type === ScaleType.MAJOR ? 'blue' : 'cyan'}
                                            >
                                                {key} {ScaleTypeLabel[type]}
                                            </Tag>
                                        ))
                                    ) : (
                                        'No scales match these notes'
                                    )
                                ) : (
                                    <>
                                        Select <strong>three or more</strong> notes
                                        <br />
                                        to find matching scales
                                    </>
                                )
                            ) : (
                                <>
                                    Select a chord or any notes
                                    <br />
                                    to find matching scales
                                </>
                            )}
                        </div>
                    </Content>
                </Layout>
                <br />
                <Layout className={styles.scaleContainer}>
                    <Content data-tour="notes-container">
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
                            <div className={styles.scroll}>
                                <Fretboard
                                    scaleNotes={scaleNotes}
                                    highlightedNotes={chordNotes || selectedNotes}
                                    scaleType={scaleType}
                                    onToggleNote={this.onToggleNote}
                                />
                            </div>
                        </section>
                    </Content>
                    <Content data-tour="chords-container">
                        <section>
                            <strong>Chords</strong>
                            <div className={styles.scroll}>
                                <div className={styles.info}>
                                    <Card title="Triads" data-tour="triads">
                                        <Triads
                                            scale={scaleNotes}
                                            selectedChord={chordNotes}
                                            onSelect={this.noSelectChord}
                                        />
                                    </Card>
                                    <Card title="7ths" data-tour="sevenths">
                                        <Sevenths
                                            scale={scaleNotes}
                                            selectedChord={chordNotes}
                                            onSelect={this.noSelectChord}
                                        />
                                    </Card>
                                </div>
                            </div>
                        </section>
                    </Content>
                </Layout>
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

    onChangeScaleKey = scaleKey => {
        this.setState({ scaleKey });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
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

export default hot(App);
