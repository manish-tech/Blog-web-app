import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import{CardWraper} from "./MainCard";
import {Link} from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
    font-family: 'Ubuntu',sans-serif;
    text-decoration : none;
    font-weight: bold;
    color : black;
    font-size:1.3rem;
    width: 100%;
    border-style:solid;
    border-width:0.2em;
    border-color : black;
    border-radius : 5%;
    padding : 0.75em;
    background-color : #cdc4dc73;
    text-align:center;

    &:hover{
      background-color : #fdfcff00;
    }
`;

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const renderCategories = (categories)=>{
    return(
        categories.map((category)=>{
            return(
              <CardActions key = { category.category_id}>
                <StyledLink to = {"/category/" + category.category_name +"?categoryId="+ category.category_id} > {category.category_name}</StyledLink>
              </CardActions>
            )
        })
    )
}

export default function AsideCard(props) {
  const classes = useStyles();
  return (
     <CardWraper>  
      <Card className={classes.root}>
          <CardContent>
            <h3>Categories</h3>
            {renderCategories(props.categories)}
          </CardContent>  
      </Card>
    </CardWraper>
  );
}
