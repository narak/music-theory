import './globals.css';

import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

/**
 * Mounts the App on the DOM element.
 * @returns {void}
 */
function render() {
    const container = document.getElementById('main-container');
    const root = createRoot(container);
    root.render(<App />);
}

render();
