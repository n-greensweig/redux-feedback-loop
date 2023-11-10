import React from 'react';
import axios from 'axios';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

function App() {

  const feeling = useSelector(store => store.feeling);
  const understanding = useSelector(store => store.understanding);
  const support = useSelector(store => store.support);
  const comments = useSelector(store => store.comments);
  console.log(feeling);
  console.log(understanding);
  console.log(support);
  console.log(comments);

  const dispatch = useDispatch();

  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-title'>Feedback!</h1>
        <h4>Don't forget it!</h4>
      </header>
    </div>
  );
}

export default App;
