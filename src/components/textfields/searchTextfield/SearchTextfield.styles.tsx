import { Box, styled } from "@mui/material";

import IconSvg from "../../icon/IconSvg";
import TextField from "../textField/TextField";

export const SearchBox = styled(Box)`
  width: 100%;
  max-width: 520px;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled(TextField)`
  .MuiOutlinedInput-input {
    padding-left: 50px;
  }
  .MuiInputLabel-outlined {
    padding-left: 35px;
  }

  .MuiInputLabel-shrink {
    padding-left: 0px;
  }
`;

export const SearchIcon = styled(IconSvg)`
  position: absolute;
  margin-left: 15px;
  color: ${(p) => p.theme.palette.grey[600]};
`;
