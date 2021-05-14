import React ,{useState} from 'react'
import styled from "styled-components";
import Toolbar from "./Toolbar/Toolbar"
import {Editor as DraftEditor ,EditorState} from "draft-js";
const EditorContainer = styled.div`
    max-width: 100%;
    margin:auto;
`;

const DraftEditorContainer = styled.div`
    border : 3px solid;
    border-radius : 0.2em;
    min-height : 200vh;
`;




function Editor() {

    const [editorState,setEditorState] = useState(()=> EditorState.createEmpty());

    function onChange(editorState){
        setEditorState(editorState);
    }

    return (
        <EditorContainer>
            <Toolbar/>
        <DraftEditorContainer>
            <DraftEditor
                editorState = {editorState}
                onChange = {onChange}
            />
        </DraftEditorContainer>
        </EditorContainer>
    )
}

export default Editor;
