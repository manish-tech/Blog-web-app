import React from "react";
import styled from "styled-components";
import CloseIcon from '@material-ui/icons/Close';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
const StyledBurger = styled.div`
  display: none;
  padding: 0.5em;
  padding-top: 0.2em;
  cursor: pointer;
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
        <MenuRoundedIcon fontSize='large' style = {{marginRight:'0.1em',height:'30px'}}/>  
      ) : 
      (
        <CloseIcon fontSize='small'/>
      )}
    </StyledBurger>
  );
}

export default Burger;
