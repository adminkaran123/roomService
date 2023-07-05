import { styled, Stack } from "@mui/material";

export const MediaWraper = styled(Stack)`
  h5 {
    margin-bottom: 10px;
  }
  .upload_box {
    width: 100%;
    height: 200px;
    border: 2px dotted #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #1b2633;
    cursor: pointer;
  }

  .upload_box input {
    display: none;
  }

  .upload_box svg {
    width: 80px;
    height: 80px;
  }
`;
