import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const StyledPagnition = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media screen and (max-width: 350px){
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-start;
  }
`;
const PageNumber = styled.div`
@media screen and (max-width: 350px){
  margin-right: 2em;
}

`
function Pagination({
  pageNumber,
  isLeftDissabled,
  isRightDissabled,
  handleLeftClick,
  handleRightClick,
}) {
  const classes = useStyles();
  return (
    <StyledPagnition>
      <Button
        disabled={isLeftDissabled}
        variant="contained"
        size="small"
        color="primary"
        className={classes.margin}
        style={{ fontSize: "1rem", fontWeight: "bold" }}
        onClick={handleLeftClick}
      >
        {"<"}
      </Button>
      <PageNumber>{pageNumber}</PageNumber>
      <Button
        disabled={isRightDissabled}
        variant="contained"
        size="small"
        color="primary"
        className={classes.margin}
        style={{ fontSize: "1rem", fontWeight: "bold" }}
        onClick={handleRightClick}
      >
        {">"}
      </Button>
    </StyledPagnition>
  );
}

export default Pagination;
