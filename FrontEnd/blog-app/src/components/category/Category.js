import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledButton = styled(Button)`
  display: block;
`;
const StyledCategory = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0.9em;
  position: relative;
  width: fit-content;
  
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  width: 100%;
  padding: 0.5em;
  color: black;
`;

const StyledLi = styled.li`
  text-align: center;
  width: 100%;
  padding: 0.5em;
  background-color: #e8e2e2;
  border-radius: 5px;
  border-color: black;
  border-bottom-style: solid;
  border-width: 2px;
  &:hover {
    background-color: #f3ebeb;
  }
`;

const StyledUl = styled.ul`
  position: absolute;
  display: flex;
  top: 2.4em;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  transition: 0.5s linear;
  min-width:100%;
  display: ${({ isDropdown }) => (isDropdown ? "block" : "none")};
`;

function Category({ categories, setPagenumber, setLeftDissabled }) {
  const [isDropdown, setisDropdown] = useState(false);
  function renderCategories() {
    return categories.map((category) => {
      return (
        <StyledLi key={category.category_id}>
          <StyledLink
            to={
              "/category/" +
              category.category_name +
              "?categoryId=" +
              category.category_id
            }
            onClick={() => {
              setPagenumber(0);
              setLeftDissabled(true);
            }}
          >
            {" "}
            {category.category_name}
          </StyledLink>
        </StyledLi>
      );
    });
  }
  return (
    <StyledCategory>
        <StyledButton
          onClick={(e) => {
            setisDropdown(!isDropdown);
          }}
          variant="contained"
        >
          categories {">"}
        </StyledButton>
        <StyledUl isDropdown={isDropdown}>{renderCategories()}</StyledUl>
    </StyledCategory>
  );
}

export default Category;
