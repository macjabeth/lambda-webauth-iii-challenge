import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './components/Root';
import './style.css';

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('root')
);
