import React, { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Button, Stack, Typography } from "@mui/material";
import { CameraWrapper } from "./Camera.styles";
import { UiService } from "../../services";
import CustomWebcam from "../CustomWebcam";

interface CameraProps {
  onFileUpload?: (files: File[]) => void;
  themeSetting: any;
  module: any;
}

export default function Camera(props: CameraProps) {
  const { module, themeSetting } = props;
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // Perform any additional processing or validation if needed
      setImgSrc(URL.createObjectURL(file));
      // if (onFileUpload) {
      //   onFileUpload([file]);
      // }
    }
  };
  const [cameeraOpen, setCameraOpen] = useState(false);
  return (
    <CameraWrapper className="camera_wrapper">
      <div className="icon_wrapper">
        {imgSrc ? <img src={imgSrc} alt="user" /> : <CameraAltIcon />}
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
            setCameraOpen(true);
            setImgSrc(null);
          }}
        >
          {module.cameraButtonText || "Take a Photo"}
        </Button>

        <Button
          size="large"
          component={"label"}
          htmlFor="galleryInput"
          sx={{
            bgcolor: module?.cameraBtnBgColor || "#4fd2c2",
            color: module?.cameraBtnTextColor || "#fff",
            ":hover": {
              bgcolor: module?.cameraBtnActiveBgColor || "#4fd2c2",
              color: module?.cameraBtnActiveTextColor || "#fff",
            },
          }}
        >
          <Typography
            fontWeight="bold"
            sx={{
              color: module?.cameraBtnTextColor || "#fff",
              ":hover": {
                color: module?.cameraBtnActiveTextColor || "#fff",
              },
            }}
          >
            {module.galleryButtonText || "Choose from gallery"}
          </Typography>
        </Button>
      </Stack>
      {cameeraOpen && (
        <CustomWebcam
          setImgSrc={setImgSrc}
          imgSrc={imgSrc}
          setCameraOpen={setCameraOpen}
        />
      )}
      <input
        id="galleryInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileInputChange}
      />
    </CameraWrapper>
  );
}
