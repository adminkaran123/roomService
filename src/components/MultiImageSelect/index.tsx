import React from "react";
import { Checkbox, InputLabel, FormGroup, FormHelperText } from "@mui/material";
import { StyledImage, OptionsWrapper } from "./MultiImageSelect.styles";
import ImageIcon from "@mui/icons-material/Image";
import CheckIcon from "@mui/icons-material/Check";
import useMultiImageSelect from "./MultiImageSelect.hooks";

interface Props {
  options: any[];
  module: any;
  updateInputValues: Function;
  errors: any;
  formValues: any;
  themeSetting: any;
  type?: string;
}

function MultiImageSelect(props: Props) {
  const {
    options,
    module,
    type = "checkbox",
    themeSetting,
    errors,
    updateInputValues,
    formValues,
  } = props;
  const { handleOptionSelect } = useMultiImageSelect(
    updateInputValues,
    formValues
  );

  return (
    <OptionsWrapper {...themeSetting}>
      <InputLabel>
        {module.label}
        {module.required && <span style={{ color: "red" }}>*</span>}
      </InputLabel>
      <ul>
        {options?.map((option: any, index) => {
          return (
            <li key={`item_${module.name + index}`}>
              <input
                type="checkbox"
                id={`item_${module.name + index}`}
                name={module.name}
                value={option.value || option.label}
                checked={
                  formValues[module.name]
                    ? type !== "radio"
                      ? formValues[module.name]?.includes(
                          option.value || option.label
                        )
                      : formValues[module.name] === option.value ||
                        formValues[module.name] === option.label
                    : false
                }
                onChange={() => {
                  handleOptionSelect(
                    module.name,
                    option.value || option.label,
                    type
                  );
                }}
              />
              <label htmlFor={`item_${module.name + index}`}>
                {option.image ? (
                  <img src={option.image} />
                ) : (
                  <div className="image-box">
                    <ImageIcon />
                  </div>
                )}

                <p>{option.title || option.label} </p>
                <div className="checked">
                  <CheckIcon />
                </div>
              </label>
            </li>
          );
        })}

        {!Boolean(options) && (
          <li>
            <label htmlFor={`add_item`}>
              <div className="image-box">
                <ImageIcon />
              </div>
              <p>Add Image Options</p>
            </label>
          </li>
        )}
      </ul>
      <FormHelperText style={{ color: "red" }}>
        {errors[module?.name]}
      </FormHelperText>
    </OptionsWrapper>
  );
}

export default MultiImageSelect;
