import * as React from "react";
import {
  CssBaseline,
  Box,
  Grid,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import Logo from "../../assets/formmaker.png";
import HS_Logo from "../../assets/hs_logo.png";

import { IntegrationWrapper } from "./Login.styles";

export default function SignInSide() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <IntegrationWrapper color="primary">
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
            <Button variant="contained" size="large">
              <Typography color="#fff">Connect your HS Account</Typography>
            </Button>
          </IntegrationWrapper>
        </Box>
      </Grid>
    </Grid>
  );
}
