import { StackProps } from "@mui/material";

import { StyledStack } from "./MainStack.styles";

interface Props extends StackProps {
  title?: string;
  children: any;
}

function MainStack(props: Props) {
  const { children } = props;
  return <StyledStack spacing={2}>{children}</StyledStack>;
}
export default MainStack;
