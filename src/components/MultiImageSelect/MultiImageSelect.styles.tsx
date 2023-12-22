import { styled, Stack } from "@mui/material";

export const StyledImage = styled("img")`
  width: 100px;
  height: 100px;
`;

export const OptionsWrapper = styled(Stack)`
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      display: inline-block;
      margin: 0 20px 20px 0;
      input {
        display: none;
      }
      label {
        display: block;
        width: 200px;
        border: 1px solid #ccc;

        padding: 10px;
        position: relative;
        cursor: pointer;
        &:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          border: 5px solid
            ${(props) =>
              //@ts-ignore
              props?.checkedActiveColor};
          transition: all 0.3s ease;
          opacity: 0;
        }
        img {
          max-width: 100%;
          height: 100px;
          width: 100%;
          object-fit: contain;
        }
        p {
          margin: 0;
          font-size: 18px;
          color: #333;
          line-height: 1;
        }
      }
    }
    input:checked + label:before {
      opacity: 1;
    }
    .checked {
      position: absolute;
      right: -10px;
      top: -10px;
      background: ${(props) =>
        //@ts-ignore
        props?.checkedActiveColor};
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
      padding: 2px;
      transition: all 0.3s ease;
      scale: 0;
    }

    .checked svg {
      height: 25px;
      width: 25px;
      fill: #fff;
    }
    input:checked + label .checked {
      scale: 1;
    }
  }
  .image-box {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-box svg {
    height: 100px;
    width: 100px;
    color: #333;
  }
`;
