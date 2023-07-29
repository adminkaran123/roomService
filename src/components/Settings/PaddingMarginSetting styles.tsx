import { styled, Stack } from "@mui/material";

export const Wrapper = styled(Stack)`
  height: 300px;
  position: relative;
  margin-top: 40px;

  .MuiFormControl-root {
    width: 100px;
    position: absolute;
  }
  .top {
    top: 60px;
  }
  .center {
    position: absolute;
    top: 50%;
    height: 80px;
    width: 80px;
    margin-top: -13px;
    left: 50%;
    margin-left: -40px;
  }
  .left {
    left: 0;
    top: 150px;
  }
  .right {
    right: 0;
    top: 150px;
  }
  .bottom {
    bottom: 0;
  }
`;
