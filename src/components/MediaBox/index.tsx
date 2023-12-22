import * as React from "react";

import { MediaWraper } from "./MediaBox.styles";
import {
  Button,
  Typography,
  Modal,
  DialogProps,
  SvgIcon,
  Tab,
  Tabs,
  Stack,
} from "@mui/material";
import CustomModal from "../CustomModal";
import useMediaBox from "./MediaBox.hooks";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

import DeleteIcon from "@mui/icons-material/Delete";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import { API_URL } from "../../utils/constants/constants";

interface Props extends DialogProps {
  handleClose: any;
  open: boolean;
  handleSelectImage: any;
}

export default function MediaBox(props: Props) {
  const { handleClose, open, handleSelectImage } = props;
  const { uploadImage, images, handleTabChange, activeTab, handleIamgeDelete } =
    useMediaBox(open);
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <MediaWraper>
        <TabContext value={activeTab}>
          <TabList
            onChange={handleTabChange}
            textColor="inherit"
            variant="fullWidth"
          >
            <Tab label="Uploaded Images" value="1" />
            <Tab label="Gallery" value="2" />
          </TabList>

          <TabPanel value="1" className="media_panel">
            <Stack
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              marginBottom="10px"
            >
              <Typography variant="h5">Images</Typography>
              <Button
                component="label"
                htmlFor="upload_media"
                variant="outlined"
              >
                Upload Image
              </Button>
            </Stack>
            {images.length === 0 ? (
              <label htmlFor="upload_media" className="upload_box">
                <ImageSearchIcon />

                <span>Choose image file to upload</span>
              </label>
            ) : (
              <div className="gallery-box">
                {images.map((img: any) => {
                  return (
                    <Button
                      className="gallery-item"
                      key={img._id}
                      onClick={() => {
                        handleSelectImage(img.url);
                        handleClose();
                      }}
                    >
                      <button
                        className="delete_icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleIamgeDelete(img._id);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                      <img src={img.url} />
                    </Button>
                  );
                })}
              </div>
            )}
          </TabPanel>
          <TabPanel value="2" className="media_panel">
            <div className="gallery-box">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((img: any) => {
                return (
                  <Button
                    className="gallery-item"
                    key={img}
                    onClick={() => {
                      handleSelectImage(
                        "https://formmaker.co.in/images/bg/image" + img + ".jpg"
                      );
                      handleClose();
                    }}
                  >
                    <img
                      src={
                        "https://formmaker.co.in/images/bg/image" + img + ".jpg"
                      }
                    />
                  </Button>
                );
              })}
            </div>
          </TabPanel>
        </TabContext>
        <input
          type="file"
          id="upload_media"
          accept="image/*"
          onChange={uploadImage}
          style={{ display: "none" }}
        />
      </MediaWraper>
    </CustomModal>
  );
}
