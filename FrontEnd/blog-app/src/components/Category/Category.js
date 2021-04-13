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
  left: 0px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  list-style: none;
  transition: 0.5s linear;
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
      <div>
        <StyledButton
          onClick={(e) => {
            setisDropdown(!isDropdown);
          }}
          variant="contained"
        >
          categories {">"}
        </StyledButton>
      </div>
      <div>
        <StyledUl isDropdown={isDropdown}>
          {renderCategories()}
        </StyledUl>
      </div>
    </StyledCategory>
  );
}

export default Category;
