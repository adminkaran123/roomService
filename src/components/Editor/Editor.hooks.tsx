import { useState } from "react";
import {
  EditorBlock,
  EditorState,
  AtomicBlockUtils,
  BlockMap,
  Modifier,
} from "draft-js";
import { EditorTextArea, EditorTextfield } from "./FormElemnts";
const Image = (props) => {
  if (!!props.src) {
    return <img src={props.src} />;
  }
  return null;
};
const Media = (props) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;

  if (type === "text") {
    media = <EditorTextfield />;
  }

  if (type === "textarea") {
    media = <EditorTextArea />;
  }

  if (type === "image") {
    media = <Image src={src} />;
  }

  return media;
};

const useEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const insertBlock = (customBlockType: string) => {
    //e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      customBlockType,
      "IMMUTABLE",
      { src: "" }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  const blockRenderer = (block) => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }
    return null;
  };

  return {
    editorState,
    blockRenderer,
    setEditorState,
    insertBlock,
  };
};

export default useEditor;
