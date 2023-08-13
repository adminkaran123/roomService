import { Stack, TextFieldProps, Typography } from '@mui/material';
import { forwardRef } from 'react';

import TextField from '../textField/TextField';
import { InputWrapper } from './TextfieldWithLabel.styles';

interface Props extends Omit<TextFieldProps, 'label,fullWidth'> {
  label?: string;
  fullWidth?: boolean;
  isRequired?: boolean;
  prefix?: string;
}

// eslint-disable-next-line react/display-name
const TextfieldWithLabel = forwardRef((props: Props, ref) => {
  const {
    label,
    fullWidth = false,
    isRequired = false,
    prefix = '',
    ...other
  } = props;
  return (
    <InputWrapper
      width={fullWidth ? '100%' : 'auto'}
      className={prefix !== '' ? 'has-prefix' : ''}
    >
      <Typography variant="caption">
        {label}
        {isRequired && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      {prefix && <span className="prefix">{prefix}</span>}
      <TextField fullWidth={fullWidth} {...other} ref={ref} />
    </InputWrapper>
  );
});

export default TextfieldWithLabel;
