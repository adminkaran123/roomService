import { Stack, styled, TextField } from "@mui/material";

export const StyledTextfield = styled(TextField)`
  margin-top: 2px;
  .MuiInputLabel-shrink {
    color: ${(p) => p.theme.palette.common.black};
    visibility: none;
  }
  .MuiOutlinedInput-input {
    color: ${(p) => p.theme.palette.grey[500]};
  }

  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${(p) => p.theme.palette.success.main};
    }
  }
`;
export const InputWrapper = styled(Stack)`
  position: relative;
  &.has-prefix .prefix {
    position: absolute;
    top: 34px;
    left: 10px;
    color: ${(p) => p.theme.palette.grey[500]};
  }
  &.has-prefix input {
    padding-left: 25px;
  }
`;
