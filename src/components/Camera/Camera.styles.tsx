import { styled, Stack } from "@mui/material";

export const CameraWrapper = styled(Stack)`
  .icon_wrapper {
    width: 150px;
    height: 150px;
    margin: 0 auto 20px;
    background: #ccc;
    border-radius: 50%;
    padding: 21px;
    position: relative;
    overflow: hidden;
    align-items: center;
    display: flex;
    svg {
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      object-fit: cover;
      object-position: center center;
    }
  }
`;
