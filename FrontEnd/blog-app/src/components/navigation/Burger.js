import React from "react";
import styled from "styled-components";

const StyledBurger = styled.div`
  display: none;
  cursor: pointer;
  div {
    border-radius: 3px;
    height: ${({isSideNavOn})=>{return isSideNavOn ? "10px":"4px"}};
    width: 25px;
    margin: 2px;
    background-color: black;
  }
  @media screen and (max-width: 900px) {
    position: absolute;
    top: ${({ isSideNavOn }) => {
      return isSideNavOn ? "2px" : "2.5em";
    }};
    right: 0;
    display: block;
    margin-right: 0.3em;
    z-index: 20;
  }
`;

function Burger({ isSideNavOn, setSideNavOn }) {
  return (
    <StyledBurger
      isSideNavOn={isSideNavOn}
      onClick={() => {
        setSideNavOn(!isSideNavOn);
      }}
    >
      {!isSideNavOn ? (
        <>
          <div></div>
          <div></div>
          <div></div>
        </>
      ) : (
        <div></div>
      )}
    </StyledBurger>
  );
}

export default Burger;
