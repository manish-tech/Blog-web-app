import React from 'react'
import styled from "styled-components"; 
import {Link} from "react-router-dom";
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
    return (
        <NavbarStyle>
            <UnListStyle>
                <ListStyle>
                    <LinkStyle to = "/">Home</LinkStyle>
                </ListStyle>
                <ListStyle>
                    
                    <LinkStyle to = "/about">About</LinkStyle>

                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "/login">Login</LinkStyle>
                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "/register">Register</LinkStyle>
                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "/logout">Logout</LinkStyle>
                </ListStyle>
            </UnListStyle>
        
        </NavbarStyle>
    )
}

export default NavBar
