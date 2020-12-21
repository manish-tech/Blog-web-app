import React from 'react'
import styled from "styled-components"; 
import {Link} from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import Button from '@material-ui/core/Button';
import {setLogin}  from "../Login/Login.action"
const NavbarStyle = styled.nav`
    width:90%;
    max-width : 100%;
 
`;

const UnListStyle = styled.ul`
    list-style-type: none;
    padding:0;
    margin:0;
    display:flex;
    justify-content:flex-end;
    @media screen and (max-width: 900px) {
           margin-bottom :1.5em;
   }

`;

const ListStyle = styled.li`
    
`;

export const LinkStyle = styled(Link)` 
    font-family: 'Ubuntu', sans-serif;
    text-decoration:none;
    color:black;
    padding:0.7em;
    margin-right:2em;
    font-size:1.2rem;
    font-weight : bold;
    &:hover{
        background-color:#edefee;
        color :black
    };

    border-radius:47%;
`;

function NavBar() {
    const dispatch = useDispatch();
    const login = useSelector((state)=>{
        return {
             isLoggedIn : state.login.isLoggedIn,
             userName : state.login.userName
         }
     });

    function handleLogout(e){
        fetch("http://localhost:8080/logout",{
            method : "get",
            credentials: "same-origin"
        })
        .then((response)=>{
            return response.json();
        })
        .then((data)=>{
            if(data.status){
                dispatch(setLogin({isLoggedIn : false ,userName : null}));
                alert("successfully logged out");
            }
            else{
                throw new Error("couldn't logout");
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    } 

    return (
        <NavbarStyle>
            <UnListStyle>
                <ListStyle>
                    <LinkStyle to = "/">Home</LinkStyle>
                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "/login">Login</LinkStyle>
                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "/register">Register</LinkStyle>
                </ListStyle>
                { login.isLoggedIn &&
                    <ListStyle>
                        <Button variant="contained" color="primary" onClick = {handleLogout}>
                            logout
                        </Button>
                    </ListStyle>
                }
                {
                    login.isLoggedIn &&
                    <ListStyle>
                        <LinkStyle to = "/">{login.userName}</LinkStyle>
                    </ListStyle>
                }
            </UnListStyle>
        
        </NavbarStyle>
    )
}

export default NavBar
