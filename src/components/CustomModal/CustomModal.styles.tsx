import { styled, Stack } from "@mui/material";

export const ModalBox = styled(Stack)`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0%);
  box-shadow: 0px 16px 32px -4px rgba(0, 0, 0, 0.24),
    0px 0px 2px rgba(0, 0, 0, 0.24);
  background: #ffffff;
  padding: 40px;
  .close_btn {
    width: 35px;
    height: 35px;
    background: #000000;
    position: absolute;
    right: 10px;
    top: 10px;
    color: #000;
    padding: 3px;
  }
`;
