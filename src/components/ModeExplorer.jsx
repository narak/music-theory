import styles from './mode-explorer.module.css';

import React, { useState } from 'react';
import cns from 'classnames';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import { Notes } from '../constants/NoteConstants';
import {
    Mode,
    ModeLabel,
    ModeCharacteristics,
    ModeIntervals,
    ModeSteps,
} from '../constants/ModeConstants';
import { getScale } from '../utils/scale';

/**
 * Mode Explorer component for understanding musical modes
 */
export default function ModeExplorer({
    scaleKey = 'C',
    selectedMode = Mode.IONIAN,
    onModeChange,
    onNoteSelect,
}) {
    const [activeMode, setActiveMode] = useState(selectedMode);
    const [showComparison, setShowComparison] = useState(false);

    const handleModeChange = mode => {
        setActiveMode(mode);
        onModeChange && onModeChange(mode);
    };

    const getModeNotes = (key, mode) => {
        const keyIndex = Notes.indexOf(key);
        const steps = ModeSteps[mode];
        const notes = [];
        const indexes = [];

        let currentIndex = keyIndex;
        for (let i = 0; i < steps.length; i++) {
            notes.push(Notes[currentIndex % 12]);
            indexes.push(currentIndex % 12);
            currentIndex += steps[i];
        }

        return { notes, indexes };
    };

    const getCharacteristicNotes = (key, mode) => {
        const { notes } = getModeNotes(key, mode);
        const majorScale = getScale(key, 'MAJOR').notes;

        return notes.map((note, index) => {
            const majorNote = majorScale[index];
            const isCharacteristic = note !== majorNote;
            return {
                note,
                position: index + 1,
                interval: ModeIntervals[mode][index],
                isCharacteristic,
            };
        });
    };

    const renderModeInfo = mode => {
        const characteristics = ModeCharacteristics[mode];
        const modeNotes = getCharacteristicNotes(scaleKey, mode);

        return (
            <Card className={styles.modeCard}>
                <CardHeader>
                    <CardTitle className={styles.modeTitle}>
                        {ModeLabel[mode]}
                        <Badge variant="outline" className={styles.modeBadge}>
                            {scaleKey} {ModeLabel[mode]}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={styles.modeContent}>
                        <div className={styles.notesSection}>
                            <Label>Notes & Intervals</Label>
                            <div className={styles.notesList}>
                                {modeNotes.map((noteData, index) => (
                                    <TooltipProvider key={index}>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={cns(styles.noteItem, {
                                                        [styles.characteristic]:
                                                            noteData.isCharacteristic,
                                                        [styles.root]: index === 0,
                                                    })}
                                                    onClick={() =>
                                                        onNoteSelect && onNoteSelect(noteData.note)
                                                    }
                                                >
                                                    <span className={styles.noteName}>
                                                        {noteData.note}
                                                    </span>
                                                    <span className={styles.interval}>
                                                        {noteData.interval}
                                                    </span>
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                {noteData.isCharacteristic
                                                    ? 'Characteristic note of this mode'
                                                    : 'Same as major scale'}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>

                        <div className={styles.characteristicsSection}>
                            <div className={styles.characteristic}>
                                <Label>Feeling</Label>
                                <p>{characteristics.feeling}</p>
                            </div>

                            <div className={styles.characteristic}>
                                <Label>Characteristic Note</Label>
                                <Badge variant="secondary">
                                    {characteristics.characteristicNote}
                                </Badge>
                            </div>

                            <div className={styles.characteristic}>
                                <Label>Description</Label>
                                <p>{characteristics.description}</p>
                            </div>

                            <div className={styles.characteristic}>
                                <Label>Common Chords</Label>
                                <div className={styles.chordsList}>
                                    {characteristics.chords.map((chord, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className={styles.chordBadge}
                                        >
                                            {chord}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    };

    const renderModeComparison = () => {
        const majorNotes = getCharacteristicNotes(scaleKey, Mode.IONIAN);
        const currentModeNotes = getCharacteristicNotes(scaleKey, activeMode);

        return (
            <Card className={styles.comparisonCard}>
                <CardHeader>
                    <CardTitle>Mode Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={styles.comparisonTable}>
                        <div className={styles.comparisonHeader}>
                            <div>Degree</div>
                            <div>Major Scale</div>
                            <div>{ModeLabel[activeMode]}</div>
                            <div>Difference</div>
                        </div>
                        {majorNotes.map((majorNote, index) => {
                            const modeNote = currentModeNotes[index];
                            const isDifferent = majorNote.note !== modeNote.note;

                            return (
                                <div key={index} className={styles.comparisonRow}>
                                    <div className={styles.degree}>{index + 1}</div>
                                    <div className={styles.majorNote}>{majorNote.note}</div>
                                    <div
                                        className={cns(styles.modeNote, {
                                            [styles.different]: isDifferent,
                                        })}
                                    >
                                        {modeNote.note}
                                    </div>
                                    <div className={styles.difference}>
                                        {isDifferent ? modeNote.interval : '—'}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className={styles.modeExplorer}>
            <Card className={styles.controlsCard}>
                <CardHeader>
                    <CardTitle>Mode Explorer</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className={styles.controls}>
                        <div>
                            <Label htmlFor="mode-select">Mode</Label>
                            <Select value={activeMode} onValueChange={handleModeChange}>
                                <SelectTrigger id="mode-select">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(Mode).map(mode => (
                                        <SelectItem key={mode} value={mode}>
                                            {ModeLabel[mode]}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>
                                <input
                                    type="checkbox"
                                    checked={showComparison}
                                    onChange={e => setShowComparison(e.target.checked)}
                                />
                                Show Comparison with Major
                            </Label>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className={styles.modeContent}>
                {renderModeInfo(activeMode)}
                {showComparison && renderModeComparison()}
            </div>
        </div>
    );
}
