import { styled, Stack, TextField } from "@mui/material";

export const Wrapper = styled(Stack)`
  max-width: calc(100% - 160px);
  width: 100%;
  margin-left: 140px;
  padding: 0 20px;
  border: 1px solid #ccc;
  .logic_box {
    max-width: 600px;
    margin: 0 auto;
  }
  .add_btn {
    padding: 0;
    height: 40px;
    min-width: auto;
    width: 40px;
    border-radius: 50%;
  }
  .custom_box {
    border: 1px solid #ccc;
    margin: 10px 0;
    padding: 20px;
  }
`;
