import { Select, styled } from '@mui/material';

export const CustomSelect = styled(Select)`
  border: 1px solid ${(p) => p.theme.palette.grey[500]};
  &&.Mui-error {
    border: 1px solid transparent;
  }
`;
