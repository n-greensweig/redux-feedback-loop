import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';

import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

const feeling = (state = null, action) => {

    // Conditional to handle feeling dispatch
    if (action.type === 'COMMENTS') {
        console.log('comments!!');
    }

    return state;
};

const understanding = (state = null, action) => {
    // Conditional to handle understanding dispatch


    return state;
};

const support = (state = null, action) => {
    // Conditional to handle support dispatch


    return state;
};

const comments = (state = '', action) => {

    // Conditional to handle comments dispatch
    if (action.type === 'COMMENTS') {
        console.log('comments!!');
    }

    return state;
};

const reduxStore = createStore(
    combineReducers({
        feeling,
        understanding,
        support,
        comments,
    }),
    applyMiddleware(logger)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            <App />
        </Provider>
    </React.StrictMode>
);
