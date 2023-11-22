import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';

import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

const name = (state = null, action) => {

    // Conditional to handle name dispatch
    if (action.type === 'NAME') {
        return action.payload;
    }

    return state;
};

const feeling = (state = null, action) => {

    // Conditional to handle feeling dispatch
    if (action.type === 'FEELING') {
        return action.payload;
    }

    return state;
};

const understanding = (state = null, action) => {
    
    // Conditional to handle understanding dispatch
    if (action.type === 'UNDERSTANDING') {
        return action.payload;
    }

    return state;
};

const support = (state = null, action) => {
    
    // Conditional to handle support dispatch
    if (action.type === 'SUPPORT') {
        return action.payload;
    }

    return state;
};

const comments = (state = '', action) => {

    // Conditional to handle comments dispatch
    if (action.type === 'COMMENTS') {
        return action.payload;
    }

    return state;
};

const reduxStore = createStore(
    combineReducers({
        name,
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
