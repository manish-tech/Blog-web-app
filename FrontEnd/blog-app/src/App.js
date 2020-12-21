import React from "react";
import Header from "./components/Header/Header"
import {BrowserRouter ,Switch , Route , Redirect} from "react-router-dom";
import Routes from "./components/Routes/Routes";

function App() {
  return (
    <div className="App"  >
    <BrowserRouter>
      <Header/>
      <Routes/>
    </BrowserRouter>
    
    </div>
  );
}

export default App;
