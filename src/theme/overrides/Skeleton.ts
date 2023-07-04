import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Skeleton(theme: Theme) {
  return {
    MuiSkeleton: {
      defaultProps: {
        animation: 'wave',
      },

      styleOverrides: {
        root: {
          // @ts-ignore
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
}
