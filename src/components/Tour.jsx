import styles from './tour.cssm';

import React from 'react';
import ReactTour from 'reactour';

import TextButton from './common/TextButton';

const style = {
    backgroundColor: 'black',
    color: 'white',
};

const steps = [
    {
        selector: '[data-tour="scale-key-selector"]',
        content: () => (
            <div>
                <strong>Key Selector</strong>
                <br />
                Select the key of the scale you want highlighted below.
            </div>
        ),
    },
    {
        selector: '[data-tour="scale-type-selector"]',
        content: () => (
            <div>
                <strong>Scale Type Selector</strong>
                <br />
                Select the type of the scale you want highlighted below.
            </div>
        ),
    },
    {
        selector: '[data-tour="rooted-scale"]',
        content: () => (
            <div>
                <strong>Rooted Scale</strong>
                <br />
                This shows you all the notes, starting with the key you selected. The colored notes
                indicate the notes in the scale. <em>Hover</em> over the notes to see their
                intervals!
            </div>
        ),
    },
    {
        selector: '[data-tour="fretboard"]',
        content: () => (
            <div>
                <strong>Fretboard</strong>
                <br />
                Same as the <em>Rooted Scale</em>, with all the same functionalities, but this is in
                the form of a Guitar's fretboard. Try changing the tuning!
            </div>
        ),
    },
    {
        selector: '[data-tour="triads"]',
        content: () => (
            <div>
                <strong>Triads</strong>
                <br />
                This lists the notes and the names of all the <em>triads</em> that fit in the
                currently selected scale.
            </div>
        ),
    },
    {
        selector: '[data-tour="sevenths"]',
        content: () => (
            <div>
                <strong>Sevenths</strong>
                <br />
                While this lists the notes and the names of all the <em>sevenths</em> that fit in
                the currently selected scale.
            </div>
        ),
    },
    {
        selector: '[data-tour="chords-container"]',
        content: () => (
            <div>
                Clicking on any of the chords below, highlights all the notes on the{' '}
                <strong>Rooted Scale</strong> and the <strong>Fretboard</strong>. Try clicking one!
            </div>
        ),
    },
    {
        selector: '[data-tour="rooted-scale"]',
        content: () => (
            <div>The notes of the chord you selected will highlighted with a thicker border.</div>
        ),
    },
    {
        selector: '[data-tour="scale-finder"]',
        content: () => (
            <div>This section always indicates which scales fit for the highlighted notes.</div>
        ),
    },
    {
        selector: '[data-tour="notes-container"]',
        content: () => (
            <div>
                Click on the notes <strong>D</strong>, <strong>F</strong> and <strong>A</strong> on
                either the Rooted Scale or the Fretboard.
            </div>
        ),
    },
    {
        selector: '[data-tour="scale-finder"]',
        content: () => (
            <div>As you can see, the scale finder works for selected notes as well.</div>
        ),
    },
    {
        selector: '[data-tour="take-a-tour"]',
        content: () => (
            <div>
                And that concludes the tour! You can always go through the tour again if you're
                confused about something by clicking here. <strong>Best of luck!</strong>
            </div>
        ),
    },
].map(step => Object.assign(step, { style }));

/**
 * The music tour component
 * @returns {Component} The tour react component
 */
export default function Tour({ isOpen, onStopTour }) {
    return (
        <ReactTour
            steps={steps}
            isOpen={!!isOpen}
            lastStepNextButton={<TextButton>Done! Let's start playing</TextButton>}
            nextButton={<TextButton className={styles.button}>Next</TextButton>}
            prevButton={<TextButton className={styles.button}>Previous</TextButton>}
            onRequestClose={onStopTour}
        />
    );
}
