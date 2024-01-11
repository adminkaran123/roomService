import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UiService, UserService } from "../../services";
import { Typography } from "@mui/material";
const usePricing = () => {
  const { purchasePlan, uiValue, createAndUpadateTour } = UiService();
  const { userValue } = UserService();
  const { tour } = userValue();
  const { isLoading } = uiValue();
  const [tourOpen, setTourOpen] = useState(false);
  const closeTour = () => {
    setTourOpen(false);
    let tourData: any[] = [];
    if (tour != null) {
      tourData = [...tour];
    }
    tourData.push("pricing");
    createAndUpadateTour(tourData);
  };

  useEffect(() => {
    if (!tour?.includes("pricing")) {
      setTourOpen(true);
    }
  }, [tour]);

  const steps = [
    {
      selector: ".plan-box",
      content: (
        <>
          <Typography marginTop="15px">
            Choose a plan that works best for you. with 15 days free trial. you
            can cancel anytime during the trial period.
          </Typography>
        </>
      ),
    },
  ];

  return {
    purchasePlan,
    closeTour,
    steps,
    isLoading,
    tourOpen,
  };
};

export default usePricing;
