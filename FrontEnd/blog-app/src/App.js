import React from "react";
import Header from "./components/Header/Header"
import {BrowserRouter} from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Header/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
