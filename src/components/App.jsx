import styles from './app.cssm';

import React from 'react';
// import cns from 'classNames';
import { Select, Layout, /*Statistic,*/ Card } from 'antd';

import { Notes } from '../constants/NoteConstants';
import { getMajorScale } from '../utils/scale';

import Fretboard from './Fretboard';
import Triads from './Triads';
import Sevenths from './Sevenths';

const { Option } = Select;
const { Sider, Content } = Layout;

export default class App extends React.Component {
    state = {
        selectedKey: Notes[0],
    };

    render() {
        const { selectedKey } = this.state;

        // const selKeyIndex = Notes.indexOf(selectedKey);
        // const reindexedNotes = Notes.slice(selKeyIndex).concat(Notes.slice(0, selKeyIndex));

        const { notes: scaleNotes } = getMajorScale(selectedKey);

        return (
            <div className={styles.app}>
                <div>
                    <Layout>
                        <Sider style={{ padding: '10px' }}>
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
                        </Sider>
                        <Content className={styles.scaleContainer}>
                            {/*<section className={styles.notes}>
                                <NotesComponent notes={reindexedNotes} selectedNotes={scaleNotes} />
                            </section>*/}
                            <section>
                                <Fretboard selectedNotes={scaleNotes} />
                            </section>
                            <section className={styles.info}>
                                <Card title="Triads">
                                    <Triads scale={scaleNotes} />
                                </Card>
                                <Card title="7ths">
                                    <Sevenths scale={scaleNotes} />
                                </Card>
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
}
