import { styled, Stack } from "@mui/material";

export const CustomWebCamWrapper = styled(Stack)`
  position: fixed;
  top: 0;
  z-index: 99999;
  background: #fff;
  width: 100%;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  overflow-y: auto;
  height: 100%;
  .photo-button {
    width: 50px;
    height: 50px;
    background: transparent;
    border: none;
    position: relative;
  }
  .circle {
    position: absolute;
    top: 12%;
    left: 12%;
    bottom: 12%;
    right: 12%;
    border-radius: 100%;
    background-color: #ffffff;
    opacity: 0;
  }
  .ring {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    border-radius: 100%;
    border: 0.5em solid #ccc;
    opacity: 0.8;
  }
  .photo-button .circle,
  .photo-button .ring {
    transition: all 0.25s;
  }
  .photo-button:hover .circle {
    opacity: 1;
  }
  .photo-button:active .ring {
    opacity: 1;
  }
  .photo-button:active .circle {
    opacity: 0.5;
  }
  .inner-wrapper {
    position: relative;
  }
  .btn-container {
    background: #000;
    padding: 10px;
    text-align: center;
    margin-top: -38px;
    height: 70px;
  }
`;
