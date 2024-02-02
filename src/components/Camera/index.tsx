import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, Stack, Typography } from "@mui/material";
import { CameraWrapper } from "./Camera.styles";
import { UiService } from "../../services";

interface CameraProps {
  onFileUpload?: (files: File[]) => void;
  themeSetting: any;
  module: any;
}

export default function Camera(props: CameraProps) {
  const { toggleCamera } = UiService();
  const { module, themeSetting } = props;
  return (
    <CameraWrapper>
      <div className="icon_wrapper">
        <CameraAltIcon />
      </div>
      <Typography variant="h3" textAlign="center">
        {module.cameraTitle || "A photo of you"}
      </Typography>
      <Typography variant="h6" textAlign="center">
        {module.cameraSubtitle || "Clearly shows your face"}
      </Typography>
      <Stack spacing={2} marginTop="20px">
        <Button
          size="large"
          sx={{
            bgcolor: module?.cameraBtnBgColor || "#4fd2c2",
            color: module?.cameraBtnTextColor || "#fff",
            ":hover": {
              bgcolor: module?.cameraBtnActiveBgColor || "#4fd2c2",
              color: module?.cameraBtnActiveTextColor || "#fff",
            },
          }}
          onClick={() => {
            toggleCamera(true);
          }}
        >
          {module.cameraButtonText || "Take a Photo"}
        </Button>
        <Button
          size="large"
          sx={{
            bgcolor: module?.cameraBtnBgColor || "#4fd2c2",
            color: module?.cameraBtnTextColor || "#fff",
            ":hover": {
              bgcolor: module?.cameraBtnActiveBgColor || "#4fd2c2",
              color: module?.cameraBtnActiveTextColor || "#fff",
            },
          }}
        >
          {module.galleryButtonText || "Choose from gallery"}
        </Button>
      </Stack>
    </CameraWrapper>
  );
}
