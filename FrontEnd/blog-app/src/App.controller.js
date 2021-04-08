import React from "react";
import App from "./App";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "./components/Login/Login.action";
import { useEffect } from "react";

function Appcontroller() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);
  return (
    <div>
      <App />
    </div>
  );
}

export default Appcontroller;
