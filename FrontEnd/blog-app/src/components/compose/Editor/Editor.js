import React, { useState } from "react";
import styled from "styled-components";
import Toolbar from "./Toolbar/Toolbar";
import { EditorState, RichUtils } from "draft-js";
import DraftEditor from "@draft-js-plugins/editor";

import createHighlightPlugins from "./plugins/createHighlightPlugins";

const highlightPlugins = createHighlightPlugins();

const EditorContainer = styled.div`
  max-width: 100%;
  margin: auto;
`;

const DraftEditorContainer = styled.div`
  border: 3px solid;
  border-radius: 0.2em;
  min-height: 200vh;
  padding: 2em;
`;

function Editor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  function onChange(editorState) {
    console.dir(editorState);
    setEditorState(editorState);
  }

  function handleKeyCommand(command) {
    const newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (newEditorState) {
      onChange(newEditorState);
      return "handled";
    }
    return "not-handled";
  }

  return (
    <EditorContainer>
      <Toolbar editorState={editorState} onChange={onChange} />
      <DraftEditorContainer>
        <DraftEditor
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          plugins={[highlightPlugins]}
        />
      </DraftEditorContainer>
    </EditorContainer>
  );
}

export default Editor;
