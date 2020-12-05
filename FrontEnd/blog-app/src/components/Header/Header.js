import React from 'react';
import styled from "styled-components"; 
import NavBar from "../navigation/NavBar.js";

const HeaderStyle = styled.header`
    position:fixed;
    display:flex;
    justify-content:space-between;
    align-items:center;
    background-color:#f4f4f2;
    height:fit-content;
    width:100%;
`;
const Paragraph = styled.p`
    font-size:3rem;
    font-weight:bold;
    margin:0;
`;
const Image = styled.img.attrs((props)=>{
    return(
        {
            src:"./icon.png"
        }
    )
})`
    height:6rem;
`;
function Header() {
    return (
        <HeaderStyle>
            <Image />
            <Paragraph>Blog</Paragraph> 
            <NavBar/>
        </HeaderStyle>
    )
}

export default Header
