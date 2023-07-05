import { styled, Stack } from "@mui/material";

export const ModalBox = styled(Stack)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  box-shadow: 0px 16px 32px -4px rgba(0, 0, 0, 0.24),
    0px 0px 2px rgba(0, 0, 0, 0.24);
  padding: 40px;
  .close_btn {
    width: 35px;
    height: 35px;
    background: #fff;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #000;
    padding: 3px;
  }
`;
