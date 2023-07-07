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
  Card,
  Tab,
  Tabs,
  Box,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
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
import ImageIcon from "@mui/icons-material/Image";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import useFormBuilder from "./FormBuilder.hooks";
import ColorBox from "../../components/ColorBox";

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
    handleTabChange,
    activeTab,
    setColor,
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
              <TabContext value={activeTab}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    marginBottom: "20px",
                  }}
                >
                  <TabList
                    onChange={handleTabChange}
                    textColor="inherit"
                    variant="fullWidth"
                  >
                    <Tab label="Content" value="1" />
                    <Tab label="Theme Settings" value="2" />
                  </TabList>
                </Box>

                <TabPanel value="1">
                  <Stack spacing={2}>
                    <Button
                      variant="contained"
                      style={{ color: "#fff" }}
                      size="large"
                      onClick={() => {
                        setOpenPropertiesModal(true);
                      }}
                    >
                      <ViewModuleIcon />
                      <Typography marginLeft="10px">
                        Add Form Elements
                      </Typography>
                    </Button>
                  </Stack>
                  <Typography variant="h3" marginTop="20px">
                    Additional Elements
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Card component={Button} className="extra_item">
                      <ImageIcon />
                      <Typography variant="h5">Image</Typography>
                    </Card>
                    <Card component={Button} className="extra_item">
                      <AppRegistrationIcon />
                      <Typography variant="h5">Rich Text</Typography>
                    </Card>
                  </Stack>
                  <Typography variant="h3" marginTop="20px">
                    Layouts
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Card
                      component={Button}
                      className="extra_item layout_option"
                    >
                      <div className="layout_box one">
                        <span></span>
                      </div>
                      <Typography variant="h6">1</Typography>
                    </Card>
                    <Card
                      component={Button}
                      className="extra_item layout_option"
                    >
                      <div className="layout_box two">
                        <span></span>
                        <span></span>
                      </div>
                      <Typography variant="h6">2</Typography>
                    </Card>
                    <Card
                      component={Button}
                      className="extra_item layout_option"
                    >
                      <div className="layout_box three">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <Typography variant="h6">3</Typography>
                    </Card>
                    <Card
                      component={Button}
                      className="extra_item layout_option"
                    >
                      <div className="layout_box left_min">
                        <span></span>
                        <span></span>
                      </div>
                      <Typography variant="h6">1/3 : 2/3</Typography>
                    </Card>
                    <Card
                      component={Button}
                      className="extra_item layout_option"
                    >
                      <div className="layout_box left_max">
                        <span></span>
                        <span></span>
                      </div>
                      <Typography variant="h6">2/3 : 1/3</Typography>
                    </Card>
                    <Card
                      component={Button}
                      className="extra_item layout_option"
                    >
                      <div className="layout_box four">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                      <Typography variant="h6">4</Typography>
                    </Card>
                  </Stack>
                </TabPanel>
                <TabPanel value="2">
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

                    <ColorBox
                      color={color}
                      onChangeComplete={handleChangeComplete}
                      label="Background Color:"
                      setColor={setColor}
                    />
                  </Stack>
                </TabPanel>
              </TabContext>
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
