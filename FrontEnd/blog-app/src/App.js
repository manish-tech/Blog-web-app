import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/routes/Routes";

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
