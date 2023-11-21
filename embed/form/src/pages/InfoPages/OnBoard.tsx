import React, { useEffect } from "react";

import {
  CssBaseline,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { RootContainer, SuccessText, ContinueButton } from "./InfoPages.styles";
import { useLocation } from "react-router-dom";
import { UiService } from "../../services";

function OnBoard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const account_id = queryParams.get("account_id");

  const { saveOnBoardUser } = UiService();
  useEffect(() => {
    //@ts-ignore
    saveOnBoardUser(account_id);
  }, []);
  return (
    <RootContainer>
      <CssBaseline />
      <Card>
        <CardContent style={{ textAlign: "center", width: "500px" }}>
          <SuccessText variant="h4">Connection Successful!</SuccessText>
          <Typography variant="body1">
            Your Stripe Account connected sucesfully. <br />
            Thank you for your purchase!
          </Typography>
          <ContinueButton variant="contained">Back to Home</ContinueButton>
        </CardContent>
      </Card>
    </RootContainer>
  );
}

export default OnBoard;
