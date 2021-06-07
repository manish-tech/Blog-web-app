import React, { useRef } from "react";
import styled from "styled-components";
import Card from "./Card";
import useOutsideClick from '../../../hooks/useOutsideClick';
import {StyledLink,StyledCard} from './Card';
const StyledResults = styled.div`
  background-color: white;
  min-width: 100%;
  position: absolute;
  top: 2.5em;
  border-style: solid;
  border-color: white;
  border-radius: 5px;
`;

function getResults({ data, isLoading, error }) {
  if (isLoading) {
    return "LOADING ......";
  } else if (error) {
    return "ERROR .....";
  } else if (data.length === 0) {
    return "No Results Found...";
  } else if (data) {
    const cards =  data.map((value) => {
      return <Card key={value.post_id} data={value} />;
    });

    cards.push(<StyledCard key = "more results" ><StyledLink  to = "/moreSearchResults" style ={{color : "black"}}> More Results</StyledLink></StyledCard>);
    return cards;
  }
}

function Results({ searchState, setResultsVisible,resultsVisible }) {
  const { data } = searchState;
  const resultsDomNode = useRef(null);
  useOutsideClick(handleResultsVisible,resultsDomNode);
  function handleResultsVisible() {
        setResultsVisible(false);
  }

  function handleOutsideClick(){
    if(resultsVisible)
      setResultsVisible(false);
  }

  useOutsideClick(handleOutsideClick,resultsDomNode);
  return (
    <StyledResults ref = {resultsDomNode} onClick={handleResultsVisible}>
      {data && getResults(searchState)}
    </StyledResults>
  );
}

export default Results;
