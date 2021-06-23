import React from "react";
import styled from "styled-components";

const StyledBurger = styled.div`
  display: none;
  padding: 1em;
  padding-top: 0;
  cursor: pointer;
  div {
    border-radius: 3px;
    height: ${({ isSideNavOn }) => {
      return isSideNavOn ? "10px" : "4px";
    }};
    width: 25px;
    margin: 2px;
    background-color: black;
  }
  @media screen and (max-width: 900px) {
    display: block;
    position: ${({ isSideNavOn }) => {
      return isSideNavOn ? "absolute" : "static";
    }};
    top: ${({ isSideNavOn }) => {
      return isSideNavOn ? "2px" : "none";
    }};
    right: ${({ isSideNavOn }) => {
      return isSideNavOn ? "2px" : "none";
    }};
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
