// @ts-nocheck
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
  TextField,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ContentBox, Wrapper, SidebarBox } from "./StepForm.styles";
import { InputTypes } from "../../../utils/constants/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import LaptopIcon from "@mui/icons-material/Laptop";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import { Container, Draggable } from "react-smooth-dnd";

import AddIcon from "@mui/icons-material/Add";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { Link } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MediaBox from "../../../components/MediaBox";
import ArrowPopover from "../../../components/arrowPopover/ArrowPopover";
import { SketchPicker } from "react-color";
import ImageIcon from "@mui/icons-material/Image";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import useFormBuilder from "./StepForm.hooks";
import ColorBox from "../../../components/ColorBox";
import HubspotFileds from "../../../components/HubspotFileds";
import Builder from "../../../components/Builder";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

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
    sidebarLeft,
    setSidebarLeft,
    sidebarRight,
    setSidebarRight,
    handleSlideDrop,
    activeMode,
    setActiveMode,
    handleFormCreate,
    formName,
    setFormName,
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
              Step Forms
            </IconButton>
            <TextField
              placeholder="Your form name"
              value={formName}
              onChange={(e: any) => {
                setFormName(e.target.value);
              }}
              className="name_input"
              variant="standard"
            />
            <Stack direction="row" spacing={2}>
              <Button variant="outlined">
                <VisibilityRoundedIcon
                  style={{ width: "30px", height: "30px" }}
                />
              </Button>
              <Button
                variant="contained"
                size="large"
                onClick={handleFormCreate}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Wrapper
        sx={{ flexGrow: 1 }}
        className={`${sidebarLeft ? "slide-left-remove" : ""} ${
          sidebarRight ? "slide-right-remove" : ""
        }`}
      >
        <div className={`sidebar left `}>
          <SidebarBox>
            <div className="scroll-box">
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

              <Container lockAxis="y" onDrop={handleSlideDrop}>
                {layoutData?.map((layout: any, index: number) => {
                  return (
                    //@ts-ignore
                    <Draggable key={index}>
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
                    </Draggable>
                  );
                })}
              </Container>
            </div>
          </SidebarBox>
        </div>
        <div className="form-area">
          <ContentBox>
            {/* <BuilderLayout /> */}
            <Builder activeMode={activeMode} />
            {/* <FormEditor /> */}
          </ContentBox>

          <Stack justifyContent="center" direction="row" marginTop="20px">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                variant={activeMode == "desktop" ? "contained" : "outlined"}
                onClick={() => {
                  setActiveMode("desktop");
                }}
              >
                <LaptopIcon />
              </Button>
              <Button
                variant={activeMode == "mobile" ? "contained" : "outlined"}
                onClick={() => {
                  setActiveMode("mobile");
                }}
              >
                <StayCurrentPortraitIcon />
              </Button>
            </ButtonGroup>
          </Stack>
          <div className="sidebar_footer">
            <Button onClick={() => setSidebarLeft(!sidebarLeft)}>
              <ArrowBackIosRoundedIcon />
            </Button>
          </div>
          <div className="sidebar_footer right">
            <Button onClick={() => setSidebarRight(!sidebarRight)}>
              <ArrowBackIosRoundedIcon />
            </Button>
          </div>
        </div>
        <div className={`sidebar right`}>
          <SidebarBox>
            <div className="scroll-box">
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
                          content: JSON.stringify(
                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                          ),
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
            </div>
          </SidebarBox>
        </div>
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
      <MediaBox
        open={openMedia}
        handleClose={() => {
          setOpenMedia(false);
        }}
        handleSelectImage={(url: any) => {
          handleThemeSettings("bgImage", url);
        }}
      />
    </>
  );
}
