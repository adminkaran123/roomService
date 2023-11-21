import { Box, Link, Stack, styled, Typography } from "@mui/material";

export const Separator = styled(Box)`
  width: 4px;
  height: 4px;
  background: #c4c4c4;
  border-radius: 50%;
`;
export const BreadcrumbLink = styled(Link)`
  color: #333333;
  font-weight: bold;
`;
export const SubtitleTypography = styled(Typography)`
  display: flex;
  color: ${(p) => p.theme.palette.grey[500]};
  font-weight: bold;
`;
export const Image = styled("img")`
  display: inline-block;
  vertical-align: middle;
`;

export const MainStack = styled(Stack)<{ no_margin: string }>`
  margin-top: ${(p) => (p.no_margin === "true" ? "0px !important" : "16px")};
`;
