import { Stack, styled } from "@mui/material";
export const Wrapper = styled(Stack)`
  .form-area {
    width: 100%;
    padding: 0 0px;
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
  position: relative;

  .form_footer {
    position: absolute;
    bottom: 0;
    background: #000;
    border-radius: 0 0 6px 6px;
    width: 100%;
    padding: 20px;
    left: 0;
    right: 0;
    z-index: 11;
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
      margin: 0 auto;
      position: relative;
      border-radius: 0 0 36px 36px;
      padding-left: 20px;
      padding-right: 20px;
      width: 330px;
      margin: 0 auto;
    }
  }
`;
