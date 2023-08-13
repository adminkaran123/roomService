import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Import Quill modules for color options
import Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

interface Props {
  editorHtml: string;
  setEditorHtml: Function;
}

const RichTextEditor = (props: Props) => {
  const { editorHtml, setEditorHtml } = props;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ,
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "link"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }], // Add color and background options
      ["clean"],
    ],
  };

  const handleEditorChange = (html: string) => {
    setEditorHtml(html);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={editorHtml}
        onChange={handleEditorChange}
        modules={modules}
      />
    </div>
  );
};

export default RichTextEditor;
