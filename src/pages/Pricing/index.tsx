// PricingDetails.js

import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  Container,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { Wrapper } from "./Pricing.styles";
import usePricing from "./Pricing.hooks";
import { plans } from "../../utils/constants/constants";
import { UiService } from "../../services";
import Logo from "../../assets/header_logo.png";
import CustomTour from "../../components/CustomTour";

const PricingDetails = () => {
  const { purchasePlan, closeTour, steps, isLoading, tourOpen } = usePricing();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper maxWidth="sm">
      <Stack alignItems="center" marginBottom="30px">
        <img src={Logo} width={120} />
      </Stack>
      <Typography variant="h3">
        Choose a plan according to your convenience
      </Typography>

      <ul>
        <li>Full Access to All Features</li>
        <li>Cancel Anytime</li>
        <li>Enjoy all the features with no obligations.</li>
        <li>No long-term commitment. Cancel your subscription at any time.</li>
      </ul>

      {/* Add a class for styling */}
      <Typography variant="h6">Subscription</Typography>
      <ul>
        <li>Unlimited Access to the App</li>
        <li>Cancel Anytime</li>
      </ul>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
        }}
        className="plan-box"
      >
        <Card style={{ width: "48%" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Monthly: $19
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => {
                purchasePlan(plans.monthly);
              }}
            >
              Subscribe
            </Button>
          </CardContent>
        </Card>
        <Card style={{ width: "48%" }}>
          <CardContent>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Yearly: $199
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={() => {
                purchasePlan(plans.yearly);
              }}
            >
              Subscribe
            </Button>
          </CardContent>
        </Card>
      </div>

      <CustomTour steps={steps} isOpen={tourOpen} onRequestClose={closeTour} />
    </Wrapper>
  );
};

export default PricingDetails;
