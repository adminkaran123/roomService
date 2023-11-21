import { alpha } from "@mui/material/styles";

// ----------------------------------------------------------------------

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: "#C8FACD",
  light: "#5BE584",
  main: "#4fd2c2",
  dark: "#4fd2c2",
  darker: "#005249",
  selected: "#4fd2c2",
};
const SECONDARY = {
  lighter: "#D6E4FF",
  light: "#84A9FF",
  main: "#4fd2c2",
  dark: "#4fd2c2",
  darker: "#091A7A",
};
const INFO = {
  lighter: "#D0F2FF",
  light: "#74CAFF",
  main: "#919EAB",
  dark: "#0C53B7",
  darker: "#04297A",
};
const SUCCESS = {
  lighter: "#E9FCD4",
  light: "#AAF27F",
  main: "#54D62C",
  dark: "#229A16",
  darker: "#08660D",
};
const WARNING = {
  lighter: "#FFF7CD",
  light: "#FFE16A",
  main: "#FFC107",
  dark: "#B78103",
  darker: "#7A4F01",
};
const ERROR = {
  lighter: "#FFE7D9",
  light: "#FFA48D",
  main: "#FF4842",
  dark: "#B72136",
  darker: "#7A0C2E",
};
const ALTERNATIVE = {
  main: "#00AB55",
  dark: "#01994a",
};
const ROLE = {
  admin: "#F73400",
  instructor: "#4fd2c2",
  student: "#65D542",
};

const GREY = {
  0: "#FFFFFF",
  100: "#F9FAFB",
  200: "#F4F6F8",
  300: "#DFE3E8",
  400: "#C4CDD5",
  500: "#919EAB",
  600: "#637381",
  700: "#454F5B",
  800: "#ffffff",
  900: "#eeeeee",
  500_8: alpha("#919EAB", 0.08),
  500_12: alpha("#919EAB", 0.12),
  500_16: alpha("#919EAB", 0.16),
  500_24: alpha("#919EAB", 0.24),
  500_32: alpha("#919EAB", 0.32),
  500_48: alpha("#919EAB", 0.48),
  500_56: alpha("#919EAB", 0.56),
  500_80: alpha("#919EAB", 0.8),
  dark: "#333D48",
  A100: alpha("#919EAB", 0.24),
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
};

const CHART_COLORS = {
  violet: ["#826AF9", "#9E86FF", "#D0AEFF", "#F7D2FF"],
  blue: ["#2D99FF", "#83CFFF", "#A5F3FF", "#CCFAFF"],
  green: ["#2CD9C5", "#60F1C8", "#A4F7CC", "#C0F2DC"],
  yellow: ["#FFE700", "#FFEF5A", "#FFF7AE", "#FFF3D6", "#FFD964"],
  red: ["#FF6C40", "#FF8F6D", "#FFBD98", "#FFF2D4"],
  pink: ["#ff3061"],
};

const COMMON = {
  common: { black: "#000", white: "#fff" },
  primary: {
    ...PRIMARY,
    contrastText: "#000",
    warning: WARNING.main,
    disabled: GREY[500_80],
  },
  secondary: { ...SECONDARY, contrastText: "#fff" },
  info: { ...INFO, contrastText: "#fff" },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: "#fff" },
  grey: { ...GREY, translucent: GREY[500_32] },
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: GREY[500],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  role: { ...ROLE },
};

const palette = {
  light: {
    ...COMMON,
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
      highLight: "#4fd2c2",
    },
    background: { paper: "#fff", default: "#fff", neutral: GREY[200] },
    action: { active: "#FFF", ...COMMON.action },
  },
  dark: {
    ...COMMON,
    text: {
      primary: "#fff",
      secondary: "#fff",
      disabled: GREY[600],
      selected: PRIMARY.selected,
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: GREY[500_16],
      translucid: alpha(GREY[800], 0.3),
      selected: alpha(PRIMARY.selected, 0.08),
    },
    action: { active: GREY[500], ...COMMON.action },
    alternative: {
      main: ALTERNATIVE.main,
      dark: ALTERNATIVE.dark,
      contrastText: "#fff",
    },
    errorLight: {
      main: ERROR.light,
    },
    contrast: {
      main: "#fff",
    },
    neutral: {
      main: GREY[600],
      contrastText: "#fff",
    },
    "success.light": { main: SUCCESS.light },
    "warning.light": { main: WARNING.light },
    "error.light": { main: ERROR.light },
  },
};

export default palette;
