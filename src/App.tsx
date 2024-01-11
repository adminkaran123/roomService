import { useState, useEffect } from "react";
import palette from "./theme/palette";
import shape from "./theme/shape";
import shadows from "./theme/shadows";
import typography from "./theme/typography";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UiService, UserService } from "./services";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

import { ThemeProvider, createTheme } from "@mui/material/styles";

const stripePromise = loadStripe(
  "pk_test_51NdhMZJzTtTBH1We1zG4m7EYJfCjZ06EYdbP3A8FviqhFBI6LA3zf6Jyc1Yl76qgNIreO3JRVNR8r3M43SNQAHoq00zBnoS4bi"
);

import Router from "./routes";
import "./App.css";
import FullPageLoader from "./components/loader/FullpageLoader";
import { Button } from "@mui/material";
const theme = createTheme({
  // Override or create new styles, colors, palettes...
  palette: {
    ...palette.light,
    mode: "light",
    text: {
      primary: "#333333", // Set to a dark color for better contrast
    },
  },
  shadows: shadows.light,

  shape,
  typography,
});

function App() {
  const { uiValue, getTour } = UiService();
  const { getUserProfile } = UserService();

  const { isLoading } = uiValue();
  useEffect(() => {
    getUserProfile();
    getTour();
  }, []);

  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider theme={theme}>
        <Router />
        <ToastContainer />

        {isLoading && <FullPageLoader />}
        <Button
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            color: "#fff",
            borderRadius: 50,
            width: 60,
            height: 60,
            padding: 0,
            cursor: "pointer",
          }}
          variant="contained"
          onClick={() => {
            window.open("https://formmaker.co.in/documention", "_blank");
          }}
        >
          <QuestionMarkIcon style={{ width: 40, height: 30 }} />
        </Button>
      </ThemeProvider>
    </Elements>
  );
}

export default App;
