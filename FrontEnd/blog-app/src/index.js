import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle} from 'styled-components';
const GlobalCss = createGlobalStyle`
  body,html{
    margin:0;
    width:100%;
    font-family :  'Ubuntu', sans-serif;
    
  }
  *{
    box-sizing:content-box;
  }  

`
  
ReactDOM.render(
  <React.StrictMode>
    <GlobalCss/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
