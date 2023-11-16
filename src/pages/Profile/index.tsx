import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Stack,
  IconButton,
  Button,
} from "@mui/material";
import { RowItem, ConnectedBox, TitleDivider } from "./Profile.styles";
import { EditOutlined } from "@mui/icons-material";
function StepFormListing() {
  return (
    <ConnectedBox>
      <Typography variant="h2"> Profile </Typography>
      <TitleDivider />

      <Stack direction="row" justifyContent="flex-end" marginTop="10px">
        <Button variant="contained" size="large">
          <EditOutlined />
          &nbsp; Edit Profile
        </Button>
      </Stack>

      <RowItem direction="row" justifyContent="space-between">
        <Typography variant="h5">Username:</Typography>
        <Typography variant="h5">Karan</Typography>
      </RowItem>
      <RowItem direction="row" justifyContent="space-between">
        <Typography variant="h5">Email:</Typography>
        <Typography variant="h5">karanjalendere@gmail.com</Typography>
      </RowItem>
      <Stack direction="row" justifyContent="flex-end" marginTop="20px">
        <Button variant="contained" size="large">
          <EditOutlined />
          &nbsp; Change Password
        </Button>
      </Stack>
      <RowItem direction="row" justifyContent="space-between">
        <Typography variant="h5">Password:</Typography>
        <Typography variant="h5">**********</Typography>
      </RowItem>
    </ConnectedBox>
  );
}

export default StepFormListing;
