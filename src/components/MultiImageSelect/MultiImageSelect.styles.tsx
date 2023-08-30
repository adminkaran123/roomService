import { styled, Stack } from "@mui/material";

export const StyledImage = styled("img")`
  width: 100px;
  height: 100px;
`;

export const OptionsWrapper = styled(Stack)`
  ul {
    list-style-type: none;
    li {
      display: inline-block;
      margin: 0 10px;
      input {
        display: none;
      }
      label {
        display: block;
        width: 200px;
        border: 1px solid #ccc;
        background: #4fd2c266;
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
          border: 5px solid #777cf0;
          transition: all 0.3s ease;
          opacity: 0;
        }
        img {
          max-width: 100%;
          height: 100px;
          width: 100%;
          object-fit: cover;
        }
        p {
          margin: 0;
          font-size: 18px;
          color: #333;
        }
      }
    }
    input:checked + label:before {
      opacity: 1;
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
