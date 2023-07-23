import * as React from "react";

import { Wrapper } from "./Builder.styles";
import { LayoutBuilder } from "./BuilderElements";

import useHubspotFileds from "./Builder.hooks";

interface Props {}

export default function Builder(props: Props) {
  const { allowlayuotDrop, layuotDrop, layoutData } = useHubspotFileds();

  return (
    <Wrapper onDrop={layuotDrop} onDragOver={allowlayuotDrop}>
      {layoutData.length === 0 && <div className="droparea">Drop Area</div>}
      {layoutData.map((section: any, index: number) => {
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
            />
          );
        }
      })}
    </Wrapper>
  );
}
