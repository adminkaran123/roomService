import { styled } from '@mui/material';

import TextField from '../textField/TextField';

export const StyledTextfield = styled(TextField)`
  margin-top: 2px;

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${(p) => p.theme.palette.success.main};
    }
    padding-top: 0px;
    padding-bottom: 15px;
  }

  .MuiFormHelperText-root {
    position: absolute;
    padding-top: 21px;
    padding-left: 2px;
    color: ${(p) => p.theme.palette.grey[500]};
  }

  .MuiOutlinedInput-input::placeholder {
    padding-top: 8px;
    position: fixed;
  }

  .MuiOutlinedInput-input:focus::placeholder {
    color: transparent;
  }
`;
