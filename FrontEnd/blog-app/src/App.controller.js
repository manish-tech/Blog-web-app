import React from "react";
import App from "./App";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "./components/Login/Login.action";
import { useEffect } from "react";
import { PaginationContext } from "./components/Pagination/PaginationContext";
function Appcontroller() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);
  return (
    <div>
      <PaginationContext>
        <App />
      </PaginationContext>
    </div>
  );
}

export default Appcontroller;
