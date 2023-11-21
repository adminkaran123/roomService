import { Box, styled } from "@mui/material";
export const EditorWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 300px);
  overflow-y: auto;
  margin-top: 50px;

  justify-content: center;
  .DraftEditor-root {
  }
`;
