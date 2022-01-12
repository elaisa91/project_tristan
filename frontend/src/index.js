import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './fonts/Junicode.ttf';
import './index.css';
import SearchPage from './components/SearchPage/SearchPage.js';
import Home from './components/Home/Home.js';
import Navigator from './components/Navigator/Navigator.js';
import Footer from './components/Footer/Footer.js';
import ContentOne from './components/Footer/Footer.js';

const initialState = {
   
}

function reducer (state = initialState, action) { 
  switch(action.type) {
    case "":
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}

export const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navigator/>
        <Routes> 
          <Route path="/" element = {<Home/>} />
          <Route path="/facsimile" element = {<SearchPage/>} />
        </Routes>
      </Router> 
      <Footer/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

