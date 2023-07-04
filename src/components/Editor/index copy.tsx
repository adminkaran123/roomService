import React, { useCallback } from "react";
import { EditorBlock, EditorState, AtomicBlockUtils } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import { EditorWrapper } from "./Editor.styles";

export class ScriptEditor extends React.Component {
  ref = React.createRef();
  state = {
    editorState: EditorState.createEmpty(),
  };

  componentDidMount() {
    this.ref.current.addEventListener("drop", this.dropHandler);
  }

  dropHandler = (event) => {
    console.log("DROP !!! ");
    console.log(event);
    this.insertBlock();
  };

  render() {
    const { editorState } = this.state;

    return (
      <>
        <button onClick={this.insertBlock}>Insert block</button>
        <EditorWrapper style={{ border: "solid 1px #EFEFEF" }} ref={this.ref}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            blockRendererFn={blockRenderer}
          />
        </EditorWrapper>
      </>
    );
  }

  onChange = (editorState) => this.setState({ editorState });

  insertBlock = () => {
    const { editorState } = this.state;

    this.setState({
      editorState: insertBlock(editorState),
    });
  };
}

const insertBlock = (editorState) => {
  const contentState = editorState.getCurrentContent();

  const contentStateWithEntity = contentState.createEntity("TEST", "MUTABLE", {
    a: "b",
  });

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity,
  });

  return AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    "     Hello  "
  );
};

const blockRenderer = (contentBlock) => {
  const type = contentBlock.getType();
  console.log("contentBlock");
  console.log(contentBlock);
  console.log(type);
  if (type === "atomic") {
    return {
      component: Component,
      editable: true,
      props: {
        octData: "custom template",
      },
    };
  }
};

const Component = (props) => {
  // const { block, contentState, blockProps } = props;
  // const entity = block.getEntityAt(0);
  //const data =
  //contentState && contentState.getEntity(block.getEntityAt(0)).getData();
  // console.log(block);
  // console.log(props, entity, blockProps);

  const sayHello = useCallback(() => alert("hello"), []);

  return (
    <div
      // contentEditable={false}
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
      <div style={{ display: "flex", width: "100%", margin: "10px" }}>
        <button onClick={sayHello}>Custom Octopus Script Component</button>
        <button onClick={sayHello}>Custom Octopus Script Component</button>
        <span>props.octData:{JSON.stringify(props.blockProps)}</span>
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
