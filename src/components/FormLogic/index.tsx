import React from "react";
import {
  Select,
  MenuItem,
  Stack,
  Card,
  Button,
  CardContent,
  InputLabel,
  IconButton,
  FormControl,
  Divider,
  ButtonGroup,
  Autocomplete,
  Typography,
  TextField,
} from "@mui/material";
import { Wrapper } from "./FormLogic.styles";
import SelectWithLabel from "../textfields/selectWithLabel/SelectWithLabeL";
import IconSvg from "../Icon/IconSvg";
import { ADD_ICON } from "../../utils/constants/svgContstants";
import AddIcon from "@mui/icons-material/Add";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditIcon from "@mui/icons-material/Edit";
import useFormLogic from "./FormLogic.hooks";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import {
  logicOptionsDropDown,
  logicOptionsDropDownBoolea,
  logicOptionsSelect,
  logicOptionsCheckbox,
  logicOptionsDate,
  logicOptionsFile,
} from "../../utils/constants/constants";
import { Delete } from "@mui/icons-material";

export default function FormLogic() {
  const {
    logicData,
    moduleList,
    addLogic,
    addingData,
    chnageLogicType,
    cancelAdd,
    updateIfValue,
    addIfLogic,
    deleteIf,
    updateThenValue,
    addThenLogic,
    layoutData,
    deleteThen,
    saveLogic,
    deleteLogic,
    editLogic,
    isIfIncluded,
  } = useFormLogic();
  return (
    <Wrapper>
      <Card>
        <CardContent className="logic_box">
          {addingData === null ? (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h5">Forms Logic</Typography>
                <Button
                  startIcon={<IconSvg icon={ADD_ICON} />}
                  size="large"
                  variant="contained"
                  onClick={addLogic}
                  style={{ color: "#fff" }}
                >
                  Add Logic
                </Button>
              </Stack>

              {logicData?.length > 0 ? (
                <>
                  {logicData?.map((logic: any, index: number) => {
                    return (
                      <Card className="custom_box" key={`item_${index}`}>
                        <Stack spacing={1}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography variant="h6">{logic.title}</Typography>
                            <ButtonGroup
                              variant="outlined"
                              aria-label="outlined button group"
                            >
                              <Button
                                style={{
                                  color: "#2c2c2c",
                                }}
                                onClick={() => {
                                  editLogic(logic, index);
                                }}
                              >
                                <EditIcon />
                              </Button>
                              <Button
                                style={{
                                  color: "rgb(239, 83, 80)",
                                }}
                                onClick={() => deleteLogic(index)}
                              >
                                <Delete />
                              </Button>
                            </ButtonGroup>
                          </Stack>
                        </Stack>
                      </Card>
                    );
                  })}
                </>
              ) : (
                <h2 style={{ textAlign: "center" }}>No Logic Added</h2>
              )}
            </>
          ) : (
            <>
              <Card className="custom_box">
                <Stack spacing={1} marginTop={"10px"}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">Condition</Typography>
                    <ButtonGroup
                      variant="outlined"
                      aria-label="outlined button group"
                    >
                      <Button
                        onClick={() => {
                          chnageLogicType("or");
                        }}
                        variant={`${
                          addingData?.type == "or" ? "contained" : "outlined"
                        }`}
                      >
                        Or{" "}
                      </Button>
                      <Button
                        onClick={() => {
                          chnageLogicType("and");
                        }}
                        variant={`${
                          addingData?.type == "and" ? "contained" : "outlined"
                        }`}
                      >
                        And
                      </Button>
                    </ButtonGroup>
                  </Stack>
                  <Divider />
                  {addingData.ifItems.map((ifItem: any, index: number) => {
                    return (
                      <Stack spacing={2} key={`item_${index}`}>
                        {index > 0 && (
                          <Typography variant="h5" textAlign="center">
                            {addingData?.type}
                          </Typography>
                        )}
                        <Stack
                          marginTop="20px"
                          direction="row"
                          alignItems="center"
                          paddingRight="50px"
                          style={{ position: "relative" }}
                        >
                          <Typography variant="h6" paddingRight="10px">
                            If
                          </Typography>
                          <FormControl fullWidth>
                            <Autocomplete
                              id={`name-${index}`}
                              options={moduleList()}
                              getOptionLabel={(option) => option.label}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Input"
                                  variant="outlined"
                                />
                              )}
                              value={ifItem.input || null}
                              onChange={(event, newValue) => {
                                if (newValue) {
                                  updateIfValue("input", newValue, index);
                                }
                              }}
                            />
                          </FormControl>
                          <IconButton
                            className="if_delete_btn"
                            disabled={addingData.ifItems.length == 1}
                            onClick={() => {
                              deleteIf(index);
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                        {ifItem.input !== "" && (
                          <Stack
                            marginTop="20px"
                            direction="row"
                            alignItems="center"
                            paddingLeft={"20px"}
                            spacing={2}
                          >
                            <FormControl fullWidth>
                              <InputLabel id={`item_${index}`}>
                                Condition
                              </InputLabel>
                              <Select
                                labelId={`item_${index}`}
                                //value={age}
                                label="Select Input"
                                variant="outlined"
                                value={ifItem.condition}
                                onChange={(e) => {
                                  //@ts-ignore
                                  updateIfValue(
                                    "condition",
                                    e.target.value,
                                    index
                                  );
                                }}
                              >
                                {ifItem.input?.fieldType ===
                                  "booleancheckbox" &&
                                  logicOptionsDropDownBoolea.map((option) => {
                                    return (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    );
                                  })}

                                {ifItem.input?.fieldType !==
                                  "booleancheckbox" &&
                                  ifItem.input?.fieldType !== "date" &&
                                  ifItem.input?.fieldType !== "select" &&
                                  ifItem.input?.fieldType !== "checkbox" &&
                                  ifItem.input?.fieldType !== "radio" &&
                                  ifItem.input?.advanced_type !==
                                    "multi_select" &&
                                  ifItem.input?.advanced_type !==
                                    "browse_file" &&
                                  logicOptionsDropDown.map((option) => {
                                    return (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    );
                                  })}

                                {(ifItem.input?.fieldType === "select" ||
                                  ifItem.input?.fieldType === "radio") &&
                                  logicOptionsSelect.map((option) => {
                                    return (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    );
                                  })}
                                {(ifItem.input?.fieldType === "checkbox" ||
                                  ifItem.input?.advanced_type ===
                                    "multi_select") &&
                                  logicOptionsCheckbox.map((option) => {
                                    return (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    );
                                  })}
                                {ifItem.input?.fieldType === "date" &&
                                  logicOptionsDate.map((option) => {
                                    return (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    );
                                  })}
                                {ifItem.input?.advanced_type ===
                                  "browse_file" &&
                                  logicOptionsFile.map((option) => {
                                    return (
                                      <MenuItem
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>

                            {ifItem.input?.fieldType !== "booleancheckbox" &&
                              ifItem.condition != "filled" &&
                              ifItem.condition != "empty" && (
                                <FormControl fullWidth>
                                  {(ifItem.input?.fieldType == "text" ||
                                    ifItem.input?.fieldType == "textarea") &&
                                    ifItem.input?.advanced_type !=
                                      "multi_select" &&
                                    ifItem.input?.advanced_type !=
                                      "image_select" && (
                                      <TextField
                                        id={`item_compareValue__${index}`}
                                        label="Value"
                                        value={ifItem.compareValue}
                                        onChange={(e) => {
                                          //@ts-ignore
                                          updateIfValue(
                                            "compareValue",
                                            e.target.value,
                                            index
                                          );
                                        }}
                                      />
                                    )}

                                  {(ifItem.input?.fieldType == "select" ||
                                    ifItem.input?.fieldType == "checkbox" ||
                                    ifItem.input?.advanced_type ==
                                      "multi_select" ||
                                    ifItem.input?.advanced_type ==
                                      "image_select" ||
                                    ifItem.input?.fieldType == "radio") && (
                                    <>
                                      <InputLabel
                                        id={`item_compareValue__${index}`}
                                      >
                                        Value
                                      </InputLabel>
                                      <Select
                                        labelId={`item_compareValue__${index}`}
                                        //value={age}
                                        label="Value"
                                        variant="outlined"
                                        value={ifItem.compareValue}
                                        onChange={(e) => {
                                          //@ts-ignore
                                          updateIfValue(
                                            "compareValue",
                                            e.target.value,
                                            index
                                          );
                                        }}
                                      >
                                        {ifItem.input.advanced_type !==
                                          "multi_select" &&
                                          ifItem.input.advanced_type !==
                                            "image_select" &&
                                          ifItem.input?.options.map(
                                            (option: any) => {
                                              return (
                                                <MenuItem
                                                  key={option.value}
                                                  value={option.value}
                                                >
                                                  {option.label}
                                                </MenuItem>
                                              );
                                            }
                                          )}

                                        {ifItem.input.advanced_type ===
                                          "multi_select" &&
                                          ifItem.input?.multi_select_option?.map(
                                            (option: any, index: number) => {
                                              return (
                                                <MenuItem
                                                  key={`item_${index}`}
                                                  value={option.title}
                                                >
                                                  {option.title}
                                                </MenuItem>
                                              );
                                            }
                                          )}

                                        {ifItem.input.advanced_type ===
                                          "image_select" &&
                                          ifItem.input?.multi_select_image_option?.map(
                                            (option: any, index: number) => {
                                              return (
                                                <MenuItem
                                                  key={`item_${index}`}
                                                  value={option.label}
                                                >
                                                  {option.label}
                                                </MenuItem>
                                              );
                                            }
                                          )}
                                      </Select>
                                    </>
                                  )}
                                  {ifItem.input?.fieldType == "date" && (
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Select Date"
                                        value={
                                          ifItem?.compareValue
                                            ? dayjs(ifItem?.compareValue)
                                            : null
                                        }
                                        onChange={(newValue: any) => {
                                          updateIfValue(
                                            "compareValue",
                                            newValue,
                                            index
                                          );
                                        }}
                                      />
                                    </LocalizationProvider>
                                  )}
                                </FormControl>
                              )}
                          </Stack>
                        )}
                      </Stack>
                    );
                  })}

                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      className="add_btn"
                      onClick={addIfLogic}
                    >
                      <AddIcon />
                    </Button>
                  </Stack>
                </Stack>
              </Card>

              <Card className="custom_box">
                <Stack spacing={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">Then</Typography>
                  </Stack>

                  <Divider />
                  {addingData.thenItems.map((thenItem: any, index: number) => {
                    return (
                      <>
                        <Stack spacing={1}>
                          <Stack
                            marginTop="20px"
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            style={{ position: "relative" }}
                            paddingRight="60px"
                          >
                            <FormControl style={{ width: "200px" }}>
                              <Select
                                //value={age}

                                variant="outlined"
                                value={thenItem.type}
                                onChange={(event) => {
                                  updateThenValue(
                                    "type",
                                    event.target.value,
                                    index
                                  );
                                }}
                              >
                                <MenuItem value="show">Show Input</MenuItem>
                                <MenuItem value="hide">Hide Input</MenuItem>
                                <MenuItem value="show_slide">
                                  Show Slide
                                </MenuItem>
                                <MenuItem value="hide_slide">
                                  Hide Slide
                                </MenuItem>
                              </Select>
                            </FormControl>
                            {(thenItem.type == "show" ||
                              thenItem.type == "hide") && (
                              <FormControl fullWidth>
                                <Autocomplete
                                  id={`name-${index}`}
                                  options={moduleList()}
                                  getOptionLabel={(option) => option.label}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      label="Select Input"
                                      variant="outlined"
                                    />
                                  )}
                                  value={thenItem.input || null}
                                  onChange={(event, newValue) => {
                                    if (newValue) {
                                      console.log("newValue", newValue);
                                      updateThenValue("input", newValue, index);
                                    }
                                  }}
                                />
                              </FormControl>
                            )}
                            {(thenItem.type == "show_slide" ||
                              thenItem.type == "hide_slide") && (
                              <FormControl fullWidth>
                                <Select
                                  //value={age}

                                  variant="outlined"
                                  value={thenItem.input}
                                  onChange={(event) => {
                                    updateThenValue(
                                      "input",
                                      event.target.value,
                                      index
                                    );
                                  }}
                                >
                                  {layoutData.map(
                                    (layout: any, index: number) => {
                                      if (isIfIncluded(layout)) {
                                        return null;
                                      }
                                      return (
                                        <MenuItem
                                          key={`item_${index}`}
                                          value={index}
                                        >
                                          <strong>Slide no:{index + 1}</strong>{" "}
                                          {" " + layout.slide_title}
                                        </MenuItem>
                                      );
                                    }
                                  )}

                                  {/* <MenuItem value="go">Go</MenuItem> */}
                                </Select>
                              </FormControl>
                            )}
                            <IconButton
                              className="if_delete_btn then"
                              disabled={addingData.thenItems.length == 1}
                              onClick={() => {
                                deleteThen(index);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </>
                    );
                  })}
                  <Stack direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      className="add_btn"
                      onClick={addThenLogic}
                    >
                      <AddIcon />
                    </Button>
                  </Stack>
                </Stack>
              </Card>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button variant="contained" size="large" onClick={saveLogic}>
                  Save
                </Button>
                <Button variant="outlined" size="large" onClick={cancelAdd}>
                  Cancel
                </Button>
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </Wrapper>
  );
}
