import React ,{useContext}from "react";
import { PageContext } from "../Pagination/PaginationContext";
import Category from "../Category/Category";


export default function AsideCard({categories}) {
  const { setPagenumber,setLeftDissabled}  = useContext(PageContext)

  return (
    <>
        <Category
          categories = {categories}
          setPagenumber = {setPagenumber}
          setLeftDissabled = {setLeftDissabled}
        />
    </>
  );
}
