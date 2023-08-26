import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Call the parent component's callback with the accepted files
      onFileUpload(acceptedFiles);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      [module.allowedFormats]: [],
    },
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px dashed " + themeSetting.borderColor,
        color: themeSetting.labelColor,
        borderRadius: "4px",
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

      <Typography variant="body1" style={{ color: themeSetting.labelColor }}>
        {module.label}
      </Typography>

      <CloudUploadIcon
        sx={{
          fontSize: 48,
          marginTop: "10px",
          color: themeSetting.labelColor,
        }}
      />
    </Box>
  );
};

export default BrowseFile;
