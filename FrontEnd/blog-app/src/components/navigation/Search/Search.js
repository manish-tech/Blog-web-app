import React, { useState, useReducer, useRef } from "react";
import styled from "styled-components";
import useDebounce from "../../../hooks/useDebounce";
import SearchIcon from "@material-ui/icons/Search";
import Results from "./Results";
import TextField from "@material-ui/core/TextField";

const SearchBox = styled.div`
  width: 100%;
  margin: 0.5em;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LOADING = "LOADING";
const ERROR = "ERROR";
const RESULTSNOTFOUND = "RESULTSNOTFOUND";
const FOUNDDATA = "FOUNDDATA";

async function fetchData(dispatch, url) {
  try {
    dispatch({
      type: LOADING,
    });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      dispatch({
        type: ERROR,
      });
      return;
    }

    const { data } = await response.json();

    if (data.length === 0) {
      dispatch({
        type: RESULTSNOTFOUND,
      });
    } else if (data.length > 0) {
      dispatch({
        type: FOUNDDATA,
        payload: {
          data: data,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

const initialState = {
  data: null,
  isLoading: false,
  error: false,
};

const searchReducer = (searchState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        data: searchState.data,
        isLoading: true,
        error: false,
      };

    case ERROR:
      return {
        data: null,
        isLoading: false,
        error: true,
      };

    case RESULTSNOTFOUND:
      return {
        data: [],
        isLoading: false,
        error: false,
      };

    case FOUNDDATA:
      return {
        data: [...action.payload.data],
        isLoading: false,
        error: false,
      };
    default:
      return searchState;
  }
};

function Search() {
  const [inputValue, setInputValue] = useState("");
  const [searchState, dispatch] = useReducer(searchReducer, initialState);
  const [resultsVisible, setResultsVisible] = useState(false);
  const getData = useDebounce(fetchData, 300);

  function handleOnChange(e) {
    const query = e.target.value;
    setInputValue(query);
    setResultsVisible(true);
    const url = `http://localhost:8080/search/?q=${query}`;
    getData(dispatch, url);
  }

  return (
    <SearchBox>
      <InputBox>
        <TextField
          style={{ margin: 8 }}
          placeholder="Enter the title"
          fullWidth
          value={inputValue}
          onChange={handleOnChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <SearchIcon />
      </InputBox>
      {resultsVisible && (
        <Results
          searchState={searchState}
          setResultsVisible={setResultsVisible}
          resultsVisible={resultsVisible}
        />
      )}
    </SearchBox>
  );
}

export default Search;
