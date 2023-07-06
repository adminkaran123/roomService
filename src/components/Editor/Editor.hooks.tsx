import { useState } from "react";
import { EditorBlock, EditorState, AtomicBlockUtils } from "draft-js";
import { proprtyDummyData } from "../../utils/constants/constants";

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

const useEditor = () => {
  console.log("proprtyDummyData", proprtyDummyData);
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

  return {
    editorState,
    blockRenderer,
    setEditorState,
    insertBlock,
  };
};

export default useEditor;
