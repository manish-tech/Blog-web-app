import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledCard = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: solid;
  border-width: 1px;
`;

export const StyledLink = styled(Link)`
  list-style: none;
  text-decoration: none;
  height: 100%;
  width: 100%;
  padding: 1em;
  text-align: center;
`;
function Card({ data }) {
  const { title, post_id } = data;
  return (
    <StyledCard>
      <StyledLink to={`/post/${post_id}`}>{title}</StyledLink>
    </StyledCard>
  );
}

export default Card;
