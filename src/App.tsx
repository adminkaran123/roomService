import { useState } from "react";
import palette from "./theme/palette";
import shape from "./theme/shape";
import shadows from "./theme/shadows";
import typography from "./theme/typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UiService } from "./services";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const stripePromise = loadStripe(
  "pk_test_51H6Ab9KxGvVM5joAtF8NY3rFilHumwdMriZWPxlH2x1CITKEpmm0PTK2QhP2raSWQCnexPwOJZaXH0jiKsWvpVQZ00G42gNkbc"
);

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
  const { isLoading } = uiValue();

  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider theme={theme}>
        <Router />
        <ToastContainer />
        {isLoading && <FullPageLoader />}
      </ThemeProvider>
    </Elements>
  );
}

export default App;
