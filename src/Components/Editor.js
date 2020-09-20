import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

function PostEditor({ handleInputChange, initialValue }) {
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
    handleInputChange({ target: { name: 'body', value: content }})
  }
  return (
    <Editor
      value={initialValue}
      apiKey={process.env.REACT_APP_TINYMCE}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        toolbar:
          `undo redo | formatselect | bold italic backcolor | 
          alignleft aligncenter alignright alignjustify | 
          bullist numlist outdent indent | removeformat | help`
      }}
      onEditorChange={handleEditorChange}
    />
  );
}

 export default PostEditor;
