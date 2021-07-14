import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import MainCard from "../card/MainCard";
import Pagnition from "../pagination/Pagination.controller";
import { PageContext } from "../pagination/PaginationContext";
const StyledMain = styled.main`
  width: 90%;
  margin-top: 0.3em;
  @media screen and (min-width: 900px) {
    width: 60%;
  }
`;

function renderList(list, setRightDissabled, isRightDissabled) {
  const limit = list[list.length - 1];
  if (list.length === 0) return null;
  else if (list.length - 1 < limit) {
    return list.map((value, index) => {
      //last list data not needed
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
  const { pageNumber, setRightDissabled, isRightDissabled } = useContext(
    PageContext
  );

  useEffect(() => {
    let url;
    //initial render default is all
    if (categoryId === "" || categoryId === "0") {
      url = `/category/all?pageNumber=${pageNumber}`;
    } else {
      url = `/category/${categoryName}/?categoryId=${categoryId}&pageNumber=${pageNumber}`;
    }
    fetch(url, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          setList([...data.data]);
          const limit = data.data[data.data.length - 1];
          if (data.data.length - 1 < limit) {
            setRightDissabled(true);
          } else {
            if (isRightDissabled === true) setRightDissabled(false);
          }
        } else {
          throw Error("couldn't get posts");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    categoryId,
    categoryName,
    pageNumber,
    setRightDissabled,
    isRightDissabled,
  ]);

  return (
    <StyledMain>
      <Pagnition />
      {renderList(list, setRightDissabled, isRightDissabled)}
      <Pagnition />
    </StyledMain>
  );
}

export default Main;
