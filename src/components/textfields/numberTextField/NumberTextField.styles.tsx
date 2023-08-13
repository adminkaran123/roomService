import { Box, styled, TextField } from '@mui/material';

// Material ui needs all the props attribute in lower case, Hence rowreverse is in lowercase.
export const InputArea = styled(Box)`
  border: 1px solid rgba(145, 158, 171, 0.32);
  border-radius: 15px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 10px;
  fieldset {
    border: none;
  }
  input {
    text-align: center;
  }
  button {
    width: 60px;
    margin: 0;
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
  }
`;
export const StyledTextfield = styled(TextField)<{ rowreverse?: string }>``;
