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
  styled,
  FormHelperText,
  Radio,
  MenuItem,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import dayjs from "dayjs";
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

import StripeCard from "../StripeCard";
import BrowseFile from "../BrowseFile";
import CountrySelect from "../CountrySelect";
import PhoneInput from "../PhoneInput";
import Slider from "@mui/material/Slider";
import MultiSelect from "../MultiSelect";
import MultiImageSelect from "../MultiImageSelect";

import Signature from "../Signature";
import Rating from "../Rating";
import ImageBox from "../ImageBox";

interface LayoutProps {
  columns: any;
  layoutIndex?: any;
  style?: any;
  draggable?: any;
  onDragStart?: any;
  sectionOnDrop?: any;
  onDragOver?: any;
  maxWidth: string;
}

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: theme.palette.primary.main, // Change this to the desired track color
  "& .MuiSlider-rail": {
    backgroundColor: theme.palette.primary.light, // Change this to the desired rail color
  },
}));

export const DraggableTextFeild = (props: any) => {
  const {
    formValues,
    updateInputValues,
    errors,
    themeSetting,
    handleCheckboxChange,
    canShow,
  } = useBuilder();
  const { module, isPreview } = props;

  if (isPreview) {
    if (!canShow(module.name)) {
      return null;
    }
  }

  if (module?.advanced_type === "browse_file") {
    return (
      <div className="form-group">
        <BrowseFile
          themeSetting={themeSetting}
          module={module}
          onFileUpload={(files) => {
            //@ts-ignore
            updateInputValues(module.name, files);
          }}
          //errors={errors}
        />
      </div>
    );
  }
  if (module?.advanced_type === "country_select") {
    return (
      <div className="form-group">
        <CountrySelect
          updateInputValues={updateInputValues}
          errors={errors}
          formValues={formValues}
          module={module}
        />
      </div>
    );
  }

  if (module?.advanced_type === "phone_no_select") {
    return (
      <div className="form-group">
        <PhoneInput
          updateInputValues={updateInputValues}
          errors={errors}
          formValues={formValues}
        />
      </div>
    );
  }
  //will add later
  if (module?.advanced_type === "range_slider") {
    return (
      <div className="form-group">
        <InputLabel>
          {module.label}{" "}
          {module.required ? <span style={{ color: "red" }}>*</span> : ""}
        </InputLabel>
        <CustomSlider
          getAriaLabel={() => module.label}
          value={
            formValues[module.name]
              ? JSON.parse(formValues[module.name])
              : ["0", "100"]
          }
          onChange={(e) => {
            //@ts-ignore
            updateInputValues(module.name, JSON.stringify(e.target.value));
          }}
          valueLabelDisplay="auto"
          //valueLabelDisplay="auto"
          //getAriaValueText={valuetext}
        />
        <FormHelperText style={{ color: "red" }}>
          {errors[module?.name]}
        </FormHelperText>
      </div>
    );
  }

  if (module?.advanced_type === "slider") {
    return (
      <div className="form-group">
        <InputLabel>
          {module.label}{" "}
          {module.required ? <span style={{ color: "red" }}>*</span> : ""}
        </InputLabel>
        <CustomSlider
          defaultValue={30}
          step={10}
          marks
          min={module?.minValue || 0}
          max={module?.maxValue || 100}
          value={
            formValues[module.name] ? JSON.parse(formValues[module.name]) : 0
          }
          onChange={(e) => {
            //@ts-ignore
            updateInputValues(module.name, JSON.stringify(e.target.value));
          }}
          valueLabelDisplay="auto"
        />
        <FormHelperText style={{ color: "red" }}>
          {errors[module?.name]}
        </FormHelperText>
      </div>
    );
  }

  if (module?.advanced_type === "multi_select") {
    return (
      <div className="form-group">
        <MultiSelect
          options={module?.multi_select_option}
          module={module}
          updateInputValues={updateInputValues}
          errors={errors}
          formValues={formValues}
          themeSetting={themeSetting}
        />
      </div>
    );
  }

  if (module?.advanced_type === "image_select") {
    return (
      <div className="form-group">
        <MultiImageSelect
          options={module?.multi_select_image_option}
          module={module}
          updateInputValues={updateInputValues}
          errors={errors}
          formValues={formValues}
          themeSetting={themeSetting}
        />
      </div>
    );
  }

  if (module?.advanced_type === "image_select_checkbox") {
    return (
      <div className="form-group">
        <MultiImageSelect
          options={module.options}
          module={module}
          updateInputValues={updateInputValues}
          errors={errors}
          formValues={formValues}
          themeSetting={themeSetting}
        />
      </div>
    );
  }
  if (module?.advanced_type === "image_select_radio") {
    return (
      <div className="form-group">
        <MultiImageSelect
          options={module.options}
          module={module}
          updateInputValues={updateInputValues}
          errors={errors}
          formValues={formValues}
          themeSetting={themeSetting}
          type="radio"
        />
      </div>
    );
  }

  if (module?.advanced_type === "signature") {
    return (
      <div className="form-group">
        <Signature />
      </div>
    );
  }

  if (module?.advanced_type === "rating") {
    return (
      <div className="form-group">
        <InputLabel>
          {module.label}{" "}
          {module.required ? <span style={{ color: "red" }}>*</span> : ""}
        </InputLabel>
        <Rating
          module={module}
          updateInputValues={updateInputValues}
          errors={errors}
          formValues={formValues}
          helperText={errors[module?.name]}
        />
      </div>
    );
  }
  if (module?.advanced_type === "switch") {
    return (
      <div className="form-group">
        <Switch
          required={module.required}
          id={module.name}
          checked={formValues[module.name] == "true"}
          onChange={(e) => {
            updateInputValues(
              module.name,
              formValues[module.name] === "true" ? "" : "true"
            );
          }}
          name={module.name}
        />
        <FormLabel htmlFor={module.name}>
          {module.label}{" "}
          {module.required ? <span style={{ color: "red" }}>*</span> : null}
        </FormLabel>
        <FormHelperText style={{ color: "red" }}>
          {errors[module?.name]}
        </FormHelperText>
      </div>
    );
  }

  if (module?.fieldType === "text") {
    return (
      <div className="form-group">
        <TextField
          label={module.label}
          variant={themeSetting.type}
          InputLabelProps={{
            //@ts-ignore
            FormLabelClasses: {
              asterisk: "red",
            },
          }}
          required={module.required}
          helperText={errors[module?.name]}
          error={Boolean(errors[module?.name])}
          value={formValues[module.name]}
          onChange={(e) => {
            updateInputValues(module.name, e.target.value);
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
          helperText={errors[module?.name]}
          error={Boolean(errors[module?.name])}
          value={formValues[module.name]}
          onChange={(e) => {
            updateInputValues(module.name, e.target.value);
          }}
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
          label={module.label}
          variant={themeSetting.type}
          placeholder={module?.placeholder}
          InputProps={{
            inputComponent: TextareaAutosize,
            rows: 3,
          }}
          InputLabelProps={{
            //@ts-ignore
            FormLabelClasses: {
              asterisk: "red",
            },
          }}
          helperText={errors[module?.name]}
          error={Boolean(errors[module?.name])}
          value={formValues[module.name]}
          onChange={(e) => {
            updateInputValues(module.name, e.target.value);
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
          helperText={errors[module?.name]}
          error={Boolean(errors[module?.name])}
          value={formValues[module.name]}
          onChange={(e) => {
            updateInputValues(module.name, e.target.value);
          }}
        />
      </div>
    );
  }
  if (module?.fieldType === "date") {
    return (
      <div className="form-group date-picker">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={module.label}
            slotProps={{
              textField: {
                variant: themeSetting.type,
                required: module.required,
                helperText: errors[module?.name],
                name: module.name,
                error: Boolean(errors[module?.name]),
              },
            }}
            value={
              formValues[module.name] ? dayjs(formValues[module.name]) : null
            }
            onChange={(newValue) => {
              updateInputValues(module.name, newValue);
            }}
          />
        </LocalizationProvider>
      </div>
    );
  }

  if (module?.fieldType === "booleancheckbox") {
    return (
      <div className="form-group">
        <Checkbox
          required={module.required}
          id={module.name}
          checked={formValues[module.name] == "true"}
          onChange={(e) => {
            updateInputValues(
              module.name,
              formValues[module.name] === "true" ? "" : "true"
            );
          }}
          name={module.name}
        />
        <FormLabel htmlFor={module.name}>
          {module.label}{" "}
          {module.required ? <span style={{ color: "red" }}>*</span> : null}
        </FormLabel>
        <FormHelperText style={{ color: "red" }}>
          {errors[module?.name]}
        </FormHelperText>
      </div>
    );
  }
  if (module?.fieldType === "radio") {
    return (
      <div className="form-group">
        <FormControl error={Boolean(errors[module?.name])}>
          <FormLabel id={module.name}>
            {module.label}{" "}
            {module.required ? <span style={{ color: "red" }}>*</span> : null}
          </FormLabel>
          <RadioGroup
            aria-labelledby={module.name}
            name={module.name}
            value={formValues[module.name]}
            onChange={(e) => {
              updateInputValues(module.name, e.target.value);
            }}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            {module.options.map((item: any) => {
              return (
                <FormControlLabel
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              );
            })}
          </RadioGroup>
          <FormHelperText style={{ color: "red" }}>
            {errors[module?.name]}
          </FormHelperText>
        </FormControl>
      </div>
    );
  }

  if (module?.fieldType === "checkbox") {
    return (
      <div className="form-group">
        <FormControl error={Boolean(errors[module?.name])}>
          <FormLabel id={module.name}>
            {module.label}{" "}
            {module.required ? <span style={{ color: "red" }}>*</span> : null}
          </FormLabel>
          <FormGroup>
            {module.options.map((item: any, index: any) => {
              return (
                <FormControlLabel
                  key={index}
                  control={
                    <Checkbox
                      name={module.name}
                      value={item.value}
                      checked={formValues[module.name]?.includes(item.value)}
                      onChange={(e) => handleCheckboxChange(module, e)}
                    />
                  }
                  label={item.label}
                />
              );
            })}
          </FormGroup>
          <FormHelperText style={{ color: "red" }}>
            {errors[module?.name]}
          </FormHelperText>
        </FormControl>
      </div>
    );
  }
  if (module?.fieldType === "select") {
    return (
      <div className="form-group">
        <FormControl fullWidth>
          <InputLabel id={module.name}>
            {module.label}{" "}
            {module.required ? <span style={{ color: "red" }}>*</span> : ""}
          </InputLabel>
          <Select
            labelId={`${module.label} ${
              module.required ? <span style={{ color: "red" }}>*</span> : ""
            }`}
            //value={age}
            label={module.label}
            variant={themeSetting.type}
            //onChange={handleChange}
            required={module.required}
            error={Boolean(errors[module?.name])}
            value={formValues[module.name]}
            onChange={(e) => {
              updateInputValues(module.name, e.target.value);
            }}
            name={module.name}
          >
            {module.options.map((item: any) => {
              return <MenuItem value={item.value}>{item.label}</MenuItem>;
            })}
          </Select>
          <FormHelperText style={{ color: "red" }}>
            {errors[module?.name]}
          </FormHelperText>
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

  if (module?.fieldType === "stripe") {
    return (
      <StripeCard
        //@ts-ignore
        variant={themeSetting.type}
      />
    );
  }
  if (module?.fieldType === "image") {
    return <ImageBox module={module} />;
  }
  return <h1>{module?.fieldType}</h1>;
};

export function Column(props: any) {
  const { layoutIndex, colIndex, modules, ...rest } = props;
  const {
    deleteColumn,
    editColumn,
    themeSetting,
    moduleDrag,
    editModule,
    handleDndDrop,
    handleResize,
    selectedItem,
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
                draggable={selectedItem === null}
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
                <DraggableTextFeild module={module}></DraggableTextFeild>
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
    selectedItem,
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
            {/* {columns.some(
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
            )} */}
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
              draggable={selectedItem === null}
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

export function Layout(props: LayoutProps) {
  const { columns, layoutIndex, sectionOnDrop, maxWidth, ...rest } = props;

  return (
    <div className="layout-box preview" {...rest}>
      <div
        className="layout-inner"
        data-index={layoutIndex}
        style={{ maxWidth: maxWidth }}
      >
        {columns?.map((column: any, index: number) => {
          return (
            <PreviewColumn
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
              modules={column?.modules}
            />
          );
        })}
      </div>
    </div>
  );
}

export function PreviewColumn(props: any) {
  const { layoutIndex, colIndex, modules, ...rest } = props;
  const { themeSetting, errors, canShow } = useBuilder();

  return (
    <div {...rest} className={`droparea preview`} data-index={colIndex}>
      {modules?.length && (
        <>
          {modules?.map((module: any) => {
            return (
              <DraggableTextFeild
                module={module}
                isPreview={true}
              ></DraggableTextFeild>
            );
          })}
        </>
      )}
    </div>
  );
}
