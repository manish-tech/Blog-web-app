import React, { useContext } from "react";
import { PageContext } from "../pagination/PaginationContext";
import Category from "../category/Category";

export default function AsideCard({ categories }) {
  const { setPagenumber, setLeftDissabled } = useContext(PageContext);

  return (
    <>
      <Category
        categories={categories}
        setPagenumber={setPagenumber}
        setLeftDissabled={setLeftDissabled}
      />
    </>
  );
}
