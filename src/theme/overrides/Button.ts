import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  // @ts-ignore
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Public Sans',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          '&:hover': {
            backgroundColor: theme.palette.grey[400],
          },
        },
        // outlined
        outlinedInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
