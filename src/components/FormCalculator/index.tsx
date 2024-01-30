import {
  Select,
  MenuItem,
  Card,
  CardContent,
  InputLabel,
  FormControl,
  TextField,
  Typography,
  Stack,
  Switch,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { Wrapper } from "./FormCalculator.styles";
import useFormLogic from "./FormCalculator.hooks";
import FormEditor from "../../components/Editor";

import { calculatorValue } from "../../utils/constants/constants";

export default function FormCalculator() {
  const {
    moduleList,
    selectedIndex,
    setSelectedIndex,
    updateValue,
    updateResultValue,
    calcResult,
    addMultiOption,
    updateMultiValue,
    deleteMultipleValue,
  } = useFormLogic();
  return (
    <Wrapper>
      <Card>
        <CardContent className="logic_box">
          <Typography textAlign="center" variant="h3" marginBottom="10px">
            Map Calulation Value{" "}
          </Typography>
          {moduleList()?.map((module, index) => {
            let optionKey =
              module.advanced_type == "multi_select"
                ? "multi_select_option"
                : module.advanced_type == "image_select"
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
                    module.fieldType != "number" ? (
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
          <div className="content-box">
            <Stack>
              <Typography textAlign="center" variant="h3" marginBottom="10px">
                Result Page Settings
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                padding="10px"
              >
                <Typography variant="h5">Show Result on End Page</Typography>
                <Switch
                  checked={calcResult?.show}
                  size="medium"
                  onChange={() => {
                    updateResultValue("show", !calcResult?.show);
                  }}
                />
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                padding="10px"
              >
                <Typography variant="h5">
                  Show Diffrent Message Based on Result
                </Typography>
                <Switch
                  checked={calcResult?.multiple}
                  size="medium"
                  onChange={() => {
                    updateResultValue("multiple", !calcResult?.multiple);
                  }}
                />
              </Stack>
              {!calcResult?.multiple && (
                <FormEditor
                  editorHtml={JSON.parse(calcResult?.singleData || "")}
                  setEditorHtml={(html: any) => {
                    updateResultValue("singleData", JSON.stringify(html));
                  }}
                />
              )}

              {calcResult?.multiple && (
                <div className="multple-box">
                  <Divider />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    marginTop="10px"
                  >
                    <Typography variant="h5">Add Result Variant</Typography>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={addMultiOption}
                    >
                      Add
                    </Button>
                  </Stack>
                  <Stack spacing={2} marginTop="20px">
                    {calcResult.multiType.map((item: any, index: number) => {
                      return (
                        <Stack spacing={2} key={`item_${index}`}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                type="number"
                                label="Minimum Value"
                                value={item.min}
                                onChange={(e) => {
                                  updateMultiValue(
                                    "min",
                                    index,
                                    e.target.value
                                  );
                                }}
                                required
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                type="number"
                                label="Maximum Value"
                                value={item.max}
                                onChange={(e) => {
                                  updateMultiValue(
                                    "max",
                                    index,
                                    e.target.value
                                  );
                                }}
                                required
                              />
                            </Grid>
                          </Grid>
                          <FormEditor
                            editorHtml={JSON.parse(item.content || "")}
                            setEditorHtml={(html: any) => {
                              updateMultiValue(
                                "content",
                                index,
                                JSON.stringify(html)
                              );
                            }}
                          />
                          <TextField
                            placeholder="Redirect URL"
                            value={item.redirect_url}
                            onChange={(e) => {
                              updateMultiValue(
                                "redirect_url",
                                index,
                                e.target.value
                              );
                            }}
                          />
                          <Stack direction="row" justifyContent="flex-end">
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => deleteMultipleValue(index)}
                            >
                              Delete
                            </Button>
                          </Stack>

                          <Divider />
                        </Stack>
                      );
                    })}
                  </Stack>
                </div>
              )}
            </Stack>
          </div>
        </CardContent>
      </Card>
    </Wrapper>
  );
}
