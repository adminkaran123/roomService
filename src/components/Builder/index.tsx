import * as React from "react";
import { SwipeableDrawer, Typography, Button } from "@mui/material";

import { Wrapper, DrawerContent } from "./Builder.styles";
import { LayoutBuilder } from "./BuilderElements";
import PaddingMarginSetting from "../Settings/PaddingMarginSetting";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import CloseIcon from "@mui/icons-material/Close";
import MediaBox from "../../components/MediaBox";

import useHubspotFileds from "./Builder.hooks";

interface Props {}

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

  return (
    <Wrapper onDrop={layuotDrop} onDragOver={allowDrop} {...themeSetting}>
      {layoutData[activeSlide]?.length === 0 && (
        <div className="droparea">Drop Area</div>
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
          {selectedItem?.data?.type}
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
          <PaddingMarginSetting
            data={selectedItem?.data}
            handleLayoutProperty={handleLayoutProperty}
          />
        </DrawerContent>
      </SwipeableDrawer>
      <MediaBox
        open={openMedia}
        handleClose={() => {
          setOpenMedia(false);
        }}
        handleSelectImage={(url: any) => {
          handleLayoutProperty("bgImage", url);
        }}
      />
    </Wrapper>
  );
}
