import React from "react";
import styled from "styled-components";
import AsideCard from "../Card/AsideCard";

const StyledAside = styled.aside`
  width: 90%;
  @media screen and (min-width: 900px) {
    width: 20%;
    display:flex;
    flex-direction:row;
    justify-content: space-around;
    
  }
`;

function Aside() {
  const [categories, setCategories] = React.useState([
    { category_id: 0, category_name: "all" },
  ]);

  React.useEffect(() => {
    fetch("/category/getCategoryNames", {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          setCategories((initialState) => {
            return [...initialState, ...data.data];
          });
        } else {
          throw Error("couldn't get categories");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <StyledAside>
      <AsideCard categories={categories} />
    </StyledAside>
  );
}

export default Aside;
