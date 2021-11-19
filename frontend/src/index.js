import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './fonts/Junicode.ttf';
import './index.css';
import SearchPage from './components/SearchPage/SearchPage.js';

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
      <SearchPage />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

