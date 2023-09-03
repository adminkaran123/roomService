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
import Delete from "@mui/icons-material/Delete";
import useFormLogic from "./FormLogic.hooks";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  logicOptionsDropDown,
  logicOptionsDropDownBoolea,
  logicOptionsSelect,
  logicOptionsCheckbox,
  logicOptionsDate,
} from "../../utils/constants/constants";

export default function FormLogic() {
  const {
    logicData,
    moduleList,
    selectedInput,
    setSelectedInput,
    addLogic,
    addingData,
    chnageLogicType,
    cancelAdd,
    updateIfValue,
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

              {logicData.length > 0 ? (
                <Card className="custom_box">
                  <Stack spacing={1}>
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
                          style={{
                            color: "#2c2c2c",
                          }}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          style={{
                            color: "rgb(239, 83, 80)",
                          }}
                        >
                          <Delete />
                        </Button>
                      </ButtonGroup>
                    </Stack>
                    <Divider />
                    <Stack>
                      <Typography>if</Typography>
                      <Typography>test value</Typography>
                      <Typography>empty</Typography>
                    </Stack>
                  </Stack>
                </Card>
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
                        <Stack
                          marginTop="20px"
                          direction="row"
                          alignItems="center"
                        >
                          <Typography variant="h6" paddingRight="10px">
                            If
                          </Typography>
                          <FormControl fullWidth>
                            <InputLabel id={"name"}>Select Input</InputLabel>
                            <Select
                              labelId={"name"}
                              //value={age}
                              label="Select Input"
                              variant="outlined"
                              value={JSON.stringify(ifItem.input)}
                              onChange={(e) => {
                                //@ts-ignore
                                updateIfValue(
                                  "input",
                                  JSON.parse(e.target.value),
                                  index
                                );
                                updateIfValue("condition", "", index);
                                updateIfValue("compareValue", "", index);
                              }}
                            >
                              {moduleList().map((module) => {
                                return (
                                  <MenuItem
                                    key={module.name}
                                    value={JSON.stringify(module)}
                                  >
                                    {module.label}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
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
                                  ifItem.input?.advanced_type !==
                                    "multi_select" &&
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
                              </Select>
                            </FormControl>

                            {ifItem.input?.fieldType !== "booleancheckbox" &&
                              ifItem.condition != "filled" &&
                              ifItem.condition != "empty" && (
                                <FormControl fullWidth>
                                  {ifItem.input?.fieldType == "text" &&
                                    ifItem.input?.advanced_type !=
                                      "multi_select" && (
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

                                  {ifItem.input?.fieldType == "date" && (
                                    <LocalizationProvider
                                      dateAdapter={AdapterDayjs}
                                    >
                                      <DatePicker
                                        label="Select Date"
                                        value={ifItem.compareValue || null}
                                        onChange={(newValue) =>
                                          updateIfValue(
                                            "compareValue",
                                            newValue,
                                            index
                                          )
                                        }
                                      />
                                    </LocalizationProvider>
                                  )}

                                  {(ifItem.input?.fieldType == "select" ||
                                    ifItem.input?.fieldType == "checkbox" ||
                                    ifItem.input?.advanced_type ==
                                      "multi_select" ||
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
                                          "multi_select " &&
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

                                        {ifItem.input.advanced_type !==
                                          "multi_select " &&
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
                                      </Select>
                                    </>
                                  )}
                                </FormControl>
                              )}
                          </Stack>
                        )}
                      </Stack>
                    );
                  })}

                  <Stack direction="row" justifyContent="center">
                    <Button variant="contained" className="add_btn">
                      <AddIcon />
                    </Button>
                  </Stack>
                </Stack>
              </Card>

              <Card className="custom_box">
                <Stack spacing={1} marginTop={"10px"}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">Then</Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    marginTop="20px"
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <FormControl style={{ width: "150px" }}>
                      <Select
                        //value={age}

                        variant="outlined"
                        value="show"

                        ///onChange={handleChange}
                      >
                        <MenuItem value="show">Show</MenuItem>
                        <MenuItem value="hide">Hide</MenuItem>
                        <MenuItem value="go">Go</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id={"name"}>Select Input</InputLabel>
                      <Select
                        labelId={"name"}
                        //value={age}
                        label="Select Input"
                        variant="outlined"
                        ///onChange={handleChange}
                      >
                        <MenuItem value="Option 1">Option 1</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Stack>
              </Card>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-end"
              >
                <Button variant="contained" size="large">
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
