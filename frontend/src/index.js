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

const initialState = {
  image: {},
  cat_options: [],
  subcat_options: [],
  selected_catoption: "",
  selected_subcatoption: "",
  result_images: [],
  transcription_text : [],
  transcription_said : [],
  trascription_style : "",
  transcription_type : "",
  transcription_lang : "",
  subcategory_desc : "",
  notes : []
}

function reducer (state = initialState, action) { 
  switch(action.type) {
    case "SELECTED_IMAGE":
      return {
        ...state,
        image: action.payload
      };

    case "CAT_OPTIONS":
      return {
        ...state,
        cat_options: action.payload
      };

    case "SUBCAT_OPTIONS":
      return {
        ...state,
        subcat_options: action.payload
      };

    case "SELECTED_CATOPTION":
      return {
        ...state,
        selected_catoption: action.payload
      };
    case "SELECTED_SUBCATOPTION":
      return {
        ...state,
        selected_subcatoption: action.payload
      }

    case "RESULT_IMAGES":
      return {
        ...state,
        result_images: action.payload
      };
    case "CONTENT":
      return {
        ...state,
       content: action.payload
      };
    case "TRANSCRIPTION_TEXT":
      return {
        ...state,
        transcription_text: action.payload
      };
    case "TRANSCRIPTION_STYLE":
      return {
        ...state,
        transcription_style: action.payload
      };
    case "TRANSCRIPTION_SAID":
      return {
        ...state,
        transcription_said: action.payload
      };
    case "TRANSCRIPTION_TYPE":
      return {
        ...state,
        transcription_type: action.payload
      };
    case "TRANSCRIPTION_LANG":
      return {
        ...state,
        transcription_lang: action.payload
      }
    case "SUBCATEGORY_DESC":
      return {
        ...state,
        subcategory_desc: action.payload
      };
    case "NOTES":
      return {
        ...state,
        notes: action.payload
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
  <div className='container'>
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
  </div>
  </React.StrictMode>,
  document.getElementById('root')
);

