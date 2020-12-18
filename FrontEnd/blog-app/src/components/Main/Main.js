import React from 'react';
import styled from "styled-components";
import MainCard from "../Card/MainCard";
const StyledMain = styled.main`
    width : 65%;
`

function Main() {
    return (
        <StyledMain>
           <MainCard />
           <MainCard />
           <MainCard />
           <MainCard />
           <MainCard />
           <MainCard />
           <MainCard />
           <MainCard />
           <MainCard />
           
        </StyledMain>
    )
}

export default Main;
