import React from 'react';
import ReactDOM from 'react-dom';
import './fonts/Junicode.ttf';
import './index.css';
import SearchPage from './components/SearchPage/SearchPage.js';


ReactDOM.render(
  <React.StrictMode>
    <SearchPage />
  </React.StrictMode>,
  document.getElementById('root')
);

