import React from "react";
import ReactPhoneInput from "react-phone-input-material-ui";
import { TextField, withStyles } from "@mui/material";

function PhoneField(props: any) {
  const { value, defaultCountry, onChange, classes } = props;

  return (
    <React.Fragment>
      {/* Simple usage */}

      {/* Configure more */}
      <ReactPhoneInput
        value={value}
        //@ts-ignore
        defaultCountry={defaultCountry || "gb"}
        onChange={onChange}
        component={TextField}
      />
    </React.Fragment>
  );
}

export default PhoneField;
