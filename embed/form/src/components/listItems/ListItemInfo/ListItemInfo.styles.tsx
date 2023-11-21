import { Box, Button, Stack, styled } from '@mui/material';

import HorizontalBox from '../../horizontalBox/HorizontalBox';

export const MainStack = styled(Stack)`
  background-color: ${(p) => {
    return p.theme.palette.background.paper;
  }};
  min-height: 280px;
  width: 100%;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 16px;
  margin-top: 10px;
  margin-bottom: 15px;
`;

export const ImageBox = styled(Box)`
  height: 100%;
  width: 300px;
  align-items: center;
  display: flex;
  box-shadow: 0px 4px 4px rgba(255, 255, 255, 0.25),
    0px 16px 32px -4px rgba(255, 255, 255, 0.24);
  border-radius: 20px;
`;

export const InfoPanel = styled(HorizontalBox)`
  height: 100%;
  width: 100%;
  align-items: center;
  padding-left: 32px;
  padding-right: 62px;
`;

export const ActionButton = styled(Button)`
  height: 66px;
  padding-left: 22px;
  padding-right: 22px;
  max-width: 15%;
  min-width: 150px;
  margin-top: 40px !important;
`;
