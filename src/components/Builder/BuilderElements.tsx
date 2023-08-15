import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "react-quill/dist/quill.core.css";

import {
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Select,
  FormControl,
  RadioGroup,
  FormLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";
import TableRowsIcon from "@mui/icons-material/TableRows";
import useBuilder from "./Builder.hooks";
import ImageIcon from "@mui/icons-material/Image";
import FormEditor from "../Editor";

interface LayoutProps {
  columns: any;
  layoutIndex: any;
  style?: any;
  draggable: any;
  onDragStart: any;
  sectionOnDrop: any;
  onDragOver: any;
  maxWidth: string;
}

export const DraggableTextFeild = (props: any) => {
  const { module, themeSetting } = props;

  if (module?.fieldType === "text") {
    return (
      <div className="form-group">
        <TextField
          label={module.label}
          variant={themeSetting.type}
          required={module.required}
          InputLabelProps={{
            //@ts-ignore
            FormLabelClasses: {
              asterisk: "red",
            },
          }}
          name={module.name}
          placeholder={module?.placeholder}
        />
      </div>
    );
  }
  if (module?.fieldType === "number") {
    return (
      <div className="form-group">
        <TextField
          label={module.label}
          variant={themeSetting.type}
          type="number"
          required={module.required}
          placeholder={module?.placeholder}
          name={module.name}
        />
      </div>
    );
  }
  if (module?.fieldType === "textarea") {
    return (
      <div className="form-group">
        <TextField
          fullWidth
          required={module.required}
          multiline
          rows={4}
          label={module.label}
          variant={themeSetting.type}
          placeholder={module?.placeholder}
          InputProps={{
            inputComponent: TextareaAutosize,
          }}
        />
      </div>
    );
  }
  if (module?.fieldType === "phonenumber") {
    return (
      <div className="form-group">
        <TextField
          label={module.label}
          variant={themeSetting.type}
          placeholder={module?.placeholder}
          required={module.required}
          name={module.name}
        />
      </div>
    );
  }
  if (module?.fieldType === "date") {
    return (
      <div className="form-group">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label={module.label}
              slotProps={{
                textField: {
                  variant: themeSetting.type,
                  required: module.required,
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    );
  }
  if (module?.fieldType === "booleancheckbox") {
    return (
      <div className="form-group">
        <label>
          {module.label}{" "}
          {module.required ? <span className="red">*</span> : null}
        </label>
        <Switch
          {...{ inputProps: { "aria-label": module.label } }}
          defaultChecked
          required={module.required}
        />
      </div>
    );
  }
  if (module?.fieldType === "radio") {
    return (
      <div className="form-group">
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {module.label}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            {module.options.map((item: any, index: any) => {
              return (
                <FormControlLabel
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              );
            })}

            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }

  if (module?.fieldType === "checkbox") {
    return (
      <div className="form-group">
        <label>{module.label}</label>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          {module.options.map((item: any, index: any) => {
            return (
              <FormControlLabel
                key={index}
                control={<Checkbox name={module.name} />}
                label={item.label}
              />
            );
          })}
        </FormGroup>
      </div>
    );
  }
  if (module?.fieldType === "select") {
    return (
      <div className="form-group">
        <FormControl fullWidth>
          <InputLabel id={module.name}>{module.label}</InputLabel>
          <Select
            labelId={module.name}
            //value={age}
            label={module.label}
            variant={themeSetting.type}
            //onChange={handleChange}
          >
            {module.options.map((item: any, index: number) => {
              return <MenuItem value={item.value}>{item.label}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </div>
    );
  }
  if (module?.fieldType === "rich_text") {
    return (
      <div
        className="rich_text editor-preview ql-editor"
        dangerouslySetInnerHTML={{ __html: JSON.parse(module.content) }}
      ></div>
    );
  }
  if (module?.fieldType === "image") {
    return (
      <div className="module_image_box">
        {module.url ? (
          <img src={module.url} alt="Image" />
        ) : (
          <div className="select_image">
            <ImageIcon />
          </div>
        )}
      </div>
    );
  }
  return <h1>{module?.fieldType}</h1>;
};

export function Column(props: any) {
  const { layoutIndex, colIndex, modules, ...rest } = props;
  const {
    deleteColumn,
    editColumn,
    cloneColumn,
    themeSetting,
    moduleDrag,
    editModule,
    handleDndDrop,
    handleResize,
  } = useBuilder();

  return (
    <div {...rest} className={`droparea`} data-index={colIndex}>
      <div className="btn_group">
        <Tooltip title="Column" className="dragger">
          <Button>
            <TableRowsIcon />
          </Button>
        </Tooltip>
        <Tooltip
          title="Edit Column"
          onClick={() => editColumn(layoutIndex, colIndex)}
        >
          <Button>
            <EditIcon />
          </Button>
        </Tooltip>
        <Tooltip title="Delete Column">
          <Button onClick={() => deleteColumn(layoutIndex, colIndex)}>
            <Delete />
          </Button>
        </Tooltip>
      </div>

      {modules?.length ? (
        <>
          {modules?.map((module: any, moduleIndex: number) => {
            return (
              <Button
                onClick={() => editModule(layoutIndex, colIndex, moduleIndex)}
                disableRipple
                style={{ display: "block" }}
                className="module_btn"
                key={moduleIndex}
                draggable
                onDragStart={(event: any) => {
                  moduleDrag(event, {
                    index: moduleIndex,
                    colIndex: colIndex,
                    data: module,
                    sectionIndex: layoutIndex,
                  });
                }}
                onDrop={(event: any) => {
                  handleDndDrop(event, colIndex, layoutIndex, moduleIndex);
                }}
              >
                <DraggableTextFeild
                  module={module}
                  themeSetting={themeSetting}
                ></DraggableTextFeild>
              </Button>
            );
          })}
        </>
      ) : (
        <div className="column_label">Drop modules here</div>
      )}

      <button
        className="resizer right"
        onMouseDown={(e) => handleResize(e)}
      ></button>
    </div>
  );
}

export function LayoutBuilder(props: LayoutProps) {
  const {
    columnDrag,
    handleDndDrop,
    allowDrop,
    deleteSection,
    editSection,
    cloneSection,
  } = useBuilder();
  const { columns, layoutIndex, sectionOnDrop, maxWidth, ...rest } = props;

  return (
    <div className="layout-box" {...rest}>
      <div
        className="layout-inner"
        data-index={layoutIndex}
        style={{ maxWidth: maxWidth }}
      >
        <div className="section-sibling" onDrop={sectionOnDrop}>
          <div className="btn_group">
            <Tooltip title="Section">
              <Button className="dragger">
                <ViewComfyIcon />
              </Button>
            </Tooltip>
            {columns.some(
              (column: any) => !Boolean(column?.module?.hsProperty)
            ) && (
              <Tooltip title="Clone Section">
                <Button
                  className="drag_btn"
                  onClick={() => cloneSection(layoutIndex)}
                >
                  <ContentCopyIcon />
                </Button>
              </Tooltip>
            )}
            <Tooltip title="Edit Section">
              <Button onClick={() => editSection(layoutIndex)}>
                <EditIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Delete Section">
              <Button onClick={() => deleteSection(layoutIndex)}>
                <Delete />
              </Button>
            </Tooltip>
          </div>
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
                marginLeft: column.marginLeft,
                marginRight: column.marginRight,
                marginTop: column.marginTop,
                marginBottom: column.marginBottom,
                backgroundImage: `url(${column.bgImage})`,
              }}
              colIndex={index}
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
              modules={column?.modules}
            />
          );
        })}
      </div>
    </div>
  );
}
