import * as React from "react";

import { Wrapper } from "./Builder.styles";
import { LayoutBuilder } from "./BuilderElements";

import useHubspotFileds from "./Builder.hooks";

interface Props {}

export default function Builder(props: Props) {
  const { allowDrop, layuotDrop, layoutData, sectionDrag, handleDndDrop } =
    useHubspotFileds();

  return (
    <Wrapper onDrop={layuotDrop} onDragOver={allowDrop}>
      {layoutData?.length === 0 && <div className="droparea">Drop Area</div>}
      {layoutData?.map((section: any, index: number) => {
        if (section.type === "layout") {
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
    </Wrapper>
  );
}
