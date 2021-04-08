import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
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
export default function MainCard(props) {
  const classes = useStyles();
  return (
    <CardWraper>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          ></Typography>
          <Typography variant="h5" component="h3">
            {props.item.title}
          </Typography>
          <Typography variant="body2" component="p">
            {props.item.content}
            <br />
          </Typography>
        </CardContent>
        <CardContent>
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
