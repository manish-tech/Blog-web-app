import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "./reactDraftEditor/Editor";
import { useState } from "react";
import CardContent from "@material-ui/core/CardContent";
const ComposeWraper = styled.div`
  width: 90%;
  margin: auto;
`;

const BackGround = styled.div`
  height: 13vh;
`;

const H3 = styled.h3`
  letter-spacing:0.1em;

  
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
  const { userName } = useSelector((state) => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userName: state.login.userName,
    };
  });
  const classes = useStyles();
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [headline, setHeadline] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const changeInEditorState = (newEditorState) => {
    setEditorState(newEditorState);
  };

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
        userName: userName,
        categoryId: category,
        content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
        title: title,
        headline : headline
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
        <CardContent style={{ width: "250px", }}>
          <InputLabel
            style={{ display: "block" }}
            id="demo-simple-select-label"
          >
            <H3 >Title*</H3>
          </InputLabel>
          <TextField
            style={{ display: "block" }}
            value={title}
            onInput={(e) => setTitle(e.target.value)}
          />
        </CardContent>

        <CardContent style={{ width: "250px" }}>
          <InputLabel
            style={{ display: "block" }}
            id="demo-simple-select-label"
          >
            <H3>Headline*</H3>
          </InputLabel>
          <TextField
            style={{ display: "block" }}
            value={headline}
            onInput={(e) => setHeadline(e.target.value)}
          />
        </CardContent>
        <CardContent style={{ width: "250px" }}>
          <InputLabel
            style={{ display: "block" }}
            id="demo-simple-select-label"
          >
            <H3>Category*</H3>
          </InputLabel>

          <Select
            style={{ display: "block", width: "100%" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {renderMenuItems(categories)}
          </Select>
        </CardContent>
        <CardContent>
          <InputLabel
            style={{ display: "block", marginTop: "2em" }}
            id="demo-simple-select-label"
          >
            <H3>Content*</H3>
          </InputLabel>
        </CardContent>

        <Editor
          editorState={editorState}
          changeInEditorState={changeInEditorState}
        />
        <Button type="submit" variant="contained" color="primary">
          publish
        </Button>
      </form>
    </ComposeWraper>
  );
}

export default Compose;
