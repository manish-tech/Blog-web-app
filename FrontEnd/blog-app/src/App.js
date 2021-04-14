import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes/Routes";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
