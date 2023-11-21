import { Stack, TextFieldProps, Typography } from '@mui/material';
import { forwardRef } from 'react';

import { StyledTextfield } from './TextfieldWithSubtitle.styles';

interface Props extends Omit<TextFieldProps, 'label,fullWidth'> {
  label?: string;
  subtitle?: string;
  fullWidth?: boolean;
}

// eslint-disable-next-line react/display-name
const TextfieldWithSubtitle = forwardRef((props: Props, ref) => {
  const { label, fullWidth = false, subtitle, ...other } = props;
  return (
    <Stack width={fullWidth ? '100%' : 'auto'}>
      <Typography variant="caption">{label}</Typography>
      <StyledTextfield
        id="component-helper"
        variant="outlined"
        fullWidth={fullWidth}
        {...other}
        ref={ref}
        helperText={subtitle}
      />
    </Stack>
  );
});

export default TextfieldWithSubtitle;
