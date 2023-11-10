import React from 'react';
import axios from 'axios';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support'
import Comments from '../Comments/Comments';
import Submission from '../Submission/Submission';

function App() {

  // Connect local variable to reducers
  const feeling = useSelector(store => store.feeling);
  const understanding = useSelector(store => store.understanding);
  const support = useSelector(store => store.support);
  const comments = useSelector(store => store.comments);

  // Dispatch
  const dispatch = useDispatch();


  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Feedback!</h1>
        </header>
      </div>

      <Router>
        <Route exact path='/feeling'>
          <Feeling />
        </Route>

        <Route exact path='/understanding'>
          <Understanding />
        </Route>

        <Route exact path='/support'>
          <Support />
        </Route>

        <Route exact path='/comments'>
          <Comments />
        </Route>

        <Route exact path='/submission'>
          <Submission />
        </Route>

      </Router>
    </>
  );
}

export default App;
