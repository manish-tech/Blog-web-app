import React, { useState } from "react";

export const PageContext = React.createContext({});

export const PaginationContext = (props) => {
  const [pageNumber, setPagenumber] = useState(0);
  const [isLeftDissabled, setLeftDissabled] = useState(true);
  const [isRightDissabled, setRightDissabled] = useState(false);
  const value = {
    pageNumber,
    setPagenumber,
    isLeftDissabled,
    isRightDissabled,
    setLeftDissabled,
    setRightDissabled,
  };
  return (
    <PageContext.Provider value={value}>{props.children}</PageContext.Provider>
  );
};
