import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import store from "./redux/store";
import Appcontroller from "./App.controller";
const GlobalCss = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    font-family: "Ubuntu", sans-serif;
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
