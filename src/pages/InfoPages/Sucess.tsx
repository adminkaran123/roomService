import React from "react";
import { useNavigate } from "react-router";
import {
  CssBaseline,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { RootContainer, SuccessText, ContinueButton } from "./InfoPages.styles";
import { styled } from "@mui/system";

function App() {
  const navigate = useNavigate();
  return (
    <RootContainer>
      <CssBaseline />
      <Card>
        <CardContent style={{ textAlign: "center", width: "500px" }}>
          <SuccessText variant="h4">Payment Successful!</SuccessText>
          <Typography variant="body1">
            Your Subscription has been started. <br />
            Thank you for your purchase!
          </Typography>
          <ContinueButton
            variant="contained"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back to Home
          </ContinueButton>
        </CardContent>
      </Card>
    </RootContainer>
  );
}

export default App;
