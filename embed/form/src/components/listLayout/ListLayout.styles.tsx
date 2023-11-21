import { Box, Button, Divider, styled } from '@mui/material';

export const TitleDivider = styled(Divider)`
  border-width: 1px;
  margin-top: 8px;
  border-color: ${(p) => p.theme.palette.grey[500]};
`;

export const OptionsBox = styled(Box)`
  padding-top: 10px;
  padding-bottom: 10px;
`;
export const GoBackButton = styled(Button)`
  position: absolute;
  color: white;
  margin-top: 20px;
`;
