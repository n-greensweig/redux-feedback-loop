// Import React and routing dependencies
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom/cjs/react-router-dom.min';

// Import styling for the app
import './App.css';

// Import personally-created React components
import Feeling from '../Feeling/Feeling';
import Understanding from '../Understanding/Understanding';
import Support from '../Support/Support'
import Comments from '../Comments/Comments';
import Submission from '../Submission/Submission';
import Home from '../Home/Home';
import Name from '../Name/Name';
import FeedbackTable from '../FeedbackTable/FeedbackTable';

// MUI components
import { Grid } from '@mui/material';

function App() {

  return (
    <>
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Eval Ninja</h1>
        </header>
      </div>

      <Router>

        {/* Home page to navigate to /name and return to from /submission */}
        <Grid container spacing={2} alignItems={'center'} justifyContent={'center'} minHeight={'5vh'}>
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

          {/* Submission route */}
          <Route exact path='/submission'>
            <Submission />
          </Route>

        </Grid>

        {/* Route to admin data table */}
        <Route exact path='/admin'>
          <FeedbackTable />
        </Route>

      </Router >
    </>
  );
}

export default App;
