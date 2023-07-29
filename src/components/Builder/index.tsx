import * as React from "react";
import { SwipeableDrawer, Typography } from "@mui/material";

import { Wrapper, DrawerContent } from "./Builder.styles";
import { LayoutBuilder } from "./BuilderElements";
import PaddingMarginSetting from "../Settings/PaddingMarginSetting";

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
          <PaddingMarginSetting />
        </DrawerContent>
      </SwipeableDrawer>
    </Wrapper>
  );
}
