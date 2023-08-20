import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileUploadProps {
  onFileUpload: (files: File[]) => void;
  themeSetting: any;
}

const BrowseImage: React.FC<FileUploadProps> = ({
  onFileUpload,
  themeSetting,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Call the parent component's callback with the accepted files
      onFileUpload(acceptedFiles);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px dashed " + themeSetting.borderColor,
        borderRadius: "4px",
        padding: "20px",
        cursor: "pointer",
        outline: "none",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography
          variant="body1"
          style={{ color: themeSetting.inputTextColor }}
        >
          Drop the files here...
        </Typography>
      ) : (
        <Typography
          variant="body1"
          style={{ color: themeSetting.inputTextColor }}
        >
          Drag 'n' drop some files here, or click to select files
        </Typography>
      )}
      <CloudUploadIcon
        sx={{
          fontSize: 48,
          marginTop: "10px",
          color: themeSetting.inputTextColor,
        }}
      />
    </Box>
  );
};

export default BrowseImage;
