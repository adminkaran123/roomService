import { useState, useCallback } from "react";
import Editor from "@draft-js-plugins/editor";
import { EditorBlock, EditorState, AtomicBlockUtils } from "draft-js";

const Component = (props) => {
  // const { block, contentState, blockProps } = props;
  // const entity = block.getEntityAt(0);
  //const data =
  //contentState && contentState.getEntity(block.getEntityAt(0)).getData();
  // console.log(block);
  // console.log(props, entity, blockProps);

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
      <button
        onClick={() => {
          setEditorState(insertBlock());
        }}
      >
        Insert block
      </button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockRendererFn={blockRenderer}
        readOnly
      />
    </>
  );
}
