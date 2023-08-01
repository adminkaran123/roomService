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
  ButtonGroup,
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
import LaptopIcon from "@mui/icons-material/Laptop";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";

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
import CloseIcon from "@mui/icons-material/Close";
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
    themeSetting,
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
          <Stack direction="row" justifyContent="space-between" width="100%">
            <IconButton
              component={Link}
              to="/dashbaord"
              size="small"
              disableRipple
            >
              <ChevronLeftIcon />
              Dashboard
            </IconButton>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button>
                <LaptopIcon />
              </Button>
              <Button>
                <StayCurrentPortraitIcon />
              </Button>
            </ButtonGroup>
            <Button variant="contained" size="large">
              Save Changes
            </Button>
          </Stack>
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
                    {layoutData.length > 1 && (
                      <Button
                        color="error"
                        className="delete_btn"
                        onClick={(e) => {
                          deleteSlide(e, index);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    )}
                  </Button>
                );
              })}
            </ContentBox>
          </Grid>
          <Grid item xs={7}>
            <ContentBox
              style={{
                backgroundColor: themeSetting.background,
                backgroundImage: "url(" + themeSetting.bgImage + ")",
              }}
            >
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
                    <Card
                      component={Button}
                      className="extra_item"
                      draggable
                      onDragStart={(event) => {
                        columnDrag(event, {
                          type: "image",
                          fieldType: "image",
                          url: "",
                        });
                      }}
                    >
                      <ImageIcon />
                      <Typography variant="h5">Image</Typography>
                    </Card>
                    <Card
                      component={Button}
                      className="extra_item"
                      draggable
                      onDragStart={(event) => {
                        columnDrag(event, {
                          type: "rich_text",
                          fieldType: "rich_text",
                          content:
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
                        });
                      }}
                    >
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
                    {Boolean(themeSetting.bgImage) && (
                      <div className="image_box">
                        <Button
                          className="close_btn"
                          onClick={() => {
                            handleThemeSettings("bgImage", "");
                          }}
                        >
                          <CloseIcon />
                        </Button>
                        <img src={themeSetting.bgImage} width="200px" />
                      </div>
                    )}
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
                      setColor={(color: any) => {
                        handleThemeSettings("background", color);
                      }}
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
                        value={themeSetting.type}
                      >
                        {InputTypes?.map((item: any, index: number) => {
                          return (
                            <MenuItem value={item.value}>{item.label}</MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <ColorBox
                      color={themeSetting.inputTextColor}
                      onChangeComplete={handleChangeComplete}
                      label="Input Text Color:"
                      setColor={(color: string) => {
                        handleThemeSettings("inputTextColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Input Label Color:"
                      color={themeSetting.labelColor}
                      setColor={(color: any) => {
                        handleThemeSettings("labelColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Input Border Color:"
                      color={themeSetting.borderColor}
                      setColor={(color: any) => {
                        handleThemeSettings("borderColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Input Border Focused Color:"
                      color={themeSetting.borderFocusedColor}
                      setColor={(color: any) => {
                        handleThemeSettings("borderFocusedColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Input Border Hover Color:"
                      color={themeSetting.borderHoverColor}
                      setColor={(color: any) => {
                        handleThemeSettings("borderHoverColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Checked and Radio  Color:"
                      color={themeSetting.checkedColor}
                      setColor={(color: any) => {
                        handleThemeSettings("checkedColor", color);
                      }}
                    />
                    <ColorBox
                      onChangeComplete={handleChangeComplete}
                      label="Checked and Radio Active  Color:"
                      color={themeSetting.checkedActiveColor}
                      setColor={(color: any) => {
                        handleThemeSettings("checkedActiveColor", color);
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
          handleSelectImage={(url: any) => {
            handleThemeSettings("bgImage", url);
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
