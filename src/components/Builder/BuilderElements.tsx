import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface LayoutProps {
  columns: any;
  handleColumnResize: Function;
  layoutIndex: any;
}

export function Column(props: any) {
  const { handleColumnResize, layoutIndex, index, ...rest } = props;
  return (
    <div {...rest} className="droparea">
      Drop modules here
      <div
        className="resizer left"
        onMouseMove={(e) => handleColumnResize(e, layoutIndex, index)}
      ></div>
      <div
        className="resizer right"
        onMouseMove={(e) => handleColumnResize(e, layoutIndex, index)}
      ></div>
    </div>
  );
}

export function LayoutBuilder(props: LayoutProps) {
  const { columns, handleColumnResize, layoutIndex } = props;

  return (
    <div className="layout-box">
      {columns.map((item: any, index: number) => {
        return (
          <Column
            style={{ width: item.width }}
            handleColumnResize={handleColumnResize}
            index={index}
            layoutIndex={layoutIndex}
          />
        );
      })}
    </div>
  );
}
