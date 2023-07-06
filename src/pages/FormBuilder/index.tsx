import React from "react";
import {
  Grid,
  Typography,
  IconButton,
  Stack,
  AppBar,
  Toolbar,
  CssBaseline,
  Button,
} from "@mui/material";
import { ContentBox, Wrapper } from "./FormBuilder.styles";

import AddIcon from "@mui/icons-material/Add";
import FormEditor from "../../components/Editor";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MediaBox from "../../components/MediaBox";
import ArrowPopover from "../../components/arrowPopover/ArrowPopover";
import { SketchPicker } from "react-color";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

import useFormBuilder from "./FormBuilder.hooks";

export default function FormBuilder() {
  const {
    color,
    handleChangeComplete,
    openMedia,
    setOpenMedia,
    colorAnchorElement,
    showColorArrowPopover,
    onArrowColorPopoverClose,
    onColorFilterClick,
    openPropertiesModal,
    setOpenPropertiesModal,
  } = useFormBuilder();
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar className="toolbar">
          <IconButton component={Link} to="/" size="small" disableRipple>
            <ChevronLeftIcon />
            Dashboard
          </IconButton>
        </Toolbar>
      </AppBar>
      <Wrapper sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs>
            <ContentBox>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>Form Slides</Typography>

                <Button variant="outlined">
                  <AddIcon />
                  <Typography>Add Slide</Typography>
                </Button>
              </Stack>
            </ContentBox>
          </Grid>
          <Grid item xs={7}>
            <ContentBox style={{ backgroundColor: color }}>
              <FormEditor
                open={openPropertiesModal}
                handleClose={() => setOpenPropertiesModal(false)}
              />
            </ContentBox>
          </Grid>
          <Grid item xs>
            <ContentBox>
              <Stack spacing={2}>
                <Button
                  title="Background Image"
                  onClick={() => {
                    setOpenMedia(true);
                  }}
                  variant="contained"
                  style={{ color: "#fff" }}
                  size="large"
                >
                  <WallpaperIcon />
                  <Typography marginLeft="10px" fontWeight="bold">
                    Background Image
                  </Typography>
                </Button>
                <Button
                  title="Background Color"
                  onClick={onColorFilterClick}
                  variant="contained"
                  style={{ color: "#fff" }}
                  size="large"
                >
                  <ColorLensIcon />
                  <Typography marginLeft="10px" fontWeight="bold">
                    Background Color
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  style={{ color: "#fff" }}
                  size="large"
                  onClick={() => {
                    setOpenPropertiesModal(true);
                  }}
                >
                  <ViewModuleIcon />
                  <Typography marginLeft="10px">Add Form Elements</Typography>
                </Button>
              </Stack>
            </ContentBox>
          </Grid>
        </Grid>
        <MediaBox
          open={openMedia}
          handleClose={() => {
            setOpenMedia(false);
          }}
        />
      </Wrapper>
      <ArrowPopover
        id={"filter_list_color"}
        anchorEl={colorAnchorElement}
        open={showColorArrowPopover}
        handleOnPopoverClose={onArrowColorPopoverClose}
        isDark={false}
        showArrow={false}
        content={
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        }
      />
    </>
  );
}
