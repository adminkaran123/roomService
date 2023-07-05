import React from "react";
import {
  Grid,
  Typography,
  IconButton,
  Stack,
  AppBar,
  Toolbar,
  CssBaseline,
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

import useFormBuilder from "./FormBuilder.hooks";

export default function FormBuilder() {
  const {
    color,
    handleChangeComplete,
    openMedia,
    setOpenMedia,
    moduleAnchorElement,
    showModuleArrowPopover,
    onArrowModulePopoverClose,
    onModuleFilterClick,
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
                <Typography>Form Content</Typography>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Stack>
            </ContentBox>
          </Grid>
          <Grid item xs={7}>
            <ContentBox style={{ backgroundColor: color }}>
              <FormEditor />
            </ContentBox>
          </Grid>
          <Grid item xs>
            <ContentBox>
              <Stack direction="row" justifyContent="flex-end">
                <IconButton
                  title="Background Image"
                  size="large"
                  onClick={() => {
                    setOpenMedia(true);
                  }}
                >
                  <WallpaperIcon />
                </IconButton>
                <IconButton
                  title="Background Color"
                  size="large"
                  onClick={onModuleFilterClick}
                >
                  <ColorLensIcon />
                </IconButton>
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
        id={"filter_list_module"}
        anchorEl={moduleAnchorElement}
        open={showModuleArrowPopover}
        handleOnPopoverClose={onArrowModulePopoverClose}
        isDark={false}
        showArrow={false}
        content={
          <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
        }
      />
    </>
  );
}
