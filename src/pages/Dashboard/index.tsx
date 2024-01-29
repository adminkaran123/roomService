import React, { useEffect, useState } from "react";
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
import { IntegrationWrapper, ConnectedBox, Wrapper } from "./Dashboard.styles";
import useDashbaord from "./Dashboard.hooks";
import CheckIcon from "@mui/icons-material/Check";
import StripeIcon from "../../assets/stripe.svg";
import YouTubeEmbed from "../../components/YouTubeEmbed";
import { formatDate } from "../../utils/helpers";
import AdminDashboard from "../adminDashboard/userListing";
import CustomTour from "../../components/CustomTour";
function Dashboard() {
  const {
    handleConnect,
    navigate,
    user,
    onBoardUser,
    closeTour,
    steps,
    isLoading,
    tourOpen,
  } = useDashbaord();

  return (
    <Wrapper>
      {user?.roles && user?.roles[0]?.name === "admin" ? (
        <AdminDashboard />
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={12} marginBottom="30px">
              <YouTubeEmbed videoId="s1fDvrcNJks" />
            </Grid>
            <Grid item xs={12} md={6} marginBottom="30px">
              <ConnectedBox>
                <div className="icon_checked">
                  <CheckIcon />
                </div>
                <img src={HS_Logo} width={120} />
              </ConnectedBox>
            </Grid>
            <Grid item xs={12} md={6} marginBottom="30px">
              <Card className="custom_card stripe" style={{ maxWidth: 550 }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h3">Subscription Details</Typography>
                    <Typography
                      variant="h4"
                      color="text.secondary"
                      gutterBottom
                    >
                      {user.plan === "monthly" ? (
                        <span>
                          Monthly: <strong>$59</strong>
                        </span>
                      ) : user.plan === "yearly" ? (
                        <span>
                          Yearly: <strong>$599</strong>
                        </span>
                      ) : (
                        <span>Free Plan</span>
                      )}
                    </Typography>
                    {user.hasTrial && (
                      <>
                        <Typography variant="body2">
                          You Free Trial
                          <br />
                          Will end on{" "}
                          <strong>{formatDate(user.endDate)}</strong>
                        </Typography>
                      </>
                    )}
                    {user.plan ? (
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                          window.open(
                            "https://billing.stripe.com/p/login/test_dR628E2TidMW0QUbII",
                            "_blank"
                          );
                        }}
                      >
                        Manage your Subscription
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        onClick={() => {
                          navigate("/pricing");
                        }}
                      >
                        Upgrade your Plan
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
      {/* <CustomTour steps={steps} isOpen={tourOpen} onRequestClose={closeTour} /> */}
    </Wrapper>
  );
}

export default Dashboard;
