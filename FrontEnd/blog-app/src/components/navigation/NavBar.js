import React from 'react'
import styled from "styled-components"; 
import {Link} from "react-router-dom";
const NavbarStyle = styled.nav`
    width:90%;
`;

const UnListStyle = styled.ul`
    list-style-type: none;
    padding:0;
    margin:0;
    display:flex;
    justify-content:flex-end;
`;

const ListStyle = styled.li`
    
`;

const LinkStyle = styled(Link)` 
    font-family: 'Ubuntu', sans-serif;
    text-decoration:none;
    color:black;
    padding:0.5em;
    margin-right:2em;
    font-size:1.2rem;
    &:hover{
        background-color:#fbf7f0;
    };

    border-radius:20%;
`;

function NavBar() {
    return (
        <NavbarStyle>
            <UnListStyle>
                <ListStyle>
                    <LinkStyle to = "/">Home</LinkStyle>
                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "about">About</LinkStyle>

                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "/login">Login</LinkStyle>
                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "/register">Register</LinkStyle>
                </ListStyle>
                <ListStyle>
                    <LinkStyle to = "/compose">Compose</LinkStyle>
                </ListStyle>
            </UnListStyle>
        
        </NavbarStyle>
    )
}

export default NavBar
