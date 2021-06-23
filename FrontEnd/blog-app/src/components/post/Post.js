import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import Comment from "../comment/Comment";

const StyledPost = styled.div`
  width: 90%;
  margin: 20vh auto;
`;

function renderComments(commentList) {
  return commentList.map((comment) => {
    return <Comment key={comment.comment_id} comment={comment} />;
  });
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Post(props) {
  const classes = useStyles();
  const params = useParams();

  React.useEffect(() => {
    fetch("/comment/comments/?postId=" + params.postId, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) props.setCommentList([...data.data]);
        else {
          throw new Error("couldn't get comments");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StyledPost key={props.post.user_name}>
      <CardContent>
        <h3>Author</h3>
        <Typography variant="body2" component="p">
          {props.post.user_name}
          <br />
        </Typography>
      </CardContent>
      <CardContent>
        <h3>Date of post</h3>
        <Typography variant="body2" component="p">
          {props.post.post_date}
          <br />
        </Typography>
      </CardContent>
      <CardContent>
        <h3>Title</h3>
        <Typography variant="body2" component="p">
          {props.post.title}
        </Typography>
      </CardContent>
      <CardContent>
        <h3>Content</h3>
        <Typography
          variant="body2"
          component="p"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {props.post.content}
          <br />
        </Typography>
      </CardContent>
      <CardContent>
        <h3>comments</h3>

        <form
          className={classes.root}
          method="post"
          noValidate
          autoComplete="off"
          onSubmit={props.handleCommentSubmit}
        >
          <TextareaAutosize
            style={{
              display: "block",
              width: "100%",
              height: "15vh",
              marginTop: "2em",
            }}
            aria-label="maximum height"
            placeholder="Maximum 100 rows"
            value={props.comment}
            onInput={(e) => props.setComment(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            submit
          </Button>
        </form>
      </CardContent>
      <CardContent>{renderComments(props.commentList)}</CardContent>
    </StyledPost>
  );
}

export default Post;
