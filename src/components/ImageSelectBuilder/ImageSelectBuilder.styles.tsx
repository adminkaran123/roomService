import { styled, Stack } from "@mui/material";

export const SelectWrapper = styled(Stack)`
  .add_option {
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    flex-direction: revert;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .slide_name {
      padding-right: 60px;
      position: relative;
      button {
        position: absolute;
        right: 0;
        &.save_btn {
          right: 25px;
        }
        &.edit_btn {
          right: 25px;
          top: -6px;
        }
        input {
          width: 200px;
        }
      }
    }

    button {
      color: #000;
    }
  }
  .edit_box {
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #ccc;
  }
`;
