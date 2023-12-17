import { styled, Stack } from "@mui/material";

export const ImageWrapper = styled(Stack)`
  .select_image svg {
    width: 100px;
    height: 100px;
    fill: #ccc;
    margin: 0 auto;
    display: block;
  }

  .select_image {
    height: 100%;
  }
  .module_image_box img {
    max-width: 100%;
  }

  .module_image_box {
    width: 100%;
    text-align: center;
  }
`;
