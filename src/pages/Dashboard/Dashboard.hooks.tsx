import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants/constants";
import { useNavigate } from "react-router";
import { UserService, UiService } from "../../services";
import { Typography } from "@mui/material";
const useDashbaord = () => {
  const navigate = useNavigate();

  const { loadAuthCode, userValue } = UserService();

  const { onBoardUser, uiValue, createAndUpadateTour } = UiService();
  const { isLoading } = uiValue();
  const { user, tour } = userValue();
  const [tourOpen, setTourOpen] = useState(false);
  console.log("tour", tour);

  const closeTour = () => {
    setTourOpen(false);
    let tourData: any[] = [];
    if (tour != null) {
      tourData = [...tour];
    }
    tourData.push(!user.refreshToken ? "dashboard-tour-1" : "dashboard-tour-2");
    createAndUpadateTour(tourData);
  };

  useEffect(() => {
    if (!tour?.includes("dashboard-tour-1") && !user.refreshToken) {
      setTourOpen(true);
    }
    if (!tour?.includes("dashboard-tour-2") && user.refreshToken) {
      setTourOpen(true);
    }
  }, [tour]);

  const handleConnect = async () => {
    if (typeof window !== "undefined") {
      window.location.href = API_URL + "/oauth";
    }
  };

  const handleLoadAuthCode = async () => {
    loadAuthCode();
  };

  const steps = user.refreshToken
    ? [
        {
          selector: ".update-profile",
          content: (
            <>
              <Typography marginTop="15px">
                View you profile here and also you can change your password
              </Typography>
            </>
          ),
        },
        {
          selector: ".step-form",
          content: (
            <>
              <Typography marginTop="15px">
                Click here to start creating your first form
              </Typography>
            </>
          ),
        },
        {
          selector: ".submissons",
          content: (
            <>
              <Typography marginTop="15px">
                Can see your form submissons here and also the contact which is
                created or updated from that
              </Typography>
            </>
          ),
        },
        {
          selector: ".video-container iframe",
          content: (
            <>
              <Typography marginTop="15px">
                Watch this video to learn how to create your first form
              </Typography>
            </>
          ),
        },
        {
          selector: ".stripe",
          content: (
            <>
              <Typography marginTop="15px">
                Manage your Stripe Subscription from here
              </Typography>
            </>
          ),
        },
      ]
    : [
        {
          selector: ".hubspot-connect",
          content: (
            <>
              <Typography marginTop="15px">
                Connect your HubSpot Account to Start Creating Forms click here
                to start Integration
              </Typography>
            </>
          ),
        },
        {
          selector: ".video-container iframe",
          content: (
            <>
              <Typography marginTop="15px">
                Watch this video to learn how to create your first form
              </Typography>
            </>
          ),
        },
        {
          selector: ".stripe",
          content: (
            <>
              <Typography marginTop="15px">
                Manage your Stripe Subscription from here
              </Typography>
            </>
          ),
        },
      ];

  useEffect(() => {
    handleLoadAuthCode();
  }, []);

  return {
    handleConnect,
    navigate,
    user,
    onBoardUser,
    closeTour,
    steps,
    isLoading,
    tourOpen,
  };
};

export default useDashbaord;
