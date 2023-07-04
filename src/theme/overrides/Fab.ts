import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Fab(theme: Theme) {
  // @ts-ignore
  const customShadows = theme.customShadows;
  return {
    MuiFab: {
      defaultProps: {
        color: 'primary',
      },

      styleOverrides: {
        root: {
          boxShadow: customShadows.z8,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.grey[400],
          },
        },
        primary: {
          boxShadow: customShadows.primary,
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        },
        secondary: {
          boxShadow: customShadows.secondary,
          '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
          },
        },
        extended: {
          '& svg': {
            marginRight: theme.spacing(1),
          },
        },
      },
    },
  };
}
