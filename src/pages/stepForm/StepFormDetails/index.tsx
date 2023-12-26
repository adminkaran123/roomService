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
import DragHandleIcon from "@mui/icons-material/DragHandle";

import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { ContentBox, Wrapper, SidebarBox } from "./StepForm.styles";
import { InputTypes } from "../../../utils/constants/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import LaptopIcon from "@mui/icons-material/Laptop";
import EditIcon from "@mui/icons-material/Edit";
import StayCurrentPortraitIcon from "@mui/icons-material/StayCurrentPortrait";
import { Container, Draggable } from "react-smooth-dnd";
import StripeIcon from "../../../assets/stripe.svg";

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
import FormLogic from "../../../components/FormLogic";
import FormCalculator from "../../../components/FormCalculator";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import MoreOptionsButton from "../../../components/buttons/moreOptionsButton/MoreOptionsButton";
import { OptionsBox } from "../../../components/datagrid/DataGrid.styles";
import ListItem from "../../../components/listItems/listItem/ListItem";
import EditableText from "../../../components/EditableText";
import useBuilder from "../../../components/Builder/Builder.hooks";
import FormPreview from "../../FormPreview";
import IconSvg from "../../../components/Icon/IconSvg";
import ExtensionIcon from "@mui/icons-material/Extension";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TuneIcon from "@mui/icons-material/Tune";
import CalculateIcon from "@mui/icons-material/Calculate";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ColorLensIcon from "@mui/icons-material/ColorLens";

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
    handleFormCreateAndUpdate,
    formName,
    setFormName,
    onArrowPopoverClose,
    handleEndScreen,
    activeEndScreen,
    moreOptions,
    anchorEl,
    showArrowPopover,
    selectedSlideIndex,
    togglePreview,
    setTogglePreview,
    activeEditorIndex,
    setActieEditorIndex,
    onMoreOptionsClick,
    editEndScreenTitle,
    setEditEndScreenTitle,
    upadteEndScreenTitle,
    endScreenData,
    errors,
    slideActive,
    setSlideActive,
    updateErrors,
    toggleLogic,
    setToggleLogic,
    toggleCalc,
    setToggleCalc,
  } = useFormBuilder();

  const { handleSlideTitle, changeFilterActiveSlide } = useBuilder();
  if (togglePreview) {
    return <FormPreview setTogglePreview={setTogglePreview} />;
  }
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar className="toolbar">
          <Stack direction="row" justifyContent="space-between" width="100%">
            <IconButton component={Link} to="/forms" size="small" disableRipple>
              <ChevronLeftIcon
                style={{
                  width: "30px",
                  height: "30px",
                  fill: "#000",
                }}
              />
              <Typography color="#000">Step Forms</Typography>
            </IconButton>
            <TextField
              placeholder="Your form name"
              value={formName}
              onChange={(e: any) => {
                setFormName(e.target.value);
                updateErrors("name");
              }}
              error={Boolean(errors?.name)}
              helperText={errors?.name}
              className="name_input"
              variant="standard"
            />
            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => {
                  changeFilterActiveSlide(0);
                  setTogglePreview(true);
                  changeActiveSlide(0);
                }}
              >
                <VisibilityRoundedIcon
                  style={{ width: "30px", height: "30px" }}
                />
              </Button>
              <Button
                variant="contained"
                size="large"
                style={{ color: "#fff" }}
                onClick={handleFormCreateAndUpdate}
              >
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Wrapper sx={{ flexGrow: 1 }}>
        <div className="form-menu">
          <Button
            onClick={() => {
              setSlideActive("slides");
            }}
            className={`${slideActive === "slides" ? "active" : ""}`}
          >
            <SlideshowIcon />
            <Typography variant="body1">Slides</Typography>
          </Button>

          <Button
            onClick={() => {
              setSlideActive("elements");
            }}
            className={`${slideActive === "elements" ? "active" : ""}`}
          >
            <ExtensionIcon />
            <Typography variant="body1">Elements</Typography>
          </Button>

          <Button
            onClick={() => {
              setSlideActive("fields");
            }}
            className={`${slideActive === "fields" ? "active" : ""}`}
          >
            <TextFieldsIcon />
            <Typography variant="body1">Hubspot Fields</Typography>
          </Button>
          <Button
            onClick={() => {
              setSlideActive("theme");
            }}
            className={`${slideActive === "theme" ? "active" : ""}`}
          >
            <ColorLensIcon />
            <Typography variant="body1">Theme Settings</Typography>
          </Button>
          <Button
            onClick={() => {
              setSlideActive("");
              setToggleLogic(true);
              setToggleCalc(false);
            }}
            className={`${toggleLogic && slideActive === "" ? "active" : ""}`}
          >
            <TuneIcon />
            <Typography variant="body1">Logic</Typography>
          </Button>
          <Button
            onClick={() => {
              setSlideActive("");
              setToggleCalc(true);
              setToggleLogic(false);
            }}
            className={`${toggleCalc && slideActive === "" ? "active" : ""}`}
          >
            <CalculateIcon />
            <Typography variant="body1">Calculator</Typography>
          </Button>
        </div>
        <div className={`slide_menu ${slideActive != "" ? "active" : ""}`}>
          <Button
            className="close_btn"
            onClick={() => {
              setSlideActive("");
            }}
          >
            <CloseIcon />
          </Button>

          {slideActive == "slides" && (
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
                <div className="slide_items">
                  <Container
                    lockAxis="y"
                    onDrop={handleSlideDrop}
                    dragHandleSelector=".drag-handle"
                  >
                    {layoutData?.map((layout: any, index: number) => {
                      return (
                        //@ts-ignore
                        <Draggable key={index}>
                          <Button
                            className={`slide_btn ${
                              !activeEndScreen && activeSlide === index
                                ? "active"
                                : ""
                            }`}
                            onClick={() => {
                              changeActiveSlide(index);
                            }}
                            disableRipple
                          >
                            <div className="dnd-handle drag-handle">
                              <DragHandleIcon />
                            </div>
                            <EditableText
                              className="slide_name"
                              initialName={layout.slide_title}
                              isEditing={activeEditorIndex === index}
                              onSave={(value) => {
                                handleSlideTitle(index, value);
                              }}
                              setIsEditing={(isedit) => {
                                if (isedit) {
                                  setActieEditorIndex(index);
                                } else {
                                  setActieEditorIndex(null);
                                }
                              }}
                            />
                            <MoreOptionsButton
                              name="More options"
                              data-id="more-options"
                              style={{ color: "#000" }}
                              onClick={(event) =>
                                onMoreOptionsClick(event, index)
                              }
                            />
                          </Button>
                        </Draggable>
                      );
                    })}
                  </Container>
                </div>
                <Typography className="end_scren_heading">
                  End Screen
                </Typography>
                <Button
                  className={`slide_btn end_screen ${
                    Boolean(activeEndScreen) ? "active" : ""
                  }`}
                  onClick={() => {
                    handleEndScreen(true);
                  }}
                >
                  <EditableText
                    className="slide_name"
                    initialName={endScreenData.slide_title}
                    isEditing={editEndScreenTitle}
                    setIsEditing={setEditEndScreenTitle}
                    onSave={(value) => {
                      upadteEndScreenTitle(value);
                    }}
                  />
                </Button>
              </div>
            </SidebarBox>
          )}
          {slideActive == "elements" && (
            <SidebarBox>
              <div className="item-scroller">
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
                {/* <Card
                  component={Button}
                  className="extra_item"
                  draggable
                  style={{ width: "100%", padding: 10 }}
                  onDragStart={(event) => {
                    columnDrag(event, {
                      type: "Stripe",
                      fieldType: "stripe",
                    });
                  }}
                >
                  <img src={StripeIcon} width={120} />
                </Card> */}
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
              </div>
            </SidebarBox>
          )}
          {slideActive == "fields" && (
            <SidebarBox>
              <div className="item-scroller">
                <HubspotFileds columnDrag={columnDrag} />
              </div>
            </SidebarBox>
          )}

          {slideActive == "theme" && (
            <SidebarBox>
              <div className="item-scroller">
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
                  {!themeSetting.bgImage && (
                    <Button
                      onClick={() => {
                        setOpenMedia(true);
                      }}
                      size="large"
                      className="image-selector"
                    >
                      <WallpaperIcon />
                      <Typography marginLeft="10px">
                        Background Image
                      </Typography>
                    </Button>
                  )}

                  <ColorBox
                    color={themeSetting.background}
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
                  <Typography variant="h3">Form Footer Style</Typography>
                  <ColorBox
                    onChangeComplete={handleChangeComplete}
                    label="Footer Background Color:"
                    color={themeSetting.footeBg}
                    setColor={(color: any) => {
                      handleThemeSettings("footeBg", color);
                    }}
                  />

                  <TextField
                    label="Previous Button Text"
                    value={themeSetting.prevBtnText}
                    onChange={(e) => {
                      handleThemeSettings("prevBtnText", e.target.value);
                    }}
                  />
                  <TextField
                    label="Next Button Text"
                    value={themeSetting.nextBtnText}
                    onChange={(e) => {
                      handleThemeSettings("nextBtnText", e.target.value);
                    }}
                  />
                  <TextField
                    label="Submit Button Text"
                    value={themeSetting.submitBtnText}
                    onChange={(e) => {
                      handleThemeSettings("submitBtnText", e.target.value);
                    }}
                  />
                  <ColorBox
                    onChangeComplete={handleChangeComplete}
                    label=" Buttons Text Color:"
                    color={themeSetting.btnTextColor}
                    setColor={(color: any) => {
                      handleThemeSettings("btnTextColor", color);
                    }}
                  />
                  <ColorBox
                    onChangeComplete={handleChangeComplete}
                    label=" Buttons  Background:"
                    color={themeSetting.btnBgColor}
                    setColor={(color: any) => {
                      handleThemeSettings("btnBgColor", color);
                    }}
                  />
                  <ColorBox
                    onChangeComplete={handleChangeComplete}
                    label=" Buttons Hover Text Color:"
                    color={themeSetting.btnHoveColor}
                    setColor={(color: any) => {
                      handleThemeSettings("btnHoveColor", color);
                    }}
                  />
                  <ColorBox
                    onChangeComplete={handleChangeComplete}
                    label=" Buttons Hover Background:"
                    color={themeSetting.btnHoveBgColor}
                    setColor={(color: any) => {
                      handleThemeSettings("btnHoveBgColor", color);
                    }}
                  />
                </Stack>
              </div>
            </SidebarBox>
          )}
        </div>
        {toggleLogic && slideActive == "" ? (
          <FormLogic />
        ) : toggleCalc && slideActive == "" ? (
          <FormCalculator />
        ) : (
          <div className={`form-area ${slideActive != "" ? "active" : ""}`}>
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
          </div>
        )}
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
      {openMedia && (
        <MediaBox
          open={openMedia}
          handleClose={() => {
            setOpenMedia(false);
          }}
          handleSelectImage={(url: any) => {
            handleThemeSettings("bgImage", url);
          }}
        />
      )}
      <ArrowPopover
        id={"more_options"}
        anchorEl={anchorEl}
        open={showArrowPopover}
        handleOnPopoverClose={onArrowPopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        content={
          <OptionsBox>
            {moreOptions.map((item, index) => {
              if (
                !(layoutData.length == 1 && item.optionName == "Delete Slide")
              )
                return (
                  <ListItem
                    key={index}
                    item={item}
                    onClickAction={onArrowPopoverClose}
                  />
                );
            })}
          </OptionsBox>
        }
      />
    </>
  );
}
