import { useState } from "react";
import Editor from "@draft-js-plugins/editor";
import { EditorBlock, EditorState, AtomicBlockUtils } from "draft-js";
import { Button, Stack, Typography } from "@mui/material";
import { EditorWrapper } from "./Editor.styles";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const Component = (props) => {
  return (
    <div
      style={{
        border: "1px solid #003366",
        backgroundColor: "#EFEFEF",
        width: "100%",
        height: "120px",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", width: "100%", margin: "10px" }}
        contentEditable={false}
      >
        <button>Custom Octopus Script Component</button>
        <button>Custom Octopus Script Component</button>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "auto",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            border: "1px solid #f00",
            width: "80%",
            display: "flex",
            alignSelf: "center",
          }}
        >
          <EditorBlock {...props} />
        </div>
      </div>
    </div>
  );
};
export default function FormEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const insertBlock = () => {
    const contentState = editorState.getCurrentContent();

    const contentStateWithEntity = contentState.createEntity(
      "TEST",
      "MUTABLE",
      {
        a: "b",
      }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    return AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      "Hello"
    );
  };

  const blockRenderer = (contentBlock) => {
    const type = contentBlock.getType();
    console.log(contentBlock);
    console.log(type);
    if (type === "atomic") {
      return {
        component: Component,
        editable: false,
        props: {
          octData: "custom template",
        },
      };
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent="flex-end">
        <Button
          onClick={() => {
            setEditorState(insertBlock());
          }}
          variant="contained"
          style={{ color: "#fff" }}
          size="large"
        >
          <ViewModuleIcon />
          <Typography marginLeft="10px">Add Form Elements</Typography>
        </Button>
      </Stack>
      <EditorWrapper>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          blockRendererFn={blockRenderer}
          readOnly
        />
      </EditorWrapper>
    </>
  );
}
