import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Appcontroller from "./App.controller";
const GlobalCss = createGlobalStyle`
  body,html{
    margin:0;
    width:100%;
    font-family :  'Ubuntu', sans-serif;
    
  }
  *{
    box-sizing:content-box;
  }  

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalCss />
    <Provider store={store}>
      <Appcontroller />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);


