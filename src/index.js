import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; /* eslint-disable-line import/no-unassigned-import */
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
