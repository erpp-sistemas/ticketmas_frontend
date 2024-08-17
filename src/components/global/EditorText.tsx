import React, { useState, useEffect } from 'react';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
// @ts-ignore
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// @ts-ignore
import draftToHtml from 'draftjs-to-html';
// @ts-ignore
import htmlToDraft from 'html-to-draftjs';

interface EditorTextParams{
  textoPorDefecto?:string
  setValue:(text:string)=>void
}

const EditorText:React.FC<EditorTextParams>=({ textoPorDefecto, setValue}:EditorTextParams) =>{
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  useEffect(() => {
    if (textoPorDefecto||textoPorDefecto=="") {
        const contentBlock = htmlToDraft(textoPorDefecto);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, [textoPorDefecto]);

  const handleEditorStateChange = (editorState:any) => {

    setEditorState(editorState);
    const content = editorState.getCurrentContent();
    const contentAsHTML = draftToHtml(convertToRaw(content));
    setValue(contentAsHTML)

  };

  return (

      <div className='bg-gray-200 text-black '>
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}
        />
      </div>

  );
}

export default EditorText;