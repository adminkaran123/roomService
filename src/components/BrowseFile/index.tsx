import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import ImageIcon from "@mui/icons-material/Image";
import DescriptionIcon from "@mui/icons-material/Description";
import { UiService } from "../../services";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  themeSetting: any;
  module: any;
}

const BrowseFile: React.FC<FileUploadProps> = ({
  onFileUpload,
  themeSetting,
  module,
}) => {
  const { uploadImage, getImages, uiRef } = UiService();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const imageFile = acceptedFiles.find((file) =>
        file.type.startsWith("image/")
      );

      // If it's an image, show the preview
      if (imageFile) {
        const previewURL = URL.createObjectURL(imageFile);
        setImagePreview(previewURL);
      } else {
        // If it's not an image, reset the preview
        setImagePreview(null);
      }

      // Set the name of the selected file
      setSelectedFileName(acceptedFiles[0]?.name || null);

      // Call the parent component's callback with the accepted files
      onFileUpload(acceptedFiles);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: module.allowedFormats,
  });

  return (
    <>
      <Typography variant="body1" style={{ color: themeSetting.labelColor }}>
        {module.label}
      </Typography>
      <Box
        {...getRootProps()}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: `2px dashed ${themeSetting.borderColor}`,
          color: themeSetting.labelColor,
          borderRadius: "10px",
          padding: "20px",
          cursor: "pointer",
          outline: "none",

          "&:hover": {
            borderColor: themeSetting.borderHoverColor,
            color: themeSetting.borderHoverColor,
          },
          "&:focus": {
            borderColor: themeSetting.borderFocusedColor,
          },
        }}
      >
        <input {...getInputProps()} accept={module.allowedFormats} />

        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "150px",
                marginBottom: "10px",
              }}
            />
            {selectedFileName && (
              <Typography
                variant="body2"
                style={{ color: themeSetting.labelColor }}
              >
                {selectedFileName}
              </Typography>
            )}
          </>
        ) : (
          <>
            {selectedFileName && (
              <Typography
                variant="body2"
                style={{ color: themeSetting.labelColor }}
              >
                {selectedFileName}
              </Typography>
            )}
            {isDragActive ? (
              <>
                <ImageIcon
                  sx={{
                    fontSize: 48,
                    marginTop: "10px",
                    color: themeSetting.labelColor,
                  }}
                />
                <Typography>
                  {module.browseTitle || "Drag & drop any file here"}
                </Typography>
              </>
            ) : (
              <>
                <CloudUploadIcon
                  sx={{
                    fontSize: 48,
                    marginTop: "10px",
                    color: themeSetting.labelColor,
                  }}
                />
                <Typography marginBottom="5px">
                  {module.browseTitle || "Drag & drop any file here"}
                </Typography>
                <label className="label">
                  {" "}
                  or{" "}
                  <span className="browse-files">
                    {" "}
                    <span
                      className="browse-files-text"
                      style={{
                        fontWeight: "bold",
                        color: "blue",
                      }}
                    >
                      browse file
                    </span>{" "}
                    <span>from device</span>{" "}
                  </span>{" "}
                </label>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default BrowseFile;
