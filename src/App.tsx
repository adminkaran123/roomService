import { useState } from "react";
import palette from "./theme/palette";
import shape from "./theme/shape";
import shadows from "./theme/shadows";
import typography from "./theme/typography";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Router from "./routes";
import "./App.css";
const theme = createTheme({
  // Override or create new styles, colors, palettes...
  palette: {
    ...palette.dark,
    mode: "dark",
  },
  shadows: shadows.dark,
  shape,
  typography,
});

function App() {
  const [count, setCount] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
