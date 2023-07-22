import { styled, Stack } from "@mui/material";

export const Wrapper = styled(Stack)`
  padding: 20px;
  .droparea {
    display: flex;
    flex-direction: column;
    background-color: rgb(245, 248, 250);
    border: 1px dashed rgb(81, 111, 144);
    border-radius: 4px;
    color: rgb(124, 152, 182);
    position: relative;
    padding: 24px 20px;
    text-align: center;
    cursor: move;

    .resizer {
      width: 10px;
      height: 10px;
      background: transparent;
      position: absolute;
      width: 20px;
      height: 100%;
      left: 0;
      top: 0;
      cursor: ew-resize;
    }

    .resizer.right {
      left: auto;
      right: 0;
    }
  }
  .layout-box {
    display: flex;
  }
`;
