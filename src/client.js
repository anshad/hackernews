import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './App.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
  () => {
    document.getElementById('state').remove();
    delete window.__STATE__;
  },
);
