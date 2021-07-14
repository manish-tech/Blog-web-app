import React, { useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import { StyledLink, StyledCard } from "./Card";
import CircularProgress from "@material-ui/core/CircularProgress";

const StyledResults = styled.div`
  background-color: white;
  min-width: 100%;
  position: absolute;
  top: 2.5em;
  border-style: solid;
  border-color: white;
  border-radius: 5px;
`;

function getResults({ data, isLoading, error, errorMessage }, query) {
  if (isLoading) {
    return (
      <StyledCard key="loading" style={{ padding: "2em" ,display:'flex',justifyContent:'center',alignItems:'center'}}>
        <CircularProgress />
      </StyledCard>
    );
  } else if (error) {
    return (
      <StyledCard key="error" style={{ padding: "2em" }}>
        {errorMessage ? errorMessage : "ERROR.."}
      </StyledCard>
    );
  }

  if (data) {
    if (data.length === 0) {
      return (
        <StyledCard key="no results found" style={{ padding: "2em" }}>
          No Results Found...
        </StyledCard>
      );
    } else {
      const cards = data.map((value) => {
        return <Card key={value.post_id} data={value} />;
      });
      cards.push(
        <StyledCard
          key="more results"
          style={{ backgroundColor: "#d6a6e6", fontWeight: "bold" }}
        >
          <StyledLink to={`/search/?q=${query}&pageNumber=0`} style={{ color: "black" }}>
            {" "}
            More Results
          </StyledLink>
        </StyledCard>
      );
      return cards;
    }
  }
}

function Results({ searchState, setResultsVisible, query }) {
  const { isLoading, error } = searchState;
  
  const trimedQuery = query.trim();

  function handleResultsVisible() {
    if (isLoading || error) return;
    setResultsVisible(false);
  }

  return (
    <StyledResults onClick={handleResultsVisible}>
      {getResults(searchState, trimedQuery)}
    </StyledResults>
  );
}

export default Results;
