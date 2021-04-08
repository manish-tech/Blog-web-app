import React, { useEffect, useState, useContext, useRef } from "react";
import styled from "styled-components";
import MainCard from "../Card/MainCard";
import Pagnition from "../Pagination/Pagination.controller";
import { PageContext } from "../Pagination/PaginationContext";
const StyledMain = styled.main`
  width: 100%;
`;

function renderList(list, setRightDissabled,isRightDissabled) {
  const limit = list[list.length - 1];
  if (list.length === 0) return null;
  else if (list.length - 1 < limit) {
    return list.map((value, index) => {
      if (index < list.length - 1)
        return <MainCard key={value.post_id} item={value} />;
      else return null;
    });
  } else {
    return list.map((value, index) => {
      if (index < list.length - 2)
        return <MainCard key={value.post_id} item={value} />;
      else return null;
    });
  }
}

function Main({ categoryName, categoryId }) {
  const [list, setList] = useState([]);
  const { pageNumber, setRightDissabled ,isRightDissabled} = useContext(PageContext);

  useEffect(() => {
    let url;
    //initial render default is all
    if (categoryId === "" || categoryId === "0") {
      url = `http://localhost:8080/category/all?pageNumber=${pageNumber}`;
    } else {
      url = `http://localhost:8080/category/${categoryName}/?categoryId=${categoryId}&pageNumber=${pageNumber}`;
    }
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status){
          setList([...data.data]);
          const limit = data.data[data.data.length-1]
          if (data.data.length - 1 < limit) {
             setRightDissabled(true);
          }
          else{
            if(isRightDissabled === true)
              setRightDissabled(false);
          }
        }
        else {
          throw Error("couldn't get posts");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryId, categoryName, pageNumber,setRightDissabled,isRightDissabled]);

  return (
    <StyledMain>
      <Pagnition />
      {renderList(list, setRightDissabled,isRightDissabled)}
      <Pagnition />
    </StyledMain>
  );
}

export default Main;
