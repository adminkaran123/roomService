import { Box, styled } from "@mui/material";
export const IntegrationWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow-y: auto;
  justify-content: center;

  .relation_line {
    height: 2px;
    border-bottom: 7px dotted #333333;
    margin-right: 0px;
    width: 120px;
  }
  a {
    color: #777cf0;
    text-decoration: none;
  }
  .otp-input {
    align-items: center;
    margin-bottom: 20px;
  }

  .otp-input input[type="text"] {
    height: 50px;
    min-width: 50px;
    margin: 0 5px;
    font-size: 20px;
  }
`;
