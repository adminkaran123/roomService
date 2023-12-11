import { styled, Stack, TextField } from "@mui/material";

export const Wrapper = styled(Stack)`
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  .stripe_form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    .input {
      margin-bottom: 20px;
    }
  }
  .end_screen_data {
    min-height: calc(100vh - 290px);
    display: flex;
    align-items: center;
    justify-content: center;
    justify-items: center;
    align-content: center;
    cursor: pointer;
  }

  .end_screen_data .rich_text {
    height: auto;
    width: 100%;
  }
  min-height: 500px;
  padding: 0px;
  height: calc(100vh - 160px);
  border-radius: 6px;

  padding-bottom: 100px;
  overflow-y: auto;
  position: relative;
  &.mobile {
    .droparea {
      width: 100% !important;
    }
    .layout-box {
      .layout-inner {
        display: block;
      }
    }
  }
  .layout-box {
    margin: 0 auto 2px;
    width: 100%;
    .section-sibling {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border: 1px dashed rgb(81, 111, 144);

      cursor: move;
      &:hover {
        border: 1px solid #777cf0;
      }
    }
    .layout-inner {
      width: 100%;
      margin: 0 auto;
      display: flex;
    }
    &.preview {
      cursor: none;
    }
  }
  .droparea {
    display: flex;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 4px;
    color: rgb(124, 152, 182);
    border: 1px solid transparent;
    position: relative;
    padding: 24px 20px;
    text-align: center;
    position: relative !important;
    cursor: move;
    .column_label {
      background-color: rgb(245, 248, 250);
      border: 1px dashed rgb(81, 111, 144);
      padding: 20px;
    }
    &:not(.preview):hover {
      border: 1px solid #777cf0;
    }
    &.no-data {
      min-height: calc(100vh - 285px);
      display: flex;
      align-items: center;
      vertical-align: middle;
      justify-content: center;
      color: #333333;
      border: none !important;
      h4 {
        background: rgba(0, 0, 0, 0.2);
        padding: 20px;
        font-size: 22px;
      }
      &.preview {
        cursor: none;
      }
    }

    .resizer {
      width: 10px;
      height: 10px;
      background: transparent;
      position: absolute;
      width: 50px;
      height: 100%;
      left: 0;
      top: 0;
      cursor: ew-resize;
      border: none;
    }

    .resizer.right {
      left: auto;
      right: 0;
      right: -25px;
      z-index: 11;
    }
    &:last-child {
      .resizer.right {
        display: none;
      }
    }
  }
  .layout-box {
    display: flex;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
  }
  .btn_group {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    transition: all 0.3s ease;
    opacity: 0;
    background: #ffffff;
  }
  .droparea:hover .btn_group,
  .section-sibling:hover .btn_group,
  .btn_group:hover {
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
    top: 0px;
  }
  .dragger {
    cursor: move;
  }
  .Mui-focused {
    color: ${(props) =>
      //@ts-ignore
      props?.borderFocusedColor}!important;

    fieldset {
      border-color: ${(props) =>
        //@ts-ignore
        props?.borderFocusedColor}!important;
    }
  }
  .MuiFilledInput-root.MuiFilledInput-underline:after,
  .MuiInput-underline:after {
    border-color: ${(props) =>
      //@ts-ignore
      props?.borderFocusedColor}!important;
  }
  .date-picker button svg {
    fill: ${(props) => props?.borderColor};
  }
  fieldset,
  .MuiFilledInput-root.MuiFilledInput-underline:before,
  .MuiInput-underline:before {
    border-color: ${(props) => props?.borderColor};
  }

  .MuiInputBase-root.MuiInput-root.MuiInput-underline:hover:before,
  .MuiInputBase-root.MuiOutlinedInput-root:hover fieldset {
    border-color: ${(props) =>
      //@ts-ignore
      props?.borderHoverColor};
  }
  .MuiSwitch-switchBase,
  .MuiButtonBase-root.MuiRadio-root {
    color: ${(props) =>
      //@ts-ignore
      props?.checkedColor};
  }
  .MuiSwitch-track {
    background-color: ${(props) =>
      //@ts-ignore
      props?.checkedColor};
  }
  .MuiSwitch-switchBase.Mui-checked,
  .MuiButtonBase-root.MuiRadio-root.Mui-checked {
    color: ${(props) =>
      //@ts-ignore
      props?.checkedActiveColor};
  }
  .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
    background-color: ${(props) =>
      //@ts-ignore
      props?.checkedActiveColor};
  }

  label {
    color: ${(props) =>
      //@ts-ignore
      props?.labelColor};
  }
  input {
    color: ${(props) =>
      //@ts-ignore
      props?.inputTextColor};
  }
  .form-group {
    text-align: left;
    .MuiFormControl-root {
      width: 100%;
    }
  }

  .module_btn {
    font-weight: normal;
    text-align: left;
    color: #000;
    position: relative;
    // :before {
    //   background: transparent;
    //   content: "";
    //   position: absolute;
    //   top: 0;
    //   width: 100%;
    //   height: 100%;
    //   z-index: 11;
    // }
    .MuiInputLabel-asterisk,
    .red {
      color: red;
    }
  }

  .step-header {
    padding: 0 20px 20px;
    position: relative;
    button {
      min-width: 50px;
      height: 50px;
      background: #fff;
      display: inline-block;
      border-radius: 50%;
      line-height: 50px;
      text-align: center;
      font-size: 23px;
      border: none;
      padding: 0;
      position: relative;
      z-index: 1;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      overflow: hidden;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      padding-bottom: 50px;
    }
    p {
      white-space: nowrap;
      margin: 0 0 10px;
    }
    .connecting-line {
      height: 2px;
      background: #e0e0e0;
      position: absolute;
      width: calc(100% - 52px);
      bottom: 93px;
      left: 0;
      right: 0;
      z-index: 1;
      margin-left: 20px;
    }

    li {
      position: relative;
      padding-top: 20px;
      margin: 0;

      &:before {
        content: "";
        background: ${(props) =>
          //@ts-ignore
          props?.step_active_bg};
        height: 4px;
        width: 0;
        position: absolute;
        bottom: 23px;
        z-index: 1;
        left: 0;
        transition: all 0.3s ease;
      }
      &.completed:before {
        width: 100%;
      }

      &.completed.last:before {
        width: calc(100% + 30px);
      }
      &.end-screen-step {
        position: absolute;
        right: 20px;
        bottom: 70px;
        text-align: right;
      }
      &.free-width {
        min-width: 200px;
        &.end-screen {
          padding-left: 25px;
        }
      }
    }
  }
  &.with_sidebar_steps {
    padding-left: 300px;
    padding-top: 10px;
    .inner_wrap {
      height: 100%;
    }
    .step-form-content {
      height: 100%;
      border-radius: 5px;
    }

    .step-header {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 300px;
      ul {
        display: block;
        padding: 0;
        li {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          padding: 0 0 20px;
          width: 100% !important;
          justify-content: flex-end;
          &.end-screen-step {
            padding-bottom: 0;
            position: relative;
            bottom: 0;
            left: 0;
            text-align: left;
            flex-direction: row-reverse;
            width: 100%;
            right: auto;
            justify-content: flex-end;
            align-items: center;
          }
          &:before {
            display: none;
          }
        }
      }
      p {
        padding-left: 10px;
        margin: 0;
      }
      button {
        min-width: 40px;
        min-height: 40px;
        height: 30px;
        width: 30px;
        line-height: 30px;
      }
    }
    .connecting-line {
      width: 4px !important;
      height: calc(100% - 20px);
      left: 19px;
      top: 0;
    }
  }
  &.mobile {
    .step-header li:not(.active) {
      display: none;
    }

    .step-header li {
      margin: 0 auto;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: center;
    }

    .connecting-line {
      display: none;
    }

    .step-header button {
      margin-right: 11px;
    }

    .step-header p {
      margin: 0;
    }
  }
`;

export const DrawerContent = styled(Stack)`
  width: 400px;
  padding: 40px 20px 20px;

  .quill {
    color: #000;
    font-size: 16px;
  }
  .input-prp-wrap {
    width: 100%;
  }

  .input-prp-wrap .MuiFormControl-root {
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const MaxwidthWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0 10px;
  .content-center {
    width: 45%;
    height: 100px;
    border: 1px solid #333333;
    text-align: center;
    padding: 10px 20px;
    flex-direction: column;
  }

  .content-center .center-box {
    height: 50px;
    border: 1px solid #333333;
    margin: 0 auto;
    margin-bottom: 7px;
    padding: 5px;
    width: 100%;
  }

  .content-center p {
    margin: 0;
    font-size: 14px;
  }

  .content-center .center-box .filled {
    background: #28a5ff;
    width: 80%;
    height: 35px;
    margin: 0 auto;
  }

  .full-box {
    height: 50px;
    background: #28a5ff;
    margin: 0 auto;
    margin-bottom: 7px;
    padding: 5px;
    width: 100%;
  }
  .max-width-box {
    width: 130px;
    margin: 20px auto 0;
  }
`;

export const CustomDrawer = styled(Stack)`
  position: fixed;
  width: 400px;
  background: #ffffff;
  right: 0;
  z-index: 99;
  height: 100vh;
  top: 60px;
  transform: translateX(100%);
  transition: all 0.3s ease;
  border-left: 1px solid #ccc;
  padding: 40px 0 0;

  overflow-y: auto;
  height: calc(100vh - 60px);
  overflow-x: hidden;
  &.open {
    transform: translateX(0%);
  }
`;
