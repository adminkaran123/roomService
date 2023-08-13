import { Box, IconButton, styled, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import TextField from "../textfields/textField/TextField";

export const StyledDataGrid = styled(DataGrid)`
  background-color: ${(p) => p.theme.palette.background.paper};
  border-radius: 8px;
  padding: 16px;
  .MuiDataGrid-columnHeadersInner {
    background-color: ${(p) => {
      // @ts-ignore
      return p.theme.palette.background?.neutral!;
    }};
    border-radius: 8px;
  }
  .MuiDataGrid-columnHeader:focus-within {
    outline: none;
  }
  .MuiDataGrid-cell {
    border-bottom: none;
  }
  .MuiDataGrid-cell:focus {
    outline: none;
  }

  .MuiDataGrid-cell:focus-within {
    outline: none;
  }

  .MuiDataGrid-row {
    /* border-top: -1px solid ${(p) => p.theme.palette.background.paper}; */
  }

  .MuiDataGrid-columnSeparator {
    display: none;
  }
  .MuiDataGrid-footerContainer {
    margin-top: ${(p) =>
        // @ts-ignore
        p?.customSpacing}+
      "px";
  }
  .badge {
    padding: 5px 10px;
    font-size: 14px;
    line-height: 22px;
    border-radius: 6px;
  }
  .copy-text {
    position: relative;
    padding: 5px;
    border: 1px solid #ddd;
    border-radius: 10px;
    display: flex;
    font-size: 11px;
  }
  .copy-text input.text {
    padding: 10px;
    font-size: 18px;
    border: none;
    outline: none;
    background: transparent;
    color: #fff;
  }
  .copy-text button {
    padding: 10px;
    background: #5784f5;
    color: #fff;
    font-size: 18px;
    border: none;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .copy-text button:active {
    background: #809ce2;
  }
  .copy-text button:before {
    content: "Copied";
    position: absolute;
    top: -45px;
    right: 0px;
    background: #5c81dc;
    padding: 8px 10px;
    border-radius: 20px;
    font-size: 15px;
    display: none;
  }
  .copy-text button:after {
    content: "";
    position: absolute;
    top: -20px;
    right: 25px;
    width: 10px;
    height: 10px;
    background: #5c81dc;
    transform: rotate(45deg);
    display: none;
  }
  .copy-text.active button:before,
  .copy-text.active button:after {
    display: block;
  }
`;

export const IconTextBox = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

export const OptionsBox = styled(Box)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const DownloadIcon = styled(IconButton)`
  margin-left: 15px;
`;

export const InstitutionName = styled(Box)`
  display: flex;
  align-items: center;
  column-gap: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
  .image-box {
    width: 80px;
    height: 45px;
    background: #fff;
    border-radius: 8px;
    text-align: center;
    img {
      idth: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center center;
      display: inline-block;
    }
  }
`;

export const CustomTextField = styled(TextField)`
  width: 100%;
  input {
    padding: 10px;
  }
`;

export const CustomTypography = styled(Typography)`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  position: "relative";
`;
