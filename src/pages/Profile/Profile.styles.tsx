import { Box, Stack, styled, Divider } from "@mui/material";

export const ConnectedBox = styled(Box)``;

export const TitleDivider = styled(Divider)`
  border-width: 1px;
  margin-top: 8px;
  border-color: ${(p) => p.theme.palette.grey[500]};
`;

export const RowItem = styled(Stack)`
  padding: 20px 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin: 10px 0;
`;
