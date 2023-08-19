import { Stack, styled } from "@mui/material";
export const Wrapper = styled(Stack)`
  padding-top: 90px;
  display: flex;
  flex-direction: row;
  .prrview_settings {
    width: 300px;
    padding: 0 20px;
  }

  .sidebar_footer {
    position: absolute;
    bottom: 10px;
    background: #fff;
    border-radius: 10px;
    height: 50px;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    left: 30px;
    right: auto;
    z-index: 1;
    justify-content: flex-end;
    display: flex;
    &.right {
      justify-content: flex-start;
      right: 30px;
      left: auto;
      button {
        transform: rotate(180deg);
      }
    }
  }
  .form-area {
    width: calc(100% - 300px);
    padding: 0 30px;
    transition: all 0.3s ease;
    position: relative;
  }

  &.slide-left-remove .sidebar.left {
    min-width: 0;
    width: 0;
  }

  &.slide-left-remove.slide-right-remove .form-area {
    width: 100%;
  }

  &.slide-right-remove .sidebar.right {
    min-width: 0;
    width: 0;
  }
`;

export const ContentBox = styled(Stack)`
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14);
  border-radius: 6px;
  position: relative;

  .form_footer {
    position: absolute;
    bottom: 0;
    background: #000;
    width: 100%;
    padding: 20px;
    left: 0;
    right: 0;
    button svg {
      width: 15px;
      height: 15px;
    }

    .next_btn svg {
      margin-left: 9px;
    }

    .back_btn {
      margin-right: 20px;
    }

    .back_btn svg {
      margin-right: 5px;
    }

    display: flex;
    &.mobile {
      width: 400px;
      margin: 0 auto;
    }
  }
`;
