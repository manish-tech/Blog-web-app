import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import getTimeToAgo from '../../helper/getTimeToAgo';
const useStyles = makeStyles({
  root: {
    minWidth: 0,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export const CardWraper = styled.div`
  border-width: 3px;
  border-style: solid;
  border-color: #f5f2f2;
  margin-bottom: 2em;
`;
const MainCard = (props) => {
  const classes = useStyles();

  return (
    <CardWraper 

    >
      <Card className={classes.root}>
      <CardContent style={{paddingBottom:'0',display:'flex',justifyContent:'space-between',alignItems:'center'}} >
       <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
          <Avatar
            src = {props.item.url}
          />
         <b style={{marginLeft :'0.5em'}}>{props.item.user_name}</b>
         </div>
         <b>{getTimeToAgo(props.item.post_date)}</b>
       </CardContent>
        <CardContent  style={{paddingBottom:'0'}}>
          <Typography variant="h4" component="h3">
            {props.item.title}
          </Typography>
        </CardContent>
        <CardContent  style={{paddingBottom:'0'}}>
          <Typography
            variant="h6"
            color="textSecondary"
            gutterBottom
          >
            {" "}
            {props.item.headline}
          </Typography>
        </CardContent>
        <CardContent >
          <Link
            to={"/post/" + props.item.post_id}
            style={{ textDecoration: "none" }}
          >
            Learn More
          </Link>
        </CardContent>
      </Card>
    </CardWraper>
  );
}

export default MainCard;
