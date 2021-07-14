import React from "react";
import { useSelector } from "react-redux";
import Post from "./Post";
import NotLogin from "../NotLogin";
import { useParams } from "react-router-dom";

function renderPost({
  login,
  handleCommentSubmit,
  comment,
  setComment,
  post,
  commentList,
  setCommentList,
}) {
  // login.isLoggedIn === true
  if (true) {
    
    return (
      <Post
        handleCommentSubmit={handleCommentSubmit}
        comment={comment}
        setComment={setComment}
        post={post}
        commentList={commentList}
        setCommentList={setCommentList}
      />
    );
  } else {
    return <NotLogin />;
  }
}

function Postcontroller() {
  const login = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userName: state.login.userName,
    };
  });
  const params = useParams();
  const [comment, setComment] = React.useState("");
  const [commentList, setCommentList] = React.useState([]);
  const [post, setPost] = React.useState({});
  React.useEffect(() => {
    fetch("/post/" + params.postId, {
      method: "GET",
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          
          setPost(data);
        } else {
          throw new Error("couldn't get the post");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch("/comment/submitComment", {
      method: "POST",
      body: JSON.stringify({
        postId: params.postId,
        userName: login.userName,
        content: comment,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
         
          if (data.status) setCommentList([...data.data]);
        } else {
          alert("couldn't post");
          throw new Error("couldn't post");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {
        post.data?
          renderPost({
          login,
          handleCommentSubmit,
          comment,
          setComment,
          post,
          commentList,
          setCommentList,
        })
      : null
      }
    </div>
  );
}

export default Postcontroller;
