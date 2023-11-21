import { styled, Stack, TextField } from "@mui/material";

export const Wrapper = styled(Stack)`
  max-width: calc(100% - 160px);
  width: 100%;
  margin-left: 140px;
  padding: 0 20px;
  border: 1px solid #ccc;
  .clc_iten {
    h2 {
      text-align: center;
    }
  }
  .accordian_item {
    display: flex;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-top: 1px solid #ccc;
  }

  .option_name {
    width: 200px;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    width: calc(100% - 210px);
  }

  .option_opreator {
    width: 150px;
    margin-right: 10px;
  }

  .option_opreator .MuiInputBase-root {
    width: 100%;
  }

  .option_value {
    width: 100px;
  }

  .accordian_item_wrapper,
  .content-box {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 600px;
    margin: 0 auto 20px;
  }
  .multple-box {
    padding: 10px;
  }
  .accordian_title {
    padding: 10px;
    font-weight: bold;
    font-size: 20px;
    border: none;
    display: block;
    background: transparent;
    cursor: pointer;
    width: 100%;
    text-align: left;
    position: relative;
    line-height: 1.2;
    &:before,
    &:after {
      content: "";
      position: absolute;
      height: 15px;
      background: #000;
      position: absolute;
      right: 21px;
      width: 3px;
      top: 50%;
      margin-top: -6px;
      transition: all 0.3s ease;
    }

    &:before {
      transform: rotate(90deg);
    }
    &.active:after {
      transform: rotate(90deg);
    }
  }
`;
