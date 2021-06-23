import React from "react";
import { useParams } from "react-router-dom";
import useQuery from "./useQuery";
import Main from "./Main";

function Maincontroller() {
  const categoryName = useParams().category;
  const query = useQuery();
  const categoryId = query.get("categoryId") || "";

  return (
    <>
      <Main categoryName={categoryName} categoryId={categoryId} />
    </>
  );
}

export default Maincontroller;
