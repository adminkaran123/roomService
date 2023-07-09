import { Box, styled } from "@mui/material";
export const IntegrationWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow-y: auto;
  justify-content: center;

  .relation_line {
    height: 2px;
    border-bottom: 7px dotted #fff;
    margin-right: 0px;
    width: 120px;
  }
`;
