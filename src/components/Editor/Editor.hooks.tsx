import { useState, useMemo } from "react";
import {
  EditorBlock,
  EditorState,
  AtomicBlockUtils,
  BlockMap,
  Modifier,
} from "draft-js";
import { createEditorStateWithText } from "@draft-js-plugins/editor";
import { EditorTextArea, EditorTextfield } from "./FormElemnts";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";

const Image = (props: any) => {
  if (!!props.src) {
    return <img src={props.src} />;
  }
  return null;
};
const Media = (props: any) => {
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
  const [editorState, setEditorState] = useState(
    createEditorStateWithText(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    )
  );

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
      //@ts-ignore
      "create-entity"
    );

    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
  };

  const blockRenderer = (block: any) => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }
    return null;
  };

  const [plugins, InlineToolbar] = useMemo(() => {
    const inlineToolbarPlugin = createInlineToolbarPlugin({});
    return [[inlineToolbarPlugin], inlineToolbarPlugin.InlineToolbar];
  }, []);

  return {
    editorState,
    blockRenderer,
    setEditorState,
    insertBlock,
    plugins,
    InlineToolbar,
  };
};

export default useEditor;
