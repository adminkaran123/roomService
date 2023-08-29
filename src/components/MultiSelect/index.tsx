import React from "react";
import { TextField, Autocomplete, MenuItem } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface Props {
  options: any[];
}

export default function MultiSelect(props: Props) {
  const { options = [] } = props;
  return (
    <Autocomplete
      multiple
      options={options}
      getOptionLabel={(option) => option?.title}
      disableCloseOnSelect
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label="Multiple Autocomplete"
          placeholder="Multiple Autocomplete"
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
