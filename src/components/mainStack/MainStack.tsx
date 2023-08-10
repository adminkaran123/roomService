import { StackProps } from '@mui/material';

import { StyledStack } from './MainStack.styles';

interface Props extends StackProps {
  title?: string;
  children: any;
}

function MainStack(props: Props) {
  const { children, ...other } = props;
  return (
    <StyledStack spacing={2} {...other}>
      {children}
    </StyledStack>
  );
}
export default MainStack;
