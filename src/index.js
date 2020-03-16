import 'antd/dist/antd.css';

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

if (module.hot) {
    module.hot.accept('./App', function() {
        console.log('Accepting the updated App module!');
        render();
    });
}
