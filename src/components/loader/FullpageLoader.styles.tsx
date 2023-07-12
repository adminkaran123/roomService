import { Box, styled, CircularProgress } from "@mui/material";
export const LoaderContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const Loader = styled(CircularProgress)`
  margin-bottom: 20px;
`;
