import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import { Button, Stack, Typography } from "@mui/material";
import { EditorWrapper } from "./Editor.styles";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";
import useEditor from "./Editor.hooks";
import PropertiesModal from "../PropertiesModal";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from "@draft-js-plugins/buttons";

interface Props {
  handleClose: any;
  open: boolean;
}

export default function FormEditor(props: Props) {
  const { handleClose, open } = props;
  const {
    setEditorState,
    insertBlock,
    blockRenderer,
    editorState,
    plugins,
    InlineToolbar,
  } = useEditor();

  return (
    <>
      <EditorWrapper>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          blockRendererFn={blockRenderer}
          plugins={plugins}
        />
        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
              </div>
            )
          }
        </InlineToolbar>
      </EditorWrapper>
    </>
  );
}
