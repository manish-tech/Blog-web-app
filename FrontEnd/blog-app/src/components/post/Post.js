import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import Comment from "../comment/Comment";
import draftToHtml from "draftjs-to-html";
import getTimeToAgo from "../../helper/getTimeToAgo";
import { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const StyledPost = styled.div`
  width: 70%;
  margin: 10vh auto;
  @media screen and (max-width: 900px) {
    width: 90%;
  }
`;

const Title = styled.h1`
  font-size: 3em;
`;
export function renderComments(commentList) {
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

function Post({
  handleCommentSubmit,
  comment,
  setComment,
  post,
  commentList,
  setCommentList,
  url,
}) {
  const classes = useStyles();
  const params = useParams();
  const { user_name, post_date, title, content: jsonContent } = post.data;
  const [content, setContent] = useState(null);

  React.useEffect(() => {
    try {
      const html = draftToHtml(
        JSON.parse(jsonContent),
        {
          trigger: "#",
          separator: " ",
        },
        true
      );
      setContent(html);
    } catch (e) {
      setContent(jsonContent);
    }

    fetch("/comment/comments/?postId=" + params.postId, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) setCommentList([...data.data]);
        else {
          throw new Error("couldn't get comments");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StyledPost>
      <CardContent style={{ paddingBottom: "0" }}>
        <Title> {title} </Title>
      </CardContent>
      <CardContent
        style={{
          paddingBottom: "0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Avatar src={url} />
          <b style={{ marginLeft: "0.5em" }}>{user_name}</b>
        </div>
        <b>{getTimeToAgo(post_date)}</b>
      </CardContent>
      <CardContent style={{ paddingBottom: "0" }}></CardContent>
      <CardContent>
        {content ? (
          <div
            style={{ whiteSpace: "pre-wrap" }}
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          ></div>
        ) : null}
      </CardContent>
      <CardContent>
      
        <h3>comments</h3>

        <form
          className={classes.root}
          method="post"
          noValidate
          autoComplete="off"
          onSubmit={handleCommentSubmit}
        >
          <TextareaAutosize
            style={{
              display: "block",
              width: "100%",
              height: "13vh",
              marginTop: "2em",
              resize: "none",
              overflow: "scroll-y",
              padding: "1em",
              fontSize: "1rem",
            }}
            aria-label="maximum height"
            placeholder="Maximum 100 rows"
            value={comment}
            onInput={(e) => setComment(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            submit
          </Button>
        </form>
      
      <CardContent
        style={{ borderLeft: "solid", paddingBottom: "0", paddingTop: "0" }}
      >
        {renderComments(commentList)}
      </CardContent>
      </CardContent>
    </StyledPost>
  );
}

export default Post;
