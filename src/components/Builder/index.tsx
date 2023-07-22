import * as React from "react";

import { Wrapper } from "./Builder.styles";
import { LayoutBuilder } from "./BuilderElements";

import useHubspotFileds from "./Builder.hooks";

interface Props {}

export default function Builder(props: Props) {
  const { allowlayuotDrop, handleColumnResize, layuotDrop, layoutData } =
    useHubspotFileds();

  return (
    <Wrapper onDrop={layuotDrop} onDragOver={allowlayuotDrop}>
      {layoutData.length === 0 && <div className="droparea">Drop Area</div>}
      {layoutData.map((item: any, index: number) => {
        if (item.type === "layout") {
          return (
            <LayoutBuilder
              columns={item.columns}
              handleColumnResize={handleColumnResize}
              layoutIndex={index}
            />
          );
        }
      })}
    </Wrapper>
  );
}
