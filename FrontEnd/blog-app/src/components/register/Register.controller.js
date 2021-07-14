import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { authenticate } from "../login/Login.action";
import Register from "./Register";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import uploadImage from "../../helper/uploadImage";

function Registercontroller() {
  const [url,setUrl] = useState(""); 
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const pathName = useLocation().pathname;
  const inputImageRef = useRef(); 
  const handleSubmit = async(e) => {
    function reset(){
      setFirstName('');
      setLastName('')
      setUserName('');
      setPassword('')
      setDescription('')
      setUrl('');
    }
    e.preventDefault();
    try{
      let url = '';
      if(inputImageRef.current){
        let {src } = await uploadImage(inputImageRef.current);
        url = src;
      }
      const data = { firstName, lastName, userName, password, description ,url};
      dispatch(authenticate(data, pathName,reset));
    }
    catch(error){
      console.error(error);
    }
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
        url={url}
        setUrl={setUrl}
        inputImageRef = {inputImageRef}
        
      />
    </div>
  );
}

export default Registercontroller;
