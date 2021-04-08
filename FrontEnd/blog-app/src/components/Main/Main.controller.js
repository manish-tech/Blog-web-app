import React,{useEffect} from "react";
import { useParams, Switch, Route } from "react-router-dom";
import useQuery from "./useQuery";
import Main from "./Main";

function Maincontroller() {
  const categoryName = useParams().category;
  const query = useQuery();
  const categoryId = query.get("categoryId") || "";

  return (
    <div style={{ width: "65%" }}>
      <Main categoryName={categoryName} categoryId={categoryId} />
    </div>
  );
}

export default Maincontroller;
