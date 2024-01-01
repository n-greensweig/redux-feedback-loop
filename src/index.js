import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';

import { CssBaseline } from '@mui/material';
import '@fontsource/roboto';

import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import logger from 'redux-logger';

// Saga imports
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

const name = (state = null, action) => {

    // Conditional to handle name dispatch
    if (action.type === 'NAME') {
        return action.payload;
    } else if (action.type === 'SUBMIT') {
        return null;
    }

    return state;
};

const feeling = (state = null, action) => {

    // Conditional to handle feeling dispatch
    if (action.type === 'FEELING') {
        return action.payload;
    } else if (action.type === 'SUBMIT') {
        return null;
    }

    return state;
};

const understanding = (state = null, action) => {

    // Conditional to handle understanding dispatch
    if (action.type === 'UNDERSTANDING') {
        return action.payload;
    } else if (action.type === 'SUBMIT') {
        return null;
    }

    return state;
};

const support = (state = null, action) => {

    // Conditional to handle support dispatch
    if (action.type === 'SUPPORT') {
        return action.payload;
    } else if (action.type === 'SUBMIT') {
        return null;
    }

    return state;
};

const comments = (state = '', action) => {

    // Conditional to handle comments dispatch
    if (action.type === 'COMMENTS') {
        return action.payload;
    } else if (action.type === 'SUBMIT') {
        return null;
    }
    
    return state;
};

const feedbackList = (state = [], action) => {
    
    // Conditional to display feedback on /admin path
    if (action.type === 'SET_FEEDBACK') {
        return action.payload;
    }

    return state;

};

// Saga for handling asynchronous actions
function* fetchFeedback() {

    try {
        const response = yield axios.get('/feedback');
        const action = { type: 'SET_FEEDBACK', payload: response.data };
        yield put(action);
    } catch (error) {
        console.error('Error fetching feedback', error);
        alert('Something went wrong.');
    }

}


function* rootSaga() {
    yield takeEvery('FETCH_FEEDBACK', fetchFeedback);
}

// Create a Saga middleware and Redux store
const sagaMiddleware = createSagaMiddleware();
const reduxStore = createStore(
    combineReducers({
        name,
        feeling,
        understanding,
        support,
        comments,
        feedbackList,
    }),
    applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

// Render the main application component within the Redux Provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={reduxStore}>
            <CssBaseline />
            <App />
        </Provider>
    </React.StrictMode>
);
