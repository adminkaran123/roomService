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
  FormControl,
  InputLabel,
  Select,
  Tab,
  Tabs,
  Box,
  MenuItem,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ContentBox, Wrapper } from "./FormBuilder.styles";
import { InputTypes } from "../../utils/constants/constants";
import DeleteIcon from "@mui/icons-material/Delete";

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
import HubspotFileds from "../../components/HubspotFileds";
import Builder from "../../components/Builder";

export default function FormBuilder() {
  const {
    color,
    handleChangeComplete,
    openMedia,
    setOpenMedia,
    colorAnchorElement,
    showColorArrowPopover,
    onArrowColorPopoverClose,
    handleTabChange,
    columnDrag,
    activeTab,
    setColor,
    layoutDrag,
    handleThemeSettings,
    fieldSetting,
    activeSlide,
    layoutData,
    addSlide,
    changeActiveSlide,
    deleteSlide,
  } = useFormBuilder();
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar className="toolbar">
          <IconButton
            component={Link}
            to="/dashbaord"
            size="small"
            disableRipple
          >
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
                padding="20px"
              >
                <Typography>Form Slides</Typography>

                <Button variant="outlined" onClick={addSlide}>
                  <AddIcon />
                  <Typography>Add Slide</Typography>
                </Button>
              </Stack>
              {layoutData?.map((layout: any, index: number) => {
                return (
                  <Button
                    className={`slide_btn ${
                      activeSlide === index ? "active" : ""
                    }`}
                    onClick={() => {
                      changeActiveSlide(index);
                    }}
                  >
                    <div className="slide_box"></div>
                    Slide {index + 1}
                    <Button
                      color="error"
                      className="delete_btn"
                      onClick={(e) => {
                        deleteSlide(e, index);
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Button>
                );
              })}
            </ContentBox>
          </Grid>
          <Grid item xs={7}>
            <ContentBox style={{ backgroundColor: color }}>
              {/* <BuilderLayout /> */}
              <Builder />
              {/* <FormEditor /> */}
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
                    <Tab label="HS Feilds" value="1" />
                    <Tab label="Content" value="2" />
                    <Tab label="Theme" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <HubspotFileds columnDrag={columnDrag} />
                </TabPanel>
                <TabPanel value="2">
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
                      draggable
                      onDragStart={(event) => {
                        layoutDrag(event, { type: "layout", column: 1 });
                      }}
                    >
                      <div className="layout_box one">
                        <span></span>
                      </div>
                      <Typography variant="h6">1</Typography>
                    </Card>
                    <Card
                      component={Button}
                      className="extra_item layout_option"
                      draggable
                      onDragStart={(event) => {
                        layoutDrag(event, { type: "layout", column: 2 });
                      }}
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
                      draggable
                      onDragStart={(event) => {
                        layoutDrag(event, { type: "layout", column: 3 });
                      }}
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
                      draggable
                      onDragStart={(event) => {
                        layoutDrag(event, {
                          type: "layout",
                          column: 2,
                          leftSmall: true,
                        });
                      }}
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
                      draggable
                      onDragStart={(event) => {
                        layoutDrag(event, {
                          type: "layout",
                          column: 2,
                          rightSmall: true,
                        });
                      }}
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
                      draggable
                      onDragStart={(event) => {
                        layoutDrag(event, {
                          type: "layout",
                          column: 4,
                        });
                      }}
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
                <TabPanel value="3">
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

                    <ColorBox
                      color={color}
                      onChangeComplete={handleChangeComplete}
                      label="Background Color:"
                      setColor={setColor}
                    />
                    <Typography variant="h3">Form Style</Typography>
                    <FormControl fullWidth>
                      <InputLabel>Select Input Type</InputLabel>
                      <Select
                        //value={age}
                        label="Select Input Type"
                        onChange={(e) => {
                          handleThemeSettings("type", e.target.value);
                        }}
                        value={fieldSetting.type}
                      >
                        {InputTypes?.map((item: any, index: number) => {
                          return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <ColorBox
                      color={fieldSetting.inputTextColor}
                      onChangeComplete={handleChangeComplete}
                      label="Input Text Color:"
                      setColor={(color: string) => {
                        handleThemeSettings("inputTextColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Input Label Color:"
                      color={fieldSetting.labelColor}
                      setColor={(color: any) => {
                        handleThemeSettings("labelColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Input Border Color:"
                      color={fieldSetting.borderColor}
                      setColor={(color: any) => {
                        handleThemeSettings("borderColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Input Border Focused Color:"
                      color={fieldSetting.borderFocusedColor}
                      setColor={(color: any) => {
                        handleThemeSettings("borderFocusedColor", color);
                      }}
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
