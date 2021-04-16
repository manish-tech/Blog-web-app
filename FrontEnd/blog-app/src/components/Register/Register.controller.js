import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { authenticate } from "../Login/Login.action";
import Register from "./Register";
import { useLocation } from "react-router-dom";
function Registercontroller() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const pathName = useLocation().pathname;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { firstName, lastName, userName, password, description };
    dispatch(authenticate(data, pathName));
  };

  return (
    <div>
      <Register
        firstName={firstName}
        lastName={lastName}
        userName={userName}
        password={password}
        description={description}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setUserName={setUserName}
        setPassword={setPassword}
        setDescription={setDescription}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default Registercontroller;
