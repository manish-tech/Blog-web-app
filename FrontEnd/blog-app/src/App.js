import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter } from "react-router-dom";
import Routes from "./components/Routes/Routes";
import { PaginationContext } from "./components/Pagination/PaginationContext";
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
