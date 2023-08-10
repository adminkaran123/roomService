import { styled, TextField } from '@mui/material';

// Material ui needs all the props attribute in lower case, Hence rowreverse is in lowercase.

export const StyledTextfield = styled(TextField)<{ rowreverse?: string }>`
  .MuiInputLabel-shrink {
    color: ${(p) => p.theme.palette.common.white};
  }
  .MuiOutlinedInput-input {
    color: ${(p) => p.theme.palette.common.white};
  }
  .MuiOutlinedInput-root {
    border-color: ${(p) => p.theme.palette.success.main};
    flex-direction: ${(p) => (p.rowreverse === 'true' ? 'row-reverse' : 'row')};
  }
  .largeLabel.MuiInputLabel-shrink {
    font-size: 20px;
    background: #131821;
    padding-right: 5px;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(p) => p.theme.palette.grey[500]};
    }
    &.Mui-focused fieldset {
      border-color: ${(p) => p.theme.palette.success.main};
    }
  }
`;

export const StyledAutoTextfield = styled(TextField)<{ rowreverse?: string }>`
  .MuiInputLabel-shrink {
    color: ${(p) => p.theme.palette.common.white};
  }
  .MuiOutlinedInput-input {
    color: ${(p) => p.theme.palette.common.white};
    height: 35px;
  }
  .MuiOutlinedInput-root {
    border-color: ${(p) => p.theme.palette.success.main};
    flex-direction: ${(p) => (p.rowreverse === 'true' ? 'row-reverse' : 'row')};
  }
  .largeLabel.MuiInputLabel-shrink {
    font-size: 20px;
    background: #131821;
    padding-right: 5px;
  }

  & .MuiOutlinedInput-root {
    & fieldset {
      border-color: ${(p) => p.theme.palette.grey[500]};
    }
    &.Mui-focused fieldset {
      border-color: ${(p) => p.theme.palette.success.main};
    }
  }
`;
