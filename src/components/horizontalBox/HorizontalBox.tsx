import { BoxProps } from "@mui/material";
import { memo } from "react";

import { InlineBox } from "./HorizontalBox.styles";

interface Props extends BoxProps {
  children: any;
}

function HorizontalBox(props: Props) {
  const { children, ...other } = props;
  return <InlineBox {...other}>{children}</InlineBox>;
}

export default memo(HorizontalBox);
