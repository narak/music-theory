import styles from './app.cssm';

import { hot } from 'react-hot-loader/root';
import React from 'react';

import { Select, Radio, Layout, Card } from 'antd';

import { Notes } from '../constants/NoteConstants';
import { ScaleType, ScaleLabel } from '../constants/ScaleConstants';
import { getScale } from '../utils/scale';

import NotesComponent from './Notes';
import Fretboard from './Fretboard';
import Triads from './Triads';
import Sevenths from './Sevenths';

const { Option } = Select;
const { Content } = Layout;

class App extends React.Component {
    state = {
        scaleKey: Notes[0],
        scaleType: ScaleType.MAJOR,
        chordNotes: undefined,
        selectedNotes: undefined,
    };

    render() {
        const { scaleKey, scaleType, chordNotes, selectedNotes } = this.state;
        const { notes: scaleNotes } = getScale(scaleKey, scaleType);

        const selKeyIndex = Notes.indexOf(scaleKey);
        const reindexedNotes = Notes.slice(selKeyIndex).concat(Notes.slice(0, selKeyIndex));

        return (
            <div className={styles.app}>
                <Layout>
                    <Content className={styles.scaleSelector}>
                        <Select name="scaleKey" value={scaleKey} onChange={this.onChangeScaleKey}>
                            {Notes.map(note => (
                                <Option value={note} key={note}>
                                    {note}
                                </Option>
                            ))}
                        </Select>
                        <Radio.Group name="scaleType" onChange={this.onChange} value={scaleType}>
                            {Object.keys(ScaleLabel).map(type => (
                                <Radio key={type} value={type}>
                                    {ScaleLabel[type]}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </Content>
                </Layout>
                <br />
                <Layout>
                    <Content className={styles.scaleContainer}>
                        <section className={styles.notes}>
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
                        <section>
                            <strong>Fretboard</strong>
                            <div className={styles.scroll}>
                                <Fretboard
                                    scaleNotes={scaleNotes}
                                    highlightedNotes={chordNotes || selectedNotes}
                                    scaleType={scaleType}
                                />
                            </div>
                        </section>
                        <section>
                            <strong>Chords</strong>
                            <div className={styles.scroll}>
                                <div className={styles.info}>
                                    <Card title="Triads">
                                        <Triads
                                            scale={scaleNotes}
                                            chordNotes={chordNotes}
                                            onSelect={this.noSelectChord}
                                        />
                                    </Card>
                                    <Card title="7ths">
                                        <Sevenths
                                            scale={scaleNotes}
                                            chordNotes={chordNotes}
                                            onSelect={this.noSelectChord}
                                        />
                                    </Card>
                                </div>
                            </div>
                        </section>
                    </Content>
                </Layout>
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

        this.setState({ selectedNotes: newNotes, chordNotes: undefined });
    };

    onChangeScaleKey = scaleKey => {
        this.setState({ scaleKey });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    noSelectChord = chordNotes => {
        this.setState({ chordNotes, selectedNotes: undefined });
    };
}

export default hot(App);
