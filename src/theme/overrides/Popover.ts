import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Popover(theme: Theme) {
  return {
    MuiPopover: {
      styleOverrides: {
        paper: {
          // @ts-ignore
          boxShadow: theme.customShadows.z12,
        },
      },
    },
  };
}
