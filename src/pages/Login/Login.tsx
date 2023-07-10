import * as React from "react";
import {
  CssBaseline,
  Box,
  Grid,
  Stack,
  Button,
  Typography,
  FormControl,
  InputLabel,
  TextField,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Logo from "../../assets/formmaker.png";
import HS_Logo from "../../assets/hs_logo.png";
import { IntegrationWrapper } from "./Login.styles";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Email from "@mui/icons-material/Email";
import useLogin from "./Login.hooks";

export default function SignInSide() {
  const {
    pathname,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    showPassword,
    showConfirmPassword,
    handleMouseDownPassword,
    handleSubmit,
    onUserCreate,
    registerLogin,
    loginErrors,
    handleLoginSubmit,
  } = useLogin();
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
            {pathname.includes("set-password") ? (
              <form noValidate onSubmit={handleLoginSubmit(onUserCreate)}>
                <Stack spacing={2} width={400}>
                  <Typography variant="h3">
                    Create password for your account
                  </Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      value="karanjalendere@gmail.com"
                      disabled
                      endAdornment={
                        <InputAdornment position="end">
                          <Email />
                        </InputAdornment>
                      }
                      label="Email"
                    />
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      {...registerLogin("password")}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={Boolean(loginErrors.password?.message)}
                    />
                    {Boolean(loginErrors.password?.message) && (
                      <FormHelperText error>
                        {loginErrors?.password?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="confirm_password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id="confirm_password"
                      type={showConfirmPassword ? "text" : "password"}
                      {...registerLogin("confirm_password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                      error={Boolean(loginErrors.confirm_password?.message)}
                    />
                    {Boolean(loginErrors.confirm_password?.message) && (
                      <FormHelperText error>
                        {loginErrors?.confirm_password?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                  >
                    Save
                  </Button>
                </Stack>
              </form>
            ) : (
              <>
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
                <Button variant="contained" size="large" onClick={handleSubmit}>
                  <Typography color="#fff">Connect your HS Account</Typography>
                </Button>
              </>
            )}
          </IntegrationWrapper>
        </Box>
      </Grid>
    </Grid>
  );
}