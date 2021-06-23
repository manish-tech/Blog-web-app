import React, { useEffect, useReducer, useRef } from "react";
import styled from "styled-components";
import useQuery from "../../hooks/useQuery";
import MainCard from "../card/MainCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import { initializeIntersectionObserver } from "./infiniteScroll";
import {
  initialState,
  fetchData,
  searchReducer,
  FOUNDDATA,
} from "../navigation/search/Search";
import { useState } from "react";
const SET_MAX_NO_OF_PAGES = "SET_MAX_NO_OF_PAGES";
const RESET = "RESET";
const RESULTSLIST = "RESULTS_LIST";

const moreSearchInitialState = {
  ...initialState,
  maxNoOfPages: Number.MAX_SAFE_INTEGER,
  paddingTop : 0,
  paddingBottom : 0
};

const MoreSearchResultsContainer = styled.div`
  max-width: 80%;
  margin: auto;
  margin-top: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: ${({paddingTop})=>{   
    return paddingTop + "px";
  }};
  padding-bottom: ${({paddingBottom})=>{
    return paddingBottom + "px";
  }};

`;

function renderResults(data, topRef, bottomRef) {
  if (data) {
    const results = data.map((value, index) => {
      if (index === 0)
        return <MainCard ref={topRef} key={value.post_id} item={value} />;
      if (index === data.length - 1)
        return <MainCard ref={bottomRef} key={value.post_id} item={value} />;
      else return <MainCard key={value.post_id} item={value} />;
    });
    return results;
  }
}

function getPadding(oneElement,resultList,limit){
  let height = oneElement.offsetHeight;
  let padding = 0;
  if(resultList){
    if(resultList.length > limit){
      padding = (resultList.length - limit)*height;
    }
  }
  return padding;
}

function moreSearchResultsReducer(moreSearchState, action) {

  switch (action.type) {
    case SET_MAX_NO_OF_PAGES:
      return {
        ...moreSearchState,
        maxNoOfPages: action.payload.pages,
      };
    case RESET:
      return {
        ...moreSearchInitialState,
      };

    default:
      return moreSearchState;
  }
}

function moreSearchResultsReducers(moreSearchState, action) {
  const state = [searchReducer, moreSearchResultsReducer].reduce(
    (prev, cur) => {
      const newState = cur(prev, action);
      return newState;
    },
    moreSearchState
  );
  return state;
}

function MoreSearchResults() {

  const query = useQuery().get("q") || "";
  const [topCardNode, setTopCardNode] = useState(null);
  const [bottomCardNode, setBottomCardNode] = useState(null);
  const [result, dispatch] = useReducer(
    moreSearchResultsReducers,
    moreSearchInitialState
  );
  const indexOfListOfData = useRef(0);
  const {
    data,
    limit,
    maxNoOfPages,
    paddingTop,
    paddingBottom
  } = result;

  
  function bottomScrolled(element) {
    
    if(maxNoOfPages === 1) return;
    if (indexOfListOfData.current + 1 > maxNoOfPages) return;
    else {
      indexOfListOfData.current++;
      let resultsList = localStorage.getItem(RESULTSLIST);
      if (resultsList) {
        resultsList = JSON.parse(resultsList);
        if (resultsList[indexOfListOfData.current]) {
          let padding = getPadding(element,resultsList[indexOfListOfData.current],limit);
          dispatch({
            type: FOUNDDATA,
            payload: {
              data: {
                data: resultsList[indexOfListOfData.current],
                limit: limit,
                padding : {
                  top : true,
                  bottom : false,
                  padding: padding
                }
              },
            },
          });
        } else {
          const url = `http://localhost:8080/search/?q=${query}&pageNumber=${indexOfListOfData.current}`;
          fetchData(dispatch, url, cachingData,element);
        }
      }
    }
  }

  function topScrolled(element) {
    
    if (indexOfListOfData.current - 1  <  0) {
      return;
    }
    else{
     
      if(indexOfListOfData.current === maxNoOfPages){
        indexOfListOfData.current -= 1;
      }
      if(indexOfListOfData.current - 1 >= 0)
        indexOfListOfData.current--;
      let resultsList = JSON.parse(localStorage.getItem(RESULTSLIST));
      const padding = getPadding(element,resultsList[indexOfListOfData.current],limit);
      dispatch({
        type : FOUNDDATA,
        payload : {
          data : {
            data : resultsList[indexOfListOfData.current],
            limit : limit,
            padding : {
              top : false,
              bottom : true,
              padding : padding
            }
          }
        }
      })
    }
  }

  function callback(entries, observer) {
    entries.forEach((element) => {
      if ((element.target === topCardNode && element.isIntersecting) && (element.target === bottomCardNode && element.isIntersecting)){
        return;
      }
      if (element.target === topCardNode && element.isIntersecting) {
        topScrolled(element.target); 
        console.log("t");
      }

      if (element.target === bottomCardNode && element.isIntersecting) {
        bottomScrolled(element.target);
        console.log("b");
      }
    });
  }

  useEffect(() => {
    let observer;
    if (topCardNode != null && bottomCardNode != null) {
      observer = initializeIntersectionObserver(callback, [
        topCardNode,
        bottomCardNode,
      ]);
    }

    return () => {
      if (observer) {
        observer.unobserve(topCardNode);
        observer.unobserve(bottomCardNode);
      }
    };
  }, [query, topCardNode, bottomCardNode,maxNoOfPages,data]);

  function cachingData({ results, limit },element) {
   
    let resultsList = localStorage.getItem(RESULTSLIST);
    if (results) {
      if (results.length === 0) {
        resultsList = JSON.parse(resultsList);
        dispatch({
          type: SET_MAX_NO_OF_PAGES,
          payload: {
            pages: resultsList.length,
          },
        });
        
        
        dispatch({
          type: FOUNDDATA,
          payload: {
            data: {
              data: resultsList[resultsList.length - 1],
              limit: limit,
              padding: {
                bottom : false,
                padding: paddingBottom
              }
            },
          },
        });

        return;
      }
      if (resultsList) {
        console.log("cache")
        resultsList = JSON.parse(resultsList);
        if (resultsList.length >= 1) {
          const topData = resultsList[resultsList.length - 1];

          const newTopData = topData.filter((data, index) => {
            if (index >= topData.length / 2) return true;
            else return false;
          });
          for (let result of results) {
            newTopData.push(result);
          }
          resultsList.push(newTopData);
          localStorage.setItem(RESULTSLIST, JSON.stringify(resultsList));
         
          const padding = getPadding(element,newTopData,limit);
          dispatch({
            type: FOUNDDATA,
            payload: {
              data: {
                data: newTopData,
                limit: limit,
                padding : {
                  top : true,
                  bottom : false,
                  padding: padding
                }
              },
            },
          });
        }
        return;
      }

      
      localStorage.setItem(RESULTSLIST, JSON.stringify([results]));
      dispatch({
        type: FOUNDDATA,
        payload: {
          data: {
            data: results,
            limit: limit,
          },
        },
      });
    }
  }

  useEffect(() => {
    const url = `http://localhost:8080/search/?q=${query}&pageNumber=${0}`;
    fetchData(dispatch, url, cachingData);
    return () => {
      localStorage.removeItem(RESULTSLIST);
      dispatch({
        type: RESET,
      });
      indexOfListOfData.current = 0;
    };
  }, [query]);

  return (
    <MoreSearchResultsContainer paddingTop = {paddingTop} paddingBottom = {paddingBottom}>
      {renderResults(data, setTopCardNode, setBottomCardNode)}
      {result.isLoading && (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      )}
    </MoreSearchResultsContainer>
  );
}

export default MoreSearchResults;
