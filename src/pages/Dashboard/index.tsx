import React from "react";
import { Stack, Typography, Button } from "@mui/material";

import Logo from "../../assets/formmaker.png";
import HS_Logo from "../../assets/hs_logo.png";
import { IntegrationWrapper } from "./Dashboard.styles";
import useDashbaord from "./Dashboard.hooks";

function Dashboard() {
  const { handleConnect } = useDashbaord();
  return (
    <IntegrationWrapper>
      <Typography variant="h3" marginBottom="20px">
        Connect your another portal with FormMaker
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
  );
}

export default Dashboard;
