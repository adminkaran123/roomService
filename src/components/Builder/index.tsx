import * as React from "react";
import {
  SwipeableDrawer,
  Typography,
  Button,
  TextField,
  Stack,
  Switch,
} from "@mui/material";

import { Wrapper, DrawerContent, MaxwidthWrapper } from "./Builder.styles";
import { LayoutBuilder } from "./BuilderElements";
import PaddingMarginSetting from "../Settings/PaddingMarginSetting";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CloseIcon from "@mui/icons-material/Close";
import MediaBox from "../../components/MediaBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import useHubspotFileds from "./Builder.hooks";
import FormEditor from "../Editor";

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
    setOpenMedia,
  } = useHubspotFileds();
  const { activeMode } = props;

  return (
    <>
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
        {layoutData[activeSlide]?.length === 0 && (
          <div className="droparea no-data">
            <h4>Drop a Layout to start adding Module</h4>
          </div>
        )}
        {layoutData?.[activeSlide]?.map((section: any, index: number) => {
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
                sectionOnDrop={(event: any) => handleDndDrop(event, index, 0)}
                onDragOver={allowDrop}
              />
            );
          }
        })}

        <SwipeableDrawer
          anchor="right"
          open={selectedItem !== null}
          onClose={() => {
            handleSelecteItem(null);
          }}
          onOpen={() => {}}
        >
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
                  variant="contained"
                  style={{ color: "#fff" }}
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
                          handleLayoutProperty(
                            "maxWidth",
                            e.target.value + "px"
                          );
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
                <Button
                  title="Select Image"
                  onClick={() => {
                    setOpenMedia(true);
                  }}
                  variant="contained"
                  style={{ color: "#fff" }}
                  size="large"
                >
                  <WallpaperIcon />
                  <Typography marginLeft="10px" fontWeight="bold">
                    Select Image
                  </Typography>
                </Button>
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
                      console.log(
                        "selectedItem?.data?.required",
                        selectedItem?.data?.required
                      );
                      handleLayoutProperty(
                        "required",
                        //@ts-ignore
                        !selectedItem?.data?.required
                      );
                    }}
                  />
                </div>
              </div>
            )}
          </DrawerContent>
        </SwipeableDrawer>
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
      </Wrapper>
      <div
        className={`form_footer ${activeMode}`}
        style={{ background: themeSetting.footeBg }}
      >
        <Button
          size="large"
          variant={"contained"}
          className="back_btn"
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
        <Button
          size="large"
          variant={"contained"}
          className="next_btn"
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
      </div>
    </>
  );
}
