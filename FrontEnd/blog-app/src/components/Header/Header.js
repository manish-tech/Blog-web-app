import React from "react";
import styled from "styled-components";
import NavBar from "../navigation/NavBar.js";

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
  margin: 0;
`;
export const Image = styled.img.attrs((props) => {
  return {
    src: "./icon.png",
  };
})`
  height: 4rem;
`;

function Header() {
  return (
    <HeaderStyle>
      <IconWrapper>
        <Image />
        <Paragraph>Blog</Paragraph>
      </IconWrapper>
      <NavBar />
      
    </HeaderStyle>
  );
}

export default Header;
