import * as React from "react";
import {
  Typography,
  Button,
  TextField,
  Stack,
  Switch,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  IconButton,
} from "@mui/material";

import {
  Wrapper,
  DrawerContent,
  MaxwidthWrapper,
  CustomDrawer,
} from "./Builder.styles";
import { LayoutBuilder } from "./BuilderElements";
import PaddingMarginSetting from "../Settings/PaddingMarginSetting";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CloseIcon from "@mui/icons-material/Close";
import MediaBox from "../../components/MediaBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ColorBox from "../../components/ColorBox";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MultiSelectBuilder from "../MultiSelectBuilder";
import ImageSelectBuilder from "../ImageSelectBuilder";

import {
  feidTypesOptions,
  singleCheckboxOptions,
  textFeildOptions,
  chekBokOptions,
  radioOptions,
  fileAllowedType,
} from "../../utils/constants/constants";

import useBuilder from "./Builder.hooks";
import FormEditor from "../Editor";
import EditableNameComponent from "../EditableText";

interface Props {
  activeMode: string;
}

export default function Builder(props: Props) {
  const {
    allowDrop,
    layuotDrop,
    layoutData,
    sectionDrag,
    handleDndDrop,
    activeSlide,
    themeSetting,
    handleSelecteItem,
    selectedItem,
    handleLayoutProperty,
    openMedia,
    changeActiveSlide,
    setOpenMedia,
    activeEndScreen,
    endScreenData,
    editiEndScreen,
    setEditEndScreen,
    changeEndScreenData,
    handleEndScreen,
    onBoardUser,
    errors,
  } = useBuilder();
  const { activeMode } = props;

  return (
    <>
      <div className={`cs_wrapper wrap_${activeMode}`}>
        <Wrapper
          onDrop={layuotDrop}
          onDragOver={allowDrop}
          {...themeSetting}
          className={activeMode}
          style={{
            backgroundColor: themeSetting.background,
            backgroundImage: "url(" + themeSetting.bgImage + ")",
          }}
        >
          <div className="inner_wrap">
            {!activeEndScreen ? (
              <>
                {layoutData[activeSlide]?.data?.length === 0 && (
                  <div className="droparea no-data">
                    <h4>Drop a Layout to start adding Module</h4>
                  </div>
                )}
                {layoutData?.[activeSlide]?.data?.map(
                  (section: any, index: number) => {
                    if (section?.type === "layout") {
                      return (
                        <LayoutBuilder
                          columns={section.columns}
                          layoutIndex={index}
                          style={{
                            paddingLeft: section.paddingLeft,
                            paddingRight: section.paddingRight,
                            paddingTop: section.paddingTop,
                            paddingBottom: section.paddingBottom,
                            marginLeft: section.marginLeft,
                            marginRight: section.marginRight,
                            marginTop: section.marginTop,
                            marginBottom: section.marginBottom,
                            backgroundImage: `url(${section.bgImage})`,
                          }}
                          maxWidth={section.maxWidth}
                          draggable
                          onDragStart={(event: any) => {
                            sectionDrag(event, { data: section, index: index });
                          }}
                          sectionOnDrop={(event: any) =>
                            handleDndDrop(event, index, 0)
                          }
                          onDragOver={allowDrop}
                        />
                      );
                    }
                  }
                )}
              </>
            ) : (
              <div
                className="end_screen_data"
                onClick={() => {
                  setEditEndScreen(true);
                }}
              >
                {endScreenData?.content && (
                  <div
                    className="rich_text editor-preview ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: JSON.parse(endScreenData?.content),
                    }}
                  ></div>
                )}
              </div>
            )}
            {openMedia && (
              <MediaBox
                open={openMedia}
                handleClose={() => {
                  setOpenMedia(false);
                }}
                handleSelectImage={(url: any) => {
                  if (
                    selectedItem?.data?.type === "layout" ||
                    selectedItem?.data?.type === "column"
                  ) {
                    handleLayoutProperty("bgImage", url);
                  }
                  if (selectedItem?.data?.type === "image") {
                    handleLayoutProperty("url", url);
                  }
                }}
              />
            )}
          </div>
        </Wrapper>
        {!activeEndScreen && (
          <div
            className={`form_footer ${activeMode}`}
            style={{ background: themeSetting.footeBg }}
          >
            <Button
              size="large"
              variant={"contained"}
              className="back_btn"
              onClick={() => {
                if (activeSlide > 0) {
                  changeActiveSlide(activeSlide - 1);
                }
              }}
              disabled={activeSlide == 0}
              sx={{
                bgcolor: themeSetting.btnBgColor,
                color: themeSetting.btnTextColor,
                ":hover": {
                  bgcolor: themeSetting.btnHoveBgColor,
                  color: themeSetting.btnHoveColor,
                },
              }}
            >
              <ArrowBackIosIcon />
              {themeSetting.prevBtnText}
            </Button>

            {layoutData?.length - 1 === activeSlide ? (
              <Button
                size="large"
                variant={"contained"}
                className="next_btn"
                onClick={() => {
                  handleEndScreen(true);
                }}
                sx={{
                  bgcolor: themeSetting.btnBgColor,
                  color: themeSetting.btnTextColor,
                  ":hover": {
                    bgcolor: themeSetting.btnHoveBgColor,
                    color: themeSetting.btnHoveColor,
                  },
                }}
              >
                {themeSetting.submitBtnText} <ArrowForwardIosIcon />
              </Button>
            ) : (
              <Button
                size="large"
                variant={"contained"}
                className="next_btn"
                onClick={() => {
                  changeActiveSlide(activeSlide + 1);
                }}
                sx={{
                  bgcolor: themeSetting.btnBgColor,
                  color: themeSetting.btnTextColor,
                  ":hover": {
                    bgcolor: themeSetting.btnHoveBgColor,
                    color: themeSetting.btnHoveColor,
                  },
                }}
              >
                {themeSetting.nextBtnText} <ArrowForwardIosIcon />
              </Button>
            )}
          </div>
        )}
      </div>

      <CustomDrawer
        className={`custom_drawer ${
          selectedItem !== null || editiEndScreen ? "open" : ""
        }`}
      >
        <IconButton
          onClick={() => {
            handleSelecteItem(null);
            setEditEndScreen(false);
          }}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#000",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DrawerContent>
          {(selectedItem?.data?.type === "layout" ||
            selectedItem?.data?.type === "column") && (
            <>
              <Typography variant="h3" marginBottom="20px">
                Edit{" "}
                {selectedItem?.data?.type === "layout" ? "Section" : "Column"}
              </Typography>
              {Boolean(selectedItem?.data?.bgImage) && (
                <div className="image_box">
                  <Button
                    className="close_btn"
                    onClick={() => {
                      handleLayoutProperty("bgImage", "");
                    }}
                  >
                    <CloseIcon />
                  </Button>
                  <img src={selectedItem?.data?.bgImage} width="200px" />
                </div>
              )}
              <Button
                title="Background Image"
                onClick={() => {
                  setOpenMedia(true);
                }}
                className="image-selector"
                size="large"
              >
                <WallpaperIcon />
                <Typography marginLeft="10px" fontWeight="bold">
                  Background Image
                </Typography>
              </Button>
              {selectedItem?.data?.type === "layout" && (
                <>
                  <MaxwidthWrapper>
                    <Button
                      className="content-center"
                      onClick={() => {
                        handleLayoutProperty("maxWidth", "1000px");
                      }}
                    >
                      <div className="center-box">
                        <div className="filled"></div>
                      </div>
                      <p>Center Content</p>
                    </Button>
                    <Button
                      className="content-center"
                      onClick={() => {
                        handleLayoutProperty("maxWidth", "100%");
                      }}
                    >
                      <div className="full-box"></div>
                      <p>Full Width</p>
                    </Button>
                  </MaxwidthWrapper>
                  {selectedItem?.data?.maxWidth !== "100%" && (
                    <TextField
                      type="number"
                      onChange={(e) => {
                        handleLayoutProperty("maxWidth", e.target.value + "px");
                      }}
                      defaultValue={1200}
                      value={selectedItem?.data?.maxWidth.replace("px", "")}
                      className="max-width-box"
                    />
                  )}
                </>
              )}
              <PaddingMarginSetting
                data={selectedItem?.data}
                handleLayoutProperty={handleLayoutProperty}
              />
            </>
          )}
          {selectedItem?.data?.type === "image" && (
            <>
              {Boolean(selectedItem?.data?.url) && (
                <div className="image_box">
                  <Button
                    className="close_btn"
                    onClick={() => {
                      handleLayoutProperty("url", "");
                    }}
                  >
                    <CloseIcon />
                  </Button>
                  <img src={selectedItem?.data?.url} width="200px" />
                </div>
              )}
              {Boolean(!selectedItem?.data?.url) && (
                <Button
                  title="Select Image"
                  onClick={() => {
                    setOpenMedia(true);
                  }}
                  size="large"
                  className="image-selector"
                >
                  <WallpaperIcon />
                  <Typography marginLeft="10px" fontWeight="bold">
                    Select Image
                  </Typography>
                </Button>
              )}
            </>
          )}
          {selectedItem?.data?.type === "rich_text" && (
            <>
              <FormEditor
                editorHtml={JSON.parse(selectedItem?.data?.content || "")}
                setEditorHtml={(html: any) => {
                  handleLayoutProperty("content", JSON.stringify(html));
                }}
              />
            </>
          )}
          {selectedItem?.data?.hsProperty && (
            <div className="input-prp-wrap">
              <Typography variant="h3" marginBottom="20px">
                Edit {feidTypesOptions[selectedItem?.data?.fieldType]}
              </Typography>
              <TextField
                label="Input Label"
                value={selectedItem?.data?.label}
                onChange={(e) => {
                  handleLayoutProperty("label", e.target.value);
                }}
              />
              {(selectedItem?.data?.fieldType === "text" ||
                selectedItem?.data?.fieldType === "number" ||
                selectedItem?.data?.fieldType === "textarea" ||
                selectedItem?.data?.fieldType === "phonenumber") && (
                <TextField
                  label="Placeholder"
                  value={selectedItem?.data?.placeholder}
                  onChange={(e) => {
                    handleLayoutProperty("placeholder", e.target.value);
                  }}
                />
              )}

              <div className="form-group">
                <label>Required</label>
                <Switch
                  checked={selectedItem?.data?.required}
                  onChange={() => {
                    handleLayoutProperty(
                      "required",
                      //@ts-ignore
                      !selectedItem?.data?.required
                    );
                  }}
                />
              </div>
              <br />

              <FormControl fullWidth>
                <InputLabel>Select Input Type </InputLabel>

                <Select
                  value={
                    selectedItem?.data?.advanced_type ||
                    selectedItem?.data?.fieldType
                  }
                  label="Select Input Type "
                  onChange={(e) => {
                    if (e.target.value !== selectedItem?.data?.fieldType) {
                      handleLayoutProperty(
                        "advanced_type",
                        //@ts-ignore
                        e.target.value
                      );
                    } else {
                      handleLayoutProperty(
                        "advanced_type",
                        //@ts-ignore
                        null
                      );
                    }
                  }}
                >
                  {}
                  <MenuItem value={selectedItem?.data?.fieldType}>
                    {feidTypesOptions[selectedItem?.data?.fieldType]}
                  </MenuItem>
                  {selectedItem?.data?.fieldType === "booleancheckbox"
                    ? singleCheckboxOptions.map((item) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })
                    : null}
                  {selectedItem?.data?.fieldType === "text"
                    ? textFeildOptions.map((item) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })
                    : null}
                  {selectedItem?.data?.fieldType === "checkbox"
                    ? chekBokOptions.map((item) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })
                    : null}

                  {selectedItem?.data?.fieldType === "radio"
                    ? radioOptions.map((item) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })
                    : null}
                </Select>
              </FormControl>
              {selectedItem?.data?.advanced_type == "browse_file" && (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Select Allowed Format </InputLabel>
                    <Select
                      value={selectedItem?.data?.allowedFormats || "*"}
                      label="Select Allowed Fromats"
                      onChange={(e) => {
                        handleLayoutProperty(
                          "allowedFormats",
                          //@ts-ignore
                          e.target.value
                        );
                      }}
                    >
                      {fileAllowedType.map((item: any) => {
                        return (
                          <MenuItem key={item.value} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </>
              )}

              {selectedItem?.data?.advanced_type == "rating" && (
                <>
                  <FormControl fullWidth>
                    <InputLabel>Icon Type </InputLabel>
                    <Select
                      value={selectedItem?.data?.iconType || "star"}
                      label="Icon Type"
                      onChange={(e) => {
                        handleLayoutProperty(
                          "iconType",
                          //@ts-ignore
                          e.target.value
                        );
                      }}
                    >
                      <MenuItem value="star">Star Icon</MenuItem>
                      <MenuItem value="heart">Heart Icon</MenuItem>
                      {/* <MenuItem value="sentiment">Sentiments</MenuItem> */}
                    </Select>
                  </FormControl>
                  {selectedItem?.data?.iconType != "sentiment" && (
                    <>
                      <InputLabel>Icon Count</InputLabel>
                      <FormControl fullWidth>
                        <Slider
                          defaultValue={5}
                          value={selectedItem?.data.ratingCount}
                          aria-label="Default"
                          valueLabelDisplay="auto"
                          onChange={(
                            event: Event,
                            newValue: number | number[]
                          ) => {
                            handleLayoutProperty(
                              "ratingCount",
                              //@ts-ignore
                              newValue
                            );
                          }}
                          min={2}
                          max={10}
                        />
                      </FormControl>
                    </>
                  )}

                  <InputLabel>Icon Size</InputLabel>
                  <FormControl fullWidth>
                    <Slider
                      defaultValue={20}
                      value={selectedItem?.data.iconSize}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                      onChange={(event: Event, newValue: number | number[]) => {
                        handleLayoutProperty(
                          "iconSize",
                          //@ts-ignore
                          newValue
                        );
                      }}
                    />

                    <ColorBox
                      color={selectedItem?.data.ratingIconColor || "#9b9b9b"}
                      //onChangeComplete={handleChangeComplete}
                      label="Rating Icon Color:"
                      setColor={(color: any) => {
                        handleLayoutProperty(
                          "ratingIconColor",
                          //@ts-ignore
                          color
                        );
                      }}
                    />
                    <ColorBox
                      color={
                        selectedItem?.data.ratingIconFilledColor || "#ffb400"
                      }
                      //onChangeComplete={handleChangeComplete}
                      label="Rating Icon Filled Color:"
                      setColor={(color: any) => {
                        handleLayoutProperty(
                          "ratingIconFilledColor",
                          //@ts-ignore
                          color
                        );
                      }}
                    />
                  </FormControl>
                </>
              )}
              {/* {browse_file} */}

              {selectedItem?.data?.advanced_type == "multi_select" && (
                <>
                  <MultiSelectBuilder
                    handleLayoutProperty={handleLayoutProperty}
                  />
                </>
              )}

              {selectedItem?.data?.advanced_type == "image_select" && (
                <>
                  <ImageSelectBuilder
                    handleLayoutProperty={handleLayoutProperty}
                  />
                </>
              )}
              {selectedItem?.data?.advanced_type == "image_select_checkbox" && (
                <>
                  <ImageSelectBuilder
                    handleLayoutProperty={handleLayoutProperty}
                    mapKey="options"
                  />
                </>
              )}

              {selectedItem?.data?.advanced_type == "image_select_radio" && (
                <>
                  <ImageSelectBuilder
                    handleLayoutProperty={handleLayoutProperty}
                    mapKey="options"
                  />
                </>
              )}
            </div>
          )}
          {selectedItem?.data?.fieldType === "stripe" && (
            <>
              <Typography variant="h3" marginBottom="10px">
                Stripe Settings
              </Typography>

              <Button variant="contained" onClick={onBoardUser}>
                Connect Stripe
              </Button>

              <TextField
                label="Sucess Link"
                style={{ marginTop: "20px" }}
                value={endScreenData.redirectLink}
                onChange={(e) => {
                  changeEndScreenData("redirectLink", e.target.value);
                }}
              />
              <TextField
                label="Cancel  Link"
                style={{ marginTop: "20px" }}
                value={endScreenData.redirectLink}
                onChange={(e) => {
                  changeEndScreenData("redirectLink", e.target.value);
                }}
              />
            </>
          )}
          {editiEndScreen && (
            <>
              <Typography variant="h3" marginBottom="10px">
                Thank you message
              </Typography>
              <FormEditor
                editorHtml={JSON.parse(endScreenData.content)}
                setEditorHtml={(html: any) => {
                  changeEndScreenData("content", JSON.stringify(html));
                }}
              />

              <TextField
                label="Redirect Link"
                style={{ marginTop: "20px" }}
                value={endScreenData.redirectLink}
                onChange={(e) => {
                  changeEndScreenData("redirectLink", e.target.value);
                }}
              />
            </>
          )}
        </DrawerContent>
      </CustomDrawer>
    </>
  );
}
