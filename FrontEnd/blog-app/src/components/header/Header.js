import React ,{useContext}from "react";
import styled from "styled-components";
import NavBar from "../navigation/NavBar.js";
import { Link } from "react-router-dom";
import { PageContext } from "../pagination/PaginationContext";
const HeaderStyle = styled.header`
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f4f4f2;
  height: fit-content;
  width: 100%;
  top: 0;
  z-index: 10;
  opacity: 1;
  max-width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Paragraph = styled.p`
  font-size: 1.7rem;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  color :black;
  margin: 0;
`;

export const Img = styled.img`
  height: 4rem;
`;

function Header() {
  const { setPagenumber, setLeftDissabled } = useContext(PageContext);
  return (
    <HeaderStyle>
      <Link 
      to ="/" 
      style = {{listStyle:"none",textDecoration:"none"}}
      onClick={() => {
                  setPagenumber(0);
                  setLeftDissabled(true);
                }}
      >
        <IconWrapper>
          <Img src="/icon.png" />
          <Paragraph>Blog</Paragraph>
        </IconWrapper>
      </Link>
      <NavBar />
    </HeaderStyle>
  );
}

export default Header;
