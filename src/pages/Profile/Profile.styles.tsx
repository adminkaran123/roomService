import { Box, styled } from "@mui/material";

export const ConnectedBox = styled(Box)`
  margin: 0 auto;
  width: 240px;
  background: #2c3640;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  position: relative;
  .icon_checked {
    position: absolute;
    right: -8px;
    top: -15px;
    background: #4691d4;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding-top: 4px;
  }

  .icon_checked svg {
    width: 30px;
    height: 30px;
  }
`;
