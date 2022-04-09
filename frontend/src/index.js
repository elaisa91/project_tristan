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
import Header from './components/Header/Header.js';
import Navigator from './components/Navigator/Navigator.js';

const initialState = {
  image: {},
  rotate_angle: 0,
  cat_options: [],
  all_subcategories: [],
  all_folios: [],
  subcat_options: [],
  selected_catoption: "",
  selected_subcatoption: "",
  selected_search_field: "",
  result_images: [],
  search_page_visible: false,
  criteria_visible: true,
  work_team_visible: true,
  methods_visible: false,
  licence_visible: false,
  introduction_visible: true,
  cgm51_visible: false,
  selected_item: "",
  transcription_text : [],
  transcription_style : "",
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
    case "ROTATE_ANGLE":
      return {
        ...state,
        rotate_angle: action.payload
      };
    case "CAT_OPTIONS":
      return {
        ...state,
        cat_options: action.payload
      };

    case "ALL_FOLIOS":
      return {
        ...state,
        all_folios: action.payload
      };

    case "ALL_SUBCATEGORIES":
      return {
        ...state,
        all_subcategories: action.payload
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

    case "SELECTED_SEARCH_FIELD":
      return {
        ...state,
        selected_search_field: action.payload
      }

    case "RESULT_IMAGES":
      return {
        ...state,
        result_images: action.payload
      };

    case "SEARCH_PAGE_VISIBLE":
      return {
        ...state,
        search_page_visible: action.payload
      };

    case "CRITERIA_VISIBLE":
      return {
        ...state,
        criteria_visible: action.payload
      };

    case "WORK_TEAM_VISIBLE":
      return {
        ...state,
        work_team_visible: action.payload
      };

    case "METHODS_VISIBLE":
      return {
        ...state,
        methods_visible: action.payload
      };

    case "LICENCE_VISIBLE":
      return {
        ...state,
        licence_visible: action.payload
      }; 

    case "INTRODUCTION_VISIBLE":
      return {
        ...state,
        introduction_visible: action.payload
      };

    case "CGM51_VISIBLE":
      return {
        ...state,
        cgm51_visible: action.payload
      }; 

    case "SELECTED_ITEM":
      return {
        ...state,
        selected_item: action.payload
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
    case "TRANSCRIPTION_TYPE":
      return {
        ...state,
        transcription_type: action.payload
      };

    case "TRANSCRIPTION_LANG":
      return {
        ...state,
        transcription_lang: action.payload
      };

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
    <Provider store={store}>
      <Router>
        <Header/>
        <Navigator/>
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

