import React from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  options: any[];
  module: any;
  updateInputValues: Function;
  errors: any;
  formValues: any;
  themeSetting: any;
}

export default function MultiSelect(props: Props) {
  const {
    options = [],
    module,
    updateInputValues,
    themeSetting,
    errors,
    formValues,
  } = props;
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option?.title}
      disableCloseOnSelect
      onChange={(event, newValue) => {
        console.log("newValue", newValue);
        if (newValue.length === 0) {
          updateInputValues(
            module.name,
            //@ts-ignore
            null
          );
        } else {
          updateInputValues(
            module.name,
            //@ts-ignore
            newValue
          );
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant={themeSetting.type}
          label={`${module.label} `}
          required={module.required}
          InputLabelProps={{
            //@ts-ignore
            FormLabelClasses: {
              asterisk: "red",
            },
          }}
          placeholder={module.placeholder}
          helperText={errors[module?.name]}
          error={Boolean(errors[module?.name])}
          value={formValues[module.name]}
          name={module.name}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <MenuItem
          {...props}
          key={option.title}
          value={option.title}
          sx={{ justifyContent: "space-between" }}
        >
          {option.title}
          {selected ? <CheckIcon color="info" /> : null}
        </MenuItem>
      )}
    />
  );
}
