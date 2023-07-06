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
      <PropertiesModal handleClose={handleClose} open={open} />
    </>
  );
}
