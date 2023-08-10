import { TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

import { StyledTextfield } from "./TextField.styles";

interface Props extends Omit<TextFieldProps, ""> {
  rowReverse?: boolean;
}

// eslint-disable-next-line react/display-name
const TextField = forwardRef((props: Props, ref) => {
  const { rowReverse, ...other } = props;
  return (
    <StyledTextfield
      {...other}
      /*
     // @ts-ignore */
      ref={ref!}
      rowreverse={(!!rowReverse)?.toString()}
    />
  );
});
export default TextField;
