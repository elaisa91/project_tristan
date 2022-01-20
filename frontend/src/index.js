import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './fonts/Junicode.ttf';
import './index.css';
import HomePage from './components/HomePage/HomePage.js';
import ProjectPage from './components/ProjectPage/ProjectPage.js';
import FacsimilePage from './components/FacsimilePage/FacsimilePage.js';
import CanvasPage from './components/CanvasPage/CanvasPage.js';
import Footer from './components/Footer/Footer.js';
import TextOne from './components/Texts/TextOne';

const initialState = {
  image: null
}

function reducer (state = initialState, action) { 
  switch(action.type) {
    case "SELECT_IMAGE":
      return {
        ...state,
        image: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes> 
          <Route path="/" element = {<HomePage/>} />
          <Route path="/project" element = {<ProjectPage/>} />
          <Route path="/facsimile" element = {<FacsimilePage/>} />
          <Route path="/facsimile/:canvas" element = {<CanvasPage/>} />
        </Routes>
      </Router> 
      <Footer/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

