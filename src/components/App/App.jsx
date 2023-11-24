import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support'
import Comments from '../Comments/Comments';
import Submission from '../Submission/Submission';
import Home from '../Home/Home';
import Name from '../Name/Name';

import { Grid, Paper, Card, CardContent } from '@mui/material';
import FeedbackTable from '../FeedbackTable/FeedbackTable';

function App() {

  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Stream</h1>
        </header>
      </div>

      <Router>

        {/* Home page to navigate to /feeling and return to from /submission */}
        <Grid container spacing={2} alignItems={'center'} justifyContent={'center'} minHeight={'25vh'}>
          <Route exact path='/'>
            <Home />
          </Route>


          {/* Name route */}
          <Route exact path='/name'>
            <Name />
          </Route>

          {/* Feeling route */}
          <Route exact path='/feeling'>
            <Feeling />
          </Route>


          {/* Understanding route */}
          <Route exact path='/understanding'>
            <Understanding />
          </Route>

          {/* Support route */}
          <Route exact path='/support'>
            <Support />
          </Route>

          {/* Comments route */}
          <Route exact path='/comments'>
            <Comments />
          </Route>

          <Route exact path='/submission'>
            <Submission />
          </Route>

        </Grid>

        <Route exact path='/admin'>
          <FeedbackTable />
        </Route>

      </Router >
    </>
  );
}

export default App;
