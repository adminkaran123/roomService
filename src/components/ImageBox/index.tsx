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
        {module?.imageProps?.url ? (
          <img
            src={module?.imageProps?.url}
            alt="Image"
            width={
              module?.imageProps?.fullWidth
                ? "100%"
                : module?.imageProps?.width + "px"
            }
            height={
              module?.imageProps?.fullWidth
                ? "100%"
                : module?.imageProps?.height + "px"
            }
          />
        ) : (
          <div className="select_image">
            <ImageIcon />
          </div>
        )}
      </div>
    </ImageWrapper>
  );
}
