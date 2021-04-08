import React, { useContext } from "react";
import Pagination from "./Pagination";
import { PageContext } from "./PaginationContext";

function Paginationcontroller() {
  const {
    pageNumber,
    isLeftDissabled,
    isRightDissabled,
    setPagenumber,
    setLeftDissabled,
    setRightDissabled,
  } = useContext(PageContext);

  async function getPosts(){

   
    try{
      const response = await fetch("https://api.github.com/users/defunkt");
      const data = await response.json();
      console.log(data);
    } 
    catch(e){
      //console.log(e);
    }
  }

  function handleLeftClick(event) {
    setPagenumber((prevPageNumber) => {
      if (prevPageNumber >= 1) {
        if (prevPageNumber === 1) {
          setLeftDissabled(true);
        }
        const pageNumber = prevPageNumber - 1;
        return pageNumber;
      }
    });
  }

  function handleRightClick(event) {
    //pagenumber refers to previous rendered pagenumber
    if (pageNumber + 1 === 1) setLeftDissabled(false);
    setPagenumber((prevPageNumber) => {
      const pageNumber = prevPageNumber + 1;
      return pageNumber;
    });

    //getPosts();
  }

  return (
    <div>
      <Pagination
        pageNumber={pageNumber}
        isLeftDissabled={isLeftDissabled}
        isRightDissabled={isRightDissabled}
        handleLeftClick={handleLeftClick}
        handleRightClick={handleRightClick}
      />
    </div>
  );
}

export default Paginationcontroller;
