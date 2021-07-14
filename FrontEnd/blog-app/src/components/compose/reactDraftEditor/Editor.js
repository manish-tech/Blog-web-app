import React from 'react';
import { Editor as ReactDarftEditor} from 'react-draft-wysiwyg';
import { RichUtils } from 'draft-js';
import imageUploadCallback from './imageUploadCallback';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Editor({ editorState ,changeInEditorState }) {

  
    function handleReturn(e) {
        if (e.key ==='Enter') {
          changeInEditorState(RichUtils.insertSoftNewline(editorState));
          return 'handled';
        }
        return 'not-handled';
      }

    return (
        <div style={{border:'solid',borderWidth :'1px'}}>
            <ReactDarftEditor
                handleReturn = {handleReturn}
                editorState = {editorState}
                onEditorStateChange = { changeInEditorState }
                toolbar = { 
                            {
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'embedded', 'emoji', 'image'],
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                                image: { uploadCallback: imageUploadCallback, alt: { present: true, mandatory: true } }
                            }
                        }
            />
        </div>
    )
}

export default Editor;
