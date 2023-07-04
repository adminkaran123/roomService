// material
import { CssBaseline } from '@mui/material';
import {
  createTheme,
  StyledEngineProvider,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles';
import { ReactNode, useMemo } from 'react';

// hooks
import breakpoints from './breakpoints';
import componentsOverride from './overrides';
import palette from './palette';
import shadows, { customShadows } from './shadows';
//
import shape from './shape';
import typography from './typography';

// ----------------------------------------------------------------------

type ThemeConfigProps = {
  children: ReactNode;
};

// Update the Button's color prop options
declare module '@mui/material/Button' {
  // eslint-disable-next-line no-unused-vars
  interface ButtonPropsColorOverrides {
    alternative: true;
    errorLight: true;
    contrast: true;
  }
}

declare module '@mui/material/Switch' {
  // eslint-disable-next-line no-unused-vars
  interface SwitchPropsColorOverrides {
    alternative: true;
  }
}

declare module '@mui/material/Chip' {
  // eslint-disable-next-line no-unused-vars
  interface ChipPropsColorOverrides {
    neutral: true;
  }
}

declare module '@mui/material/SvgIcon' {
  // eslint-disable-next-line no-unused-vars
  interface SvgIconPropsColorOverrides {
    'success.light': true;
    'warning.light': true;
    'error.light': true;
  }
}

declare module '@mui/material/styles/createPalette' {
  // eslint-disable-next-line no-unused-vars
  interface PaletteColor {
    lighter: string;
  }

  // eslint-disable-next-line no-unused-vars
  interface Palette {
    alternative: { main: string; dark: string; contrastText: string };
    contrast: { main: string };
    neutral: { main: string; dark: string };
  }
}
declare module '@mui/material/index' {
  // eslint-disable-next-line no-unused-vars
  interface Color {
    dark: string;
  }
}

export default function ThemeConfig({ children }: ThemeConfigProps) {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: {
        ...palette.dark,
        mode: 'dark',
      },
      shape,
      typography,
      breakpoints,
      shadows: shadows.dark,
      customShadows: customShadows.dark,
    }),
    [],
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
