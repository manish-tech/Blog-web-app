import React from 'react'
import styled from "styled-components";
import AsideCard from "../Card/AsideCard";

const StyledAside = styled.aside`
    width : 30%;
    margin-left : 10px;
`;

function Aside() {
    return (
        <StyledAside>
            <AsideCard/>

        </StyledAside>
    )
}

export default Aside;
