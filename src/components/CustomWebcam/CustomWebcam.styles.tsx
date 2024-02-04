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
    margin: 0 auto;
  }
  .retake_btn,
  .done_btn {
    background: transparent;
    border: none;
    color: #fff;
    display: flex;
    align-items: center;
    font-size: 20px;
    cusor: pointer;
  }

  .retake_btn svg,
  .done_btn svg {
    width: 40px;
    height: 40px;
    margin-right: 4px;
  }
  button.close_btn {
    position: absolute;
    right: 20px;
    top: 20px;
    border-radius: 0;
    background: transparent;
    border: none;
  }

  button.close_btn svg {
    width: 50px;
    height: 50px;
  }
  img.clicked_image {
    height: 600px;
    width: 600px;
    object-fit: contain;
    object-position: center center;
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
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  .switch_camera {
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
  }

  .switch_camera svg {
    width: 35px;
    height: 35px;
  }
  @media (max-width: 767px) {
    video {
      max-width: 100%;
      height: 400px;
    }
    img.clicked_image {
      max-width: 100%;
      height: 400px;
    }
  }
`;
