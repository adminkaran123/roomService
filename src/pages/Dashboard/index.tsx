import React from "react";
import {
  Stack,
  Typography,
  Button,
  Card,
  Container,
  Grid,
  CardContent,
} from "@mui/material";

import Logo from "../../assets/formmaker.png";
import HS_Logo from "../../assets/hs_logo.png";
import { IntegrationWrapper, ConnectedBox } from "./Dashboard.styles";
import useDashbaord from "./Dashboard.hooks";
import CheckIcon from "@mui/icons-material/Check";
import StripeIcon from "../../assets/stripe.svg";
function Dashboard() {
  const { handleConnect, navigate, user, onBoardUser } = useDashbaord();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} marginBottom="30px">
          {!user.hs_access_token ? (
            <IntegrationWrapper>
              <Typography variant="h3" marginBottom="20px">
                Connect your Hubspot Account to Start Creating Forms
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="400px"
                marginBottom="20px"
              >
                <img src={HS_Logo} width={120} />

                <span className="relation_line"></span>
                <img src={Logo} width={150} height="auto" />
              </Stack>
              <Button variant="contained" size="large" onClick={handleConnect}>
                <Typography color="#fff">Connect your HS Account</Typography>
              </Button>
            </IntegrationWrapper>
          ) : (
            <ConnectedBox>
              <div className="icon_checked">
                <CheckIcon />
              </div>
              <img src={HS_Logo} width={120} />
            </ConnectedBox>
          )}
        </Grid>
        <Grid item xs={12} md={6} marginBottom="30px">
          {!user.stripe_account_id ? (
            <IntegrationWrapper>
              <Typography variant="h3" marginBottom="20px">
                Connect your Stripe to start using stripe elemnts in form
              </Typography>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                width="400px"
                marginBottom="20px"
              >
                <img src={StripeIcon} width={120} />

                <span className="relation_line"></span>
                <img src={Logo} width={150} height="auto" />
              </Stack>
              <Button variant="contained" size="large" onClick={onBoardUser}>
                <Typography color="#fff">Connect Now</Typography>
              </Button>
            </IntegrationWrapper>
          ) : (
            <ConnectedBox>
              <div className="icon_checked">
                <CheckIcon />
              </div>
              <img src={StripeIcon} width={120} />
            </ConnectedBox>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} marginBottom="30px">
          <Card>
            <CardContent>
              <Typography variant="h3">You are on Trial Period</Typography>
              <Typography
                variant="h2"
                color="#f1c40f"
                marginBottom="10px"
                marginTop="20"
              >
                10 days remaining
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => {
                  navigate("/pricing");
                }}
              >
                Purchase a Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h3">Available Responses</Typography>
              <Typography variant="h1" marginTop="15px">
                10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
