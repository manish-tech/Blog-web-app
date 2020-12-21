import React from 'react'
import Login from "./Login";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {authenticate} from "./Login.action";
import {useLocation} from "react-router-dom";
function Logincontroller() {
    console.log(useLocation());
    const pathName = useLocation().pathname;
    const [userName ,setUserName] = useState("");
    const [password ,setPassword] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (e)=>{
        e.preventDefault();
        const data = {userName , password};
        dispatch(authenticate(data,pathName));
   
    }

    return (
        <div>
             <Login 
                handleSubmit = {handleSubmit}
                userName = {userName}
                password = {password}
                setUserName = {setUserName}
                setPassword = {setPassword}
             />
        </div>
    )
}

export default Logincontroller
