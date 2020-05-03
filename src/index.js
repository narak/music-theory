import 'antd/dist/antd.dark.css';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

/**
 * Mounts the App on the DOM element.
 * @returns {void}
 */
function render() {
    ReactDOM.render(<App />, document.getElementById('main-container'));
}

render();
