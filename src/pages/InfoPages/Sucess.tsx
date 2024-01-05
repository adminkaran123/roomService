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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function Success() {
  const navigate = useNavigate();
  return (
    <RootContainer>
      <CssBaseline />
      <Card className="custom_card">
        <span className="pulse">
          <CheckCircleIcon />
        </span>
        <CardContent>
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

export default Success;
