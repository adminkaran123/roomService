import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Delete } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import TableRowsIcon from "@mui/icons-material/TableRows";

interface LayoutProps {
  columns: any;
  layoutIndex: any;
  style?: any;
}

export function Column(props: any) {
  const { layoutIndex, index, ...rest } = props;
  return (
    <div {...rest} className="droparea">
      <div className="btn_group">
        <Tooltip title="Column">
          <Button>
            <TableRowsIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Clone Column">
          <Button>
            <ContentCopyIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Edit Column">
          <Button>
            <EditIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete Column">
          <Button>
            <Delete />
          </Button>
        </Tooltip>
      </div>
      <div className="column_label">Drop modules here</div>
      <div className="resizer left"></div>
      <div className="resizer right"></div>
    </div>
  );
}

export function LayoutBuilder(props: LayoutProps) {
  const { columns, layoutIndex, ...rest } = props;

  return (
    <div className="layout-box" {...rest}>
      <div className="btn_group">
        <Tooltip title="Section">
          <Button>
            <ViewComfyIcon />
          </Button>
        </Tooltip>

        <Tooltip title="Clone Section">
          <Button className="drag_btn">
            <ContentCopyIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Edit Section">
          <Button>
            <EditIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete Section">
          <Button>
            <Delete />
          </Button>
        </Tooltip>
      </div>
      {columns.map((column: any, index: number) => {
        return (
          <Column
            style={{
              width: column.width,
              paddingLeft: column.paddingLeft,
              paddingRight: column.paddingRight,
              paddingTop: column.paddingTop,
              paddingBottom: column.paddingBottom,
            }}
            index={index}
            layoutIndex={layoutIndex}
          />
        );
      })}
    </div>
  );
}
