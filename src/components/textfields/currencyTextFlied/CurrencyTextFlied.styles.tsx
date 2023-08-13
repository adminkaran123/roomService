import { styled, TextField } from '@mui/material';
import CurrencyInput from 'react-currency-input-field';

// Material ui needs all the props attribute in lower case, Hence rowreverse is in lowercase.

export const StyledTextfield = styled(CurrencyInput)`
  font-weight: 100;
  border: 1px solid
    ${(p) => {
      //@ts-ignore
      return p.error ? p.theme.palette.error.main : p.theme.palette.grey[500];
    }};
  padding: 16.5px 14px;
  border-radius: 8px;
  background: transparent;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  font-family: Public Sans;
  color: #fff;
`;
