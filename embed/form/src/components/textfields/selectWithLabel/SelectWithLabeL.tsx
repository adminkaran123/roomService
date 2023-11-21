import { SelectProps, Stack, Typography } from '@mui/material';

import { CustomSelect } from './SelectWithLabel.styles';

interface Props extends Omit<SelectProps, 'label'> {
  label?: string;
  isRequired?: boolean;
  helperText?: string;
}

function SelectWithLabel(props: Props) {
  const { label, value, isRequired = false, helperText, ...other } = props;
  return (
    <Stack>
      <Typography variant="caption">
        {label}
        {isRequired && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      <CustomSelect color="success" value={value} {...other} />
      {helperText && (
        <Typography
          variant="caption"
          style={{ paddingTop: '8px', marginLeft: '14px', color: '#FF4842' }}
        >
          {helperText}
        </Typography>
      )}
    </Stack>
  );
}
export default SelectWithLabel;
