import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/routes/Routes";
import { PaginationContext } from "./components/pagination/PaginationContext";

function App() {
  return (
    <React.StrictMode>
    <PaginationContext>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
      </PaginationContext>
    </React.StrictMode>
  );
}

export default App;
