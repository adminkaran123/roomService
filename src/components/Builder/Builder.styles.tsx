import { styled, Stack } from "@mui/material";

export const Wrapper = styled(Stack)`
  min-height: 400px;
  padding: 20px;

  .layout-box {
    margin-bottom: 2px;
    .section-sibling {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border: 1px dashed rgb(81, 111, 144);
      cursor: move;
      &:hover {
        border: 1px solid #29a5ff;
      }
    }
  }
  .droparea {
    display: flex;
    flex-direction: column;

    border-radius: 4px;
    color: rgb(124, 152, 182);
    border: 1px solid transparent;
    position: relative;
    padding: 24px 20px;
    text-align: center;
    cursor: move;
    .column_label {
      background-color: rgb(245, 248, 250);
      border: 1px dashed rgb(81, 111, 144);
      padding: 20px;
    }
    &:hover {
      border: 1px solid #29a5ff;
    }

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
    position: relative;
  }
  .btn_group {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    transition: all 0.3s ease;
    opacity: 0;
    background: #1a2027;
  }
  .droparea:hover .btn_group,
  .section-sibling:hover + .btn_group {
    opacity: 1;
  }

  .btn_group button {
    padding: 5px;
    min-width: auto;
  }

  .btn_group button svg {
    width: 16px;
    height: 16px;
  }
  .droparea .btn_group {
    left: 50%;
    right: auto;
    margin-left: -60px;
    top: -26px;
  }
  .dragger {
    cursor: move;
  }
`;
