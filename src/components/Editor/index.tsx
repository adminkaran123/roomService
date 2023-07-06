import Editor from "@draft-js-plugins/editor";
import { Button, Stack, Typography } from "@mui/material";
import { EditorWrapper } from "./Editor.styles";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import useEditor from "./Editor.hooks";
import PropertiesModal from "../PropertiesModal";

interface Props {
  handleClose: any;
  open: boolean;
}

export default function FormEditor(props: Props) {
  const { handleClose, open } = props;
  const { setEditorState, insertBlock, blockRenderer, editorState } =
    useEditor();

  return (
    <>
      <Stack direction="row" justifyContent="flex-end"></Stack>
      <EditorWrapper>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          blockRendererFn={blockRenderer}
          readOnly
        />
      </EditorWrapper>
      <PropertiesModal
        handleClose={handleClose}
        insertBlock={insertBlock}
        open={open}
      />
    </>
  );
}
