import React from "react";
import styled from "styled-components";
import { commands } from "./commands";
import { RichUtils,EditorState } from "draft-js";
const StyledToolbar = styled.div`
  color: red;
  background-color: red;
`;

function Toolbar({ editorState, onChange }) {
  function handleItalicClick(e) {
    onChange(RichUtils.toggleInlineStyle(editorState, commands.italic));
  }

  function handleBoldClick(e) {
    onChange(RichUtils.toggleInlineStyle(editorState, commands.bold));
  }

  function handleUnderlineClick(e) {
    onChange(RichUtils.toggleInlineStyle(editorState, commands.underline));
  }

  function handleStrikeThroughClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, commands.strikeThrough));
  }

  function handleHighLightClick() {
    onChange(RichUtils.toggleInlineStyle(editorState, commands.highlight));
  }

  function handleCreateLinkClick(){
    const selection = editorState.getSelection();
    const link = window.prompt("enter the url..");

    if(!link){
      onChange(RichUtils.toggleLink(editorState,selection,null));
      return 'handled'
    }

    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK','MUTABLE',{url : link});
    const newEditorState = EditorState.push(editorState,contentWithEntity,'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
  }

  return (
    <StyledToolbar>
      <button type="button" onClick={handleItalicClick}>
        <em>I</em>
      </button>
      <button type="button" onClick={handleBoldClick}>
        <b>B</b>
      </button>
      <button type="button" onClick={handleUnderlineClick}>
        U
      </button>
      <button
        type="button"
        onClick={handleStrikeThroughClick}
        style={{ textDecoration: "line-through" }}
      >
        abc
      </button>
      <button
        type="button"
        onClick={handleHighLightClick}
        style={{ color: "black", backgroundColor: "yellow" }}
      >
        {" "}
        <b>H</b>
      </button>
      <button type="button" onClick = {handleCreateLinkClick}>link</button>
    </StyledToolbar>
  );
}

export default Toolbar;
