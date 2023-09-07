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
import { Wrapper } from "./FormCalculator.styles";
import IconSvg from "../Icon/IconSvg";
import { ADD_ICON } from "../../utils/constants/svgContstants";
import AddIcon from "@mui/icons-material/Add";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditIcon from "@mui/icons-material/Edit";
import useFormLogic from "./FormCalculator.hooks";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { calculatorValue } from "../../utils/constants/constants";
import { Delete } from "@mui/icons-material";

export default function FormCalculator() {
  const { moduleList, selectedIndex, setSelectedIndex, updateValue } =
    useFormLogic();
  return (
    <Wrapper>
      <Card>
        <CardContent className="logic_box">
          {moduleList()?.map((module, index) => {
            let optionKey =
              module.advanced_type == "multi_select"
                ? "multi_select_option"
                : module.advanced_type == "multi_select"
                ? "multi_select_image_option"
                : "options";
            return (
              <div className="accordian_item_wrapper">
                <button
                  className={`${
                    selectedIndex === index ? "active" : ""
                  } accordian_title `}
                  onClick={() => {
                    setSelectedIndex(selectedIndex !== index ? index : -1);
                  }}
                >
                  {module.label}
                </button>
                {selectedIndex == index && (
                  <>
                    {module.advanced_type != "slider" &&
                    module.advanced_type != "number" ? (
                      module[optionKey]?.map((option: any, index: number) => {
                        return (
                          <div
                            className="accordian_item"
                            key={`${index + module.name}`}
                          >
                            <div className="option_name">
                              {option.label || option.title}
                            </div>

                            <div className="option_opreator">
                              <FormControl fullWidth>
                                <InputLabel id={`item_${index}`}>
                                  Operator
                                </InputLabel>
                                <Select
                                  value={option.operator}
                                  onChange={(e) => {
                                    updateValue(
                                      module.name,
                                      optionKey,
                                      "operator",
                                      index,
                                      e.target.value
                                    );
                                  }}
                                  label="Operator"
                                >
                                  {calculatorValue.map((option) => (
                                    <MenuItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </div>
                            <div className="option_value">
                              <TextField
                                label="Value"
                                value={option.calc_value}
                                type="number"
                                onChange={(e) => {
                                  updateValue(
                                    module.name,
                                    optionKey,
                                    "calc_value",
                                    index,
                                    e.target.value
                                  );
                                }}
                              ></TextField>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div
                        className="accordian_item single_value"
                        key={`${index + module.name}`}
                      >
                        <div className="option_name">
                          For Input type Slide and Number you can select
                          opreator only
                        </div>
                        <div className="option_opreator">
                          <FormControl fullWidth>
                            <InputLabel id={`item_${index}`}>
                              Operator
                            </InputLabel>
                            <Select
                              value={module.operator}
                              onChange={(e) => {
                                updateValue(
                                  module.name,
                                  "",
                                  "operator",
                                  index,
                                  e.target.value
                                );
                              }}
                              label="Operator"
                            >
                              {calculatorValue.map((option) => (
                                <MenuItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    )}
                    {}
                  </>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </Wrapper>
  );
}
