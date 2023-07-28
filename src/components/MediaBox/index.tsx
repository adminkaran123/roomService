import * as React from "react";

import { MediaWraper } from "./MediaBox.styles";
import { Button, Typography, Modal, DialogProps, SvgIcon } from "@mui/material";
import CustomModal from "../CustomModal";
import useMediaBox from "./MediaBox.hooks";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

interface Props extends DialogProps {
  handleClose: any;
  open: boolean;
}

export default function MediaBox(props: Props) {
  const { handleClose, open } = props;
  const { uploadImage } = useMediaBox();
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <MediaWraper>
        <Typography variant="h5">ADD MEDIA</Typography>
        <label htmlFor="upload_media" className="upload_box">
          <ImageSearchIcon />
          <input
            type="file"
            id="upload_media"
            accept="image/*"
            onChange={uploadImage}
          />
          <span>Choose Image File to Upload</span>
        </label>
      </MediaWraper>
    </CustomModal>
  );
}
