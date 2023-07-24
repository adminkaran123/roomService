import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Delete } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import TableRowsIcon from "@mui/icons-material/TableRows";
import useBuilder from "./Builder.hooks";

interface LayoutProps {
  columns: any;
  layoutIndex: any;
  style?: any;
  draggable: any;
  onDragStart: any;
  sectionOnDrop: any;
  onDragOver: any;
}

export const DraggableTextFeild = (props) => {
  const { module } = props;
  if (module?.fieldType === "text") {
    return (
      <div className="form-group">
        <label>Test Label</label>
        <input type="text" />
      </div>
    );
  }
  return <h1>{}</h1>;
};

export function Column(props: any) {
  const { layoutIndex, index, module, ...rest } = props;

  return (
    <div
      {...rest}
      className={`droparea ${module !== null ? "has_module" : ""}`}
    >
      <div className="btn_group">
        <Tooltip title="Column" className="dragger">
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
      {Boolean(module?.type) ? (
        <DraggableTextFeild module={module}></DraggableTextFeild>
      ) : (
        <div className="column_label">Drop modules here</div>
      )}

      <div className="resizer left"></div>
      <div className="resizer right"></div>
    </div>
  );
}

export function LayoutBuilder(props: LayoutProps) {
  const { columnDrag, handleDndDrop, allowDrop } = useBuilder();
  const { columns, layoutIndex, sectionOnDrop, ...rest } = props;

  return (
    <div className="layout-box" {...rest}>
      <div className="section-sibling" onDrop={sectionOnDrop}></div>
      <div className="btn_group">
        <Tooltip title="Section">
          <Button className="dragger">
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
      {columns?.map((column: any, index: number) => {
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
            draggable
            onDragStart={(event: any) => {
              columnDrag(event, {
                index: index,
                data: column,
                sectionIndex: layoutIndex,
              });
            }}
            onDrop={(event: any) => handleDndDrop(event, index, layoutIndex)}
            onDragOver={allowDrop}
            module={column?.module}
          />
        );
      })}
    </div>
  );
}
