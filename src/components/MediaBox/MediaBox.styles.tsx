import { styled, Stack } from "@mui/material";

export const MediaWraper = styled(Stack)`
  h5 {
    margin-bottom: 10px;
  }
  .upload_box {
    width: 100%;
    height: 200px;
    border: 2px dotted #333333;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;
  }

  .upload_box input {
    display: none;
  }

  .upload_box svg {
    width: 80px;
    height: 80px;
  }
  .media_panel {
    padding: 10px 0;
  }
  .gallery-box {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .gallery-box .delete_icon {
    position: absolute;
    right: 0;
    top: 0;
    color: red;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  .gallery-item {
    width: 33.3%;
    border: 5px solid transparent;
  }

  .gallery-item img {
    width: 100%;
    width: 100%;
    height: 80px;
    object-fit: cover;
    object-position: center center;
  }
`;
