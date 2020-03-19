import styles from './app.cssm';

import { hot } from 'react-hot-loader/root';
import React from 'react';

import { Select, Layout, /*Statistic,*/ Card } from 'antd';

import { Notes } from '../constants/NoteConstants';
import { getMajorScale } from '../utils/scale';

import NotesComponent from './Notes';
import Fretboard from './Fretboard';
import Triads from './Triads';
import Sevenths from './Sevenths';

const { Option } = Select;
const { Content } = Layout;

class App extends React.Component {
    state = {
        selectedKey: Notes[0],
        highlightedNotes: undefined,
    };

    render() {
        const { selectedKey, highlightedNotes } = this.state;
        const { notes: scaleNotes } = getMajorScale(selectedKey);

        const selKeyIndex = Notes.indexOf(selectedKey);
        const reindexedNotes = Notes.slice(selKeyIndex).concat(Notes.slice(0, selKeyIndex));

        return (
            <div className={styles.app}>
                <div>
                    <Layout>
                        <Content style={{ padding: '10px' }}>
                            <Select
                                name="selectedKey"
                                value={selectedKey}
                                style={{ width: '100%' }}
                                onChange={this.onChangeKey}
                            >
                                {Notes.map(note => (
                                    <Option value={note} key={note}>
                                        {note} Major
                                    </Option>
                                ))}
                            </Select>
                        </Content>
                        <Content className={styles.scaleContainer}>
                            <section className={styles.notes}>
                                <strong>Rooted Scale</strong>
                                <div className={styles.scroll}>
                                    <NotesComponent
                                        notes={reindexedNotes}
                                        selectedNotes={scaleNotes}
                                        highlightedNotes={highlightedNotes}
                                    />
                                </div>
                            </section>
                            <section>
                                <strong>Fretboard</strong>
                                <div className={styles.scroll}>
                                    <Fretboard
                                        selectedNotes={scaleNotes}
                                        highlightedNotes={highlightedNotes}
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
                                                highlightedNotes={highlightedNotes}
                                                onSelect={this.onSelectHighlightedNotes}
                                            />
                                        </Card>
                                        <Card title="7ths">
                                            <Sevenths
                                                scale={scaleNotes}
                                                highlightedNotes={highlightedNotes}
                                                onSelect={this.onSelectHighlightedNotes}
                                            />
                                        </Card>
                                    </div>
                                </div>
                            </section>
                        </Content>
                    </Layout>
                </div>
            </div>
        );
    }

    onChangeKey = selectedKey => {
        this.setState({ selectedKey });
    };

    onSelectHighlightedNotes = highlightedNotes => {
        this.setState({ highlightedNotes });
    };
}

export default hot(App);
