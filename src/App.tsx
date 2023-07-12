import { useState } from "react";
import palette from "./theme/palette";
import shape from "./theme/shape";
import shadows from "./theme/shadows";
import typography from "./theme/typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UiService } from "./services";

import { ThemeProvider, createTheme } from "@mui/material/styles";

import Router from "./routes";
import "./App.css";
import FullPageLoader from "./components/loader/FullpageLoader";
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
  const { uiValue } = UiService();
  const { isLoading } = { uiValue };
  console.log("uiValue", uiValue());
  return (
    <ThemeProvider theme={theme}>
      <Router />
      <ToastContainer />
      {isLoading && <FullPageLoader />}
    </ThemeProvider>
  );
}

export default App;
