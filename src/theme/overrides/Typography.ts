import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Typography(theme: Theme) {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Public Sans',
        },
        h2: {
          weight: 700,
          size: 48,
          lineHeight: '64px',
        },
        h3: {
          weight: 700,
          size: 32,
          lineHeight: '48px',
        },
        h4: {
          weight: 700,
          size: 24,
          lineHeight: '36px',
        },
        body1: {
          weight: 400,
          size: 18,
          lineHeight: '24px',
        },
        paragraph: {
          marginBottom: theme.spacing(2),
        },
        gutterBottom: {
          marginBottom: theme.spacing(1),
        },
      },
    },
  };
}
