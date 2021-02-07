import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import reducer, { initialState } from './contexts/reducer'
import { StateProvider } from  './contexts/stateprovider'

ReactDOM.render(
  <React.StrictMode>
    <StateProvider intialState={initialState} reducer={reducer}>

    <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
