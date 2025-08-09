import styles from './three-notes.module.css';

import React, { useState } from 'react';
import cns from 'classnames';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

import { Notes, TuningNotes } from '../constants/NoteConstants';
import { getScale } from '../utils/scale';
import { ScaleType } from '../constants/ScaleConstants';
import Fretboard from './Fretboard';

/**
 * Three-Notes-Per-String scale patterns component
 */
export default function ThreeNotesPerString({
    tuning = 'E',
    scaleKey = 'C',
    scaleType = ScaleType.MAJOR,
    onPatternSelect,
}) {
    const [selectedPattern, setSelectedPattern] = useState(0);
    const [showAllPatterns, setShowAllPatterns] = useState(false);

    const { notes: scaleNotes } = getScale(scaleKey, scaleType);

    const handlePatternChange = patternIndex => {
        setSelectedPattern(patternIndex);
        onPatternSelect && onPatternSelect(patternIndex);
    };

    const getPatternNotes = (pattern, key) => {
        const keyIndex = Notes.indexOf(key);
        const tuningNotes = TuningNotes[tuning].slice().reverse();

        // Each pattern represents a different position/box for the same scale
        // The pattern position should be relative to where the root note appears
        const results = [];

        pattern.strings.forEach((stringData, stringIndex) => {
            const stringNote = tuningNotes[stringIndex];
            const stringNoteIndex = Notes.indexOf(stringNote);

            stringData.frets.forEach(patternFret => {
                // Add the key offset to move the pattern to the correct position
                const adjustedFret = patternFret + keyIndex;

                if (adjustedFret >= 0 && adjustedFret <= 24) {
                    const noteIndex = (stringNoteIndex + adjustedFret) % 12;
                    const note = Notes[noteIndex];
                    const scaleNoteIndex = scaleNotes.indexOf(note);

                    if (scaleNoteIndex !== -1) {
                        // Only include notes that are in the scale
                        results.push({
                            fret: adjustedFret,
                            note,
                            isInScale: true,
                            scalePosition: scaleNoteIndex + 1,
                            string: stringIndex,
                        });
                    }
                }
            });
        });

        return results;
    };

    const renderPattern = (patternIndex, key) => {
        const pattern = ThreeNotesPerStringPatterns[patternIndex];
        const patternNotes = getPatternNotes(pattern, key);

        // Create pattern-specific highlighting data
        const patternHighlights = {};
        patternNotes.forEach(noteData => {
            const fretKey = `${noteData.string}-${noteData.fret}`;
            patternHighlights[fretKey] = {
                scalePosition: noteData.scalePosition,
                isInScale: noteData.isInScale,
                isRoot: noteData.scalePosition === 1,
            };
        });

        return (
            <div key={patternIndex} className={styles.patternContainer}>
                <div className={styles.patternHeader}>
                    <Badge variant={selectedPattern === patternIndex ? 'default' : 'secondary'}>
                        {pattern.name}
                    </Badge>
                    <span className={styles.position}>Position {pattern.position}</span>
                </div>
                <Fretboard
                    tuning={tuning}
                    mode="patterns"
                    patternData={patternHighlights}
                    scaleNotes={getScale(key, scaleType).notes}
                    scaleKey={key}
                />
            </div>
        );
    };

    return (
        <Card className={styles.threeNotesContainer}>
            <CardHeader>
                <CardTitle>Three-Notes-Per-String Patterns</CardTitle>
                <div className={styles.controls}>
                    <div>
                        <Label htmlFor="pattern-select">Pattern</Label>
                        <Select
                            value={selectedPattern.toString()}
                            onValueChange={value => handlePatternChange(parseInt(value))}
                        >
                            <SelectTrigger id="pattern-select">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {ThreeNotesPerStringPatterns.map((pattern, index) => (
                                    <SelectItem key={index} value={index.toString()}>
                                        {pattern.name} (Position {pattern.position})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>
                            <input
                                type="checkbox"
                                checked={showAllPatterns}
                                onChange={e => setShowAllPatterns(e.target.checked)}
                            />
                            Show All Patterns
                        </Label>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className={styles.patternsGrid}>
                    {showAllPatterns
                        ? ThreeNotesPerStringPatterns.map((_, index) =>
                              renderPattern(index, scaleKey)
                          )
                        : renderPattern(selectedPattern, scaleKey)}
                </div>
                <div className={styles.legend}>
                    <div className={styles.legendItem}>
                        <div className={cns(styles.legendColor, styles.rootNote)}></div>
                        <span>Root Note (1)</span>
                    </div>
                    <div className={styles.legendItem}>
                        <div className={cns(styles.legendColor, styles.patternNote)}></div>
                        <span>Pattern Notes</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
