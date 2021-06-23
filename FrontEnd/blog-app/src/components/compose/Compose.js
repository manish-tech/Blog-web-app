import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Editor from "./Editor/Editor";

const ComposeWraper = styled.div`
  width: 90%;
  margin: auto;
`;

const BackGround = styled.div`
  height: 30vh;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      maxWidth: "100%",
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
function renderMenuItems(categories) {
  return categories.map((category) => {
    return (
      <MenuItem key={category.category_id} value={category.category_id}>
        {category.category_name}
      </MenuItem>
    );
  });
}

function Compose() {
  const login = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userName: state.login.userName,
    };
  });
  const classes = useStyles();
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [categories, setCategories] = React.useState([]);

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
          setCategories([...data.data]);
        } else {
          throw Error("couldn't get categories");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSubmitPost(e) {
    e.preventDefault();
    fetch("/compose/submitPost", {
      method: "POST",
      body: JSON.stringify({
        userName: login.userName,
        categoryId: category,
        content: content,
        title: title,
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
          alert("successfully posted");
        } else {
          throw new Error("couldn't post");
        }
      })
      .catch((err) => {
        alert("couldn't post");
        console.log(err);
      });
  }

  return (
    <ComposeWraper>
      <BackGround />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        method="post"
        onSubmit={handleSubmitPost}
      >
        <InputLabel style={{ display: "block" }} id="demo-simple-select-label">
          <h3>Title</h3>
        </InputLabel>
        <TextField
          style={{ display: "block" }}
          id="standard-basic"
          value={title}
          onInput={(e) => setTitle(e.target.value)}
        />
        <InputLabel style={{ display: "block" }} id="demo-simple-select-label">
          <h3>Category</h3>
        </InputLabel>
        <Select
          style={{ display: "block" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {renderMenuItems(categories)}
        </Select>
        <InputLabel
          style={{ display: "block", marginTop: "2em" }}
          id="demo-simple-select-label"
        >
          <h3>Content</h3>
        </InputLabel>
        {/* <TextareaAutosize
          style={{
            display: "block",
            width: "100%",
            height: "100vh",
            marginTop: "2em",
          }}
          aria-label="maximum height"
          placeholder="Maximum 100 rows"
          value={content}
          onInput={(e) => setContent(e.target.value)}
        /> */}
        <Editor />
        <Button type="submit" variant="contained" color="primary">
          submit
        </Button>
      </form>
    </ComposeWraper>
  );
}

export default Compose;
