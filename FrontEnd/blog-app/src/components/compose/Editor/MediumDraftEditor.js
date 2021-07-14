import React, { useRef ,useState , useEffect} from 'react'
import 'medium-draft/lib/index.css';
import {
  Editor,
  createEditorState,
} from 'medium-draft';
//import {convertToHTML} from 'draft-convert';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import { BLOCK_BUTTONS } from 'medium-draft';
import CustomImageSideButton from './CustomImageSideButton';
const blockButtons = [{
    label: 'H1',
    style: 'header-one',
    icon: 'header',
    description: 'Heading 1',
  },
  {
    label: 'H2',
    style: 'header-two',
    icon: 'header',
    description: 'Heading 2',
}].concat(BLOCK_BUTTONS);


function MediumDraftEditor() {

    const [ editorState , setEditorState] = useState(()=>{
        return createEditorState();
    })
    const ref = useRef(null);
    const refsEditor = useRef();
    const sideButtons = [
        {
            title : 'Image',
            icon: 'header',
            component : CustomImageSideButton
        }
    ]

    useEffect(()=>{
        refsEditor.current.focus();
        const html = mediumDraftExporter(editorState.getCurrentContent());
        ref.current.innerHtml = html;
    },[editorState])
    const handleOnChange = (editorState)=>{
        setEditorState(editorState);
    }
    return (
        <div>
            <Editor
                ref = {refsEditor}
                editorState = {editorState}
                onChange = {handleOnChange}
                sideButtons = {sideButtons}
                blockButtons = {blockButtons}
            />
            <div ref = {ref}>

            </div>
        </div>
    )
}

export default MediumDraftEditor
