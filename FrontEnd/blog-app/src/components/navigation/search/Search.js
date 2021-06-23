import React, { useState, useReducer, useRef } from "react";
import styled from "styled-components";
import useDebounce from "../../../hooks/useDebounce";
import SearchIcon from "@material-ui/icons/Search";
import Results from "./Results";
import TextField from "@material-ui/core/TextField";
import useOutsideClick from "../../../hooks/useOutsideClick";

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

export const LOADING = "LOADING";
export const ERROR = "ERROR";
export const RESULTSNOTFOUND = "RESULTSNOTFOUND";
export const FOUNDDATA = "FOUNDDATA";

export async function fetchData(dispatch, url,extraOperation,element) {
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
      let errorMessage = "";
      if (response.status >= 400 && response.status < 500)
        errorMessage = "data not found 404";
      else if (response.status >= 500 && response.status < 600)
        errorMessage = "internal server error";
      dispatch({
        type: ERROR,
        payload: {
          errorMessage: errorMessage,
        },
      });
      return;
    }

    const { data: result } = await response.json();
   
    const data = result.results;
    if(data){
        if(extraOperation  &&  typeof(extraOperation) === 'function' ){
          extraOperation(result,element);
          return;
        }
    }
    if (data.length === 0) {
      dispatch({
        type: RESULTSNOTFOUND,
      });
    } else if (data.length > 0) {
      dispatch({
        type: FOUNDDATA,
        payload: {
          data: {
            data,
            limit : result.limit
          }
        },
      });
    }
  } catch (e) {
    let errorMessage = "";
    if (e.toString() === "TypeError: Failed to fetch") {
      errorMessage = "Check your internet connection";
    }
    dispatch({
      type: ERROR,
      payload: {
        errorMessage: errorMessage,
      },
    });
    console.dir(e.toString());
  }
}

export const initialState = {
  data: null,
  isLoading: false,
  error: false,
  errorMessage: "",
  limit : 0
};

export const searchReducer = (searchState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...searchState,
        data: searchState.data,
        isLoading: true,
        error: false,
        errorMessage: "",
      };

    case ERROR:
      return {
        ...searchState,
        data: null,
        isLoading: false,
        error: true,
        errorMessage: action.payload.errorMessage,
      };

    case RESULTSNOTFOUND:
      return {
        ...searchState,
        data: [],
        isLoading: false,
        error: false,
        errorMessage: "",
      };

    case FOUNDDATA:
      
      if(action.payload.data.padding){
        const {top,bottom,padding } = action.payload.data.padding;
        let paddingTop;
        let paddingBottom;
        if(top === undefined) paddingTop = searchState.paddingTop;
        else{
          if(top){
            paddingTop = searchState.paddingTop + padding;
          }
          else{
            if(searchState.paddingTop - padding < 0){
              paddingTop = 0;
            }
            else{
              paddingTop = searchState.paddingTop - padding;
            }
          }
        }
        if(bottom){
          paddingBottom = searchState.paddingBottom + padding;
        }
        else{
          if(searchState.paddingBottom - padding < 0){
            paddingBottom = 0;
          }
          else{
            paddingBottom = searchState.paddingBottom - padding;
          }
        }
        
        return{
          ...searchState,
          data: [...action.payload.data.data],
          isLoading: false,
          error: false,
          errorMessage: "",
          limit : action.payload.data.limit,
          paddingTop : paddingTop,
          paddingBottom : paddingBottom
        }
      }

      return {
        ...searchState,
        data: [...action.payload.data.data],
        isLoading: false,
        error: false,
        errorMessage: "",
        limit : action.payload.data.limit
      };
    default:
      return searchState;
  }
};

function Search() {

  const [inputValue, setInputValue] = useState("");
  const [searchState, dispatch] = useReducer(searchReducer, initialState);
  const [resultsVisible, setResultsVisible] = useState(false);
  const resultsDomNode = useRef(null);
  useOutsideClick(handleOutsideClick, resultsDomNode);
  const getData = useDebounce(fetchData, 300);

  function handleOutsideClick() {
    setResultsVisible(false);
    setInputValue("");
  }

  function handleOnChange(e) {
    const query = e.target.value;
    setInputValue(query);
    if (query) {
      const trimedQuery = query.trim();
      if (trimedQuery) {
        setResultsVisible(true);
        const url = `http://localhost:8080/search/?q=${trimedQuery}`;
        getData(dispatch, url);
        return;
      }
      setResultsVisible(false);
      return;
    } else {
      setResultsVisible(false);
    }
  }

  return (
    <SearchBox ref={resultsDomNode}>
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
          query={inputValue}
          searchState={searchState}
          setResultsVisible={setResultsVisible}
          resultsVisible={resultsVisible}
          setInputValue={setInputValue}
        />
      )}
    </SearchBox>
  );
}

export default Search;
