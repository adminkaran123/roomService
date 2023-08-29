import React from "react";
import { ImageWrapper } from "./ImageBox.styles";
import ImageIcon from "@mui/icons-material/Image";

interface Props {
  module: any;
}

export default function ImageBox(props: Props) {
  const { module } = props;
  return (
    <ImageWrapper>
      <div className="module_image_box">
        {module.url ? (
          <img src={module.url} alt="Image" />
        ) : (
          <div className="select_image">
            <ImageIcon />
          </div>
        )}
      </div>
    </ImageWrapper>
  );
}
