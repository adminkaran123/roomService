import { styled, Stack, TextField } from "@mui/material";

export const Wrapper = styled(Stack)`
  min-height: 400px;
  padding: 20px;

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
        border: 1px solid #29a5ff;
      }
    }
    .layout-inner {
      width: 100%;
      margin: 0 auto;
      display: flex;
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
    background: #1a2027;
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
    top: -26px;
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
  .MuiTextField-root {
    width: 100%;
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
  .select_image svg {
    width: 100px;
    height: 100px;
    fill: #28a5ff;
  }

  .select_image {
    height: 100%;
  }
  .module_image_box img {
    max-width: 100%;
  }

  .module_image_box {
    width: 100%;
  }
  .module_btn {
    font-weight: normal;
    text-align: left;
    color: #000;
  }
`;

export const DrawerContent = styled(Stack)`
  width: 400px;
  padding: 40px 20px 20px;
  .image_box {
    width: 200px;
    margin: 0 auto;
    position: relative;
    .close_btn {
      position: absolute;
      right: 0;
      background: #3d3838;
      padding: 0;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      min-width: auto;
      right: -15px;
      top: -15px;
    }
  }
`;

export const MaxwidthWrapper = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0 10px;
  .content-center {
    width: 45%;
    height: 100px;
    border: 1px solid #fff;
    text-align: center;
    padding: 10px 20px;
    flex-direction: column;
  }

  .content-center .center-box {
    height: 50px;
    border: 1px solid #fff;
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
