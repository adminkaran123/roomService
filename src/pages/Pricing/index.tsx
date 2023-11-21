// PricingDetails.js

import React from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  Container,
  Stack,
} from "@mui/material";
import { Wrapper } from "./Pricing.styles";
import usePricing from "./Pricing.hooks";
import { plans } from "../../utils/constants/constants";
import Logo from "../../assets/header_logo.png";

const PricingDetails = () => {
  const { purchasePlan } = usePricing();
  return (
    <Wrapper maxWidth="sm">
      <Stack alignItems="center" marginBottom="30px">
        <img src={Logo} width={120} />
      </Stack>
      <Typography variant="h3">Start Your Free Trial</Typography>

      <ul>
        <li>15-Day Trial Period</li>
        <li>Full Access to All Features</li>
        <li>Cancel Anytime</li>
      </ul>

      {/* Add a class for styling */}
      <Typography variant="h6">Subscription</Typography>
      <Typography variant="body1">$49/month</Typography>
      <ul>
        <li>Unlimited Access to the App</li>
        <li>Cancel Anytime</li>
      </ul>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          purchasePlan(plans.plus);
        }}
      >
        Subscribe Now
      </Button>

      <div className="how-it-works-container">
        {" "}
        {/* Add a class for styling */}
        <Typography variant="h6">How it Works</Typography>
        <ul>
          <li>Create your account with a valid email address.</li>
          <li>Enjoy all the features for 15 days with no obligations.</li>
          <li>After the trial, choose to subscribe for $49/month.</li>
          <li>
            No long-term commitment. Cancel your subscription at any time.
          </li>
        </ul>
      </div>
    </Wrapper>
  );
};

export default PricingDetails;
