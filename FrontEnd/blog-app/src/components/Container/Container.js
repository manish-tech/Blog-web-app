import React from 'react'
import Aside from '../Aside/Aside.controler'
import Main from '../Main/Main.controller'
import styled from "styled-components";
import {Link, Route } from "react-router-dom"

const Section = styled.section`
    max-width : 100%;

`;

const BackGroundImage = styled.div`
    /* background-image : url("./blue-background.jpg"); */
    background-color : #764abc;
    background-size:100% 100%;
    height:55vh;
    z-index: -1;
    display:flex;
    flex-direction : column;
    justify-content: flex-end;
    align-items:center;
`
const StyledH1 = styled.h1`
    font-size: 1.5rem;
    font-family :  'Ubuntu', sans-serif;
    color : white;
`

const StyledLink = styled(Link)`
    margin-bottom : 2em;
    text-decoration :none;
    color:black;
    font-family :  'Ubuntu', sans-serif;
    font-weight:bold;
    font-size:1.35rem;
    border-style:solid;
    border-width:3px;
    border-color : black;
    border-radius : 30%;
    padding : 0.8em;
    background-color : #ebedf0;

    &:hover{
        background-color :#e6e2e2;
    }

`;

const SubContainer = styled.section`
    display:flex;
    justify-content : space-between;
    max-width : 90%;
    margin : 2em auto;
    height : 100vh;
    position : relative;
`;


function Container() {
    return (
        <Section>
            <BackGroundImage>
                <StyledH1>Share your knowledge to the world....</StyledH1>
                <StyledLink to = "/compose">compose</StyledLink>
            </BackGroundImage>

                <SubContainer>            
                    <Main/>
                    <Aside/>
                </SubContainer>
        </Section>
    )
}

export default Container;
