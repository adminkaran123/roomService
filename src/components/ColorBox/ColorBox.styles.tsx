import { styled, Stack } from "@mui/material";

export const Wrapper = styled(Stack)`
  label {
    margin-bottom: 10px;
  }
  .color_input {
    width: 150px;
  }

  .color_box {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    margin-left: 20px;
    padding: 0;
    min-width: 50px;
  }
`;
