import { Box, styled } from "@mui/material";
export const EditorTextWrapper = styled(Box)`
  &.slide_name {
    min-width: 190px;
    position: relative;
    text-transform: none;
    .MuiFormControl-root {
      width: 100%;
      input {
        padding-right: 60px;
      }
    }
    .save_btn {
      position: absolute;
      right: 27px;
      top: -6px;
    }
    svg {
      fill: #2d2d2d;
    }

    .cancel_btn {
      position: absolute;
      right: 0;
      top: -6px;
      svg {
        fill: rgb(239, 83, 80);
      }
    }
    .slide_name button svg {
      width: 20px;
    }
    .edit_btn {
      position: relative;
      top: -1px;
    }
  }
`;
