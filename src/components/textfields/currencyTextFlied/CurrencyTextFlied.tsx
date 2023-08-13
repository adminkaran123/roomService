import { TextFieldProps } from '@mui/material';
import { Typography } from '@mui/material';
import { forwardRef } from 'react';

import { StyledTextfield } from './CurrencyTextFlied.styles';

interface Props extends Omit<TextFieldProps, ''> {
  isRequired?: boolean;
  onValueChange?: any;
}

// eslint-disable-next-line react/display-name
const TextField = forwardRef((props: Props, ref) => {
  const { label, isRequired, error, helperText, ...other } = props;
  return (
    <>
      <Typography variant="caption">
        {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      <StyledTextfield
        {...other}
        error={error}
        /*
     // @ts-ignore */
        ref={ref!}
      />
      {error && (
        <Typography variant="caption" color="error">
          {helperText}
        </Typography>
      )}
    </>
  );
});
export default TextField;
