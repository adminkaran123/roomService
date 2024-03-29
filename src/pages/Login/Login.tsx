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
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import Logo from "../../assets/formmaker.png";
import Bg from "../../assets/form-builder.jpg";
import HS_Logo from "../../assets/hs_logo.png";
import { IntegrationWrapper } from "./Login.styles";
import { LoadingButton } from "@mui/lab";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Email from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";

import useLogin from "./Login.hooks";

export default function SignInSide() {
  const {
    pathname,
    handleClickShowPassword,
    handleClickShowConfirmPassword,
    showPassword,
    showConfirmPassword,
    handleMouseDownPassword,
    handleConnect,
    onUserCreate,
    handleLoginUser,
    createUserErrors,
    handleUserSubmit,
    loading,
    registerLogin,
    handleLoginSubmit,
    createLoginErrors,
    onUserLogin,
    otpSent,
    otp,
    setOtp,
    handleVerifyOtp,
    handleResendOtp,
    forgotPasswordErrors,
    handleForgotPasswordSubmit,
    onForgotPassword,
    registerForgotPassword,
    onResetPassword,
    resetPasswordErrors,
    registerResetPassword,
    handleResetPaaswordSubmit,
    email,
  } = useLogin();

  const otpForm = (
    <>
      <Typography variant="h3" marginBottom="10px">
        Enter OTP sent to your email id
      </Typography>
      <p style={{ color: "#4fd2c2", textDecoration: "underline" }}>{email}</p>
      <div className="otp-input">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      <Stack
        justifyContent="flex-end"
        direction="row"
        marginBottom="5px"
        marginTop="-15px"
      >
        <Button onClick={handleResendOtp}>Resend Otp</Button>
      </Stack>
      <LoadingButton
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        loading={loading}
        disabled={loading || otp.length < 4}
        onClick={handleVerifyOtp}
      >
        Verify OTP
      </LoadingButton>
    </>
  );
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${Bg})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: "#4fd2c2",
          backgroundSize: "contain",
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
            {pathname.includes("admin-l") && (
              <p style={{ textAlign: "center" }}>
                <img src={Logo} width={150} height="auto" />
              </p>
            )}
            {pathname.includes("admin-login") ? (
              <>
                {!otpSent ? (
                  <form noValidate onSubmit={handleLoginSubmit(onUserLogin)}>
                    <Stack spacing={2} width={400}>
                      <Typography variant="h3">Login</Typography>
                      <FormControl variant="outlined">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <OutlinedInput
                          id="email"
                          type="email"
                          {...registerLogin("email")}
                          endAdornment={
                            <InputAdornment position="end">
                              <Email />
                            </InputAdornment>
                          }
                          label="Email"
                          error={Boolean(createLoginErrors.email?.message)}
                        />
                        {Boolean(createLoginErrors.email?.message) && (
                          <FormHelperText error>
                            {createLoginErrors?.email?.message}
                          </FormHelperText>
                        )}
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
                                style={{ color: "#000" }}
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                          error={Boolean(createLoginErrors.password?.message)}
                        />
                        {Boolean(createLoginErrors.password?.message) && (
                          <FormHelperText error>
                            {createLoginErrors?.password?.message}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        style={{ marginTop: 0 }}
                      >
                        <Link to="/forgot">Forgot Password</Link>
                      </Stack>

                      <LoadingButton
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        loading={loading}
                        disabled={loading}
                      >
                        Submit
                      </LoadingButton>
                      <Typography>
                        Don't you have a account?{" "}
                        <Link to="/signup">Signup</Link>
                      </Typography>
                    </Stack>
                  </form>
                ) : (
                  otpForm
                )}
              </>
            ) : pathname.includes("forgot") ? (
              <form
                noValidate
                onSubmit={handleForgotPasswordSubmit(onForgotPassword)}
              >
                <Stack spacing={2} width={400}>
                  <Typography variant="h3">Password Reset</Typography>
                  <Typography variant="body1" style={{ marginTop: 5 }}>
                    You will receive instruction to reset your password.
                  </Typography>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="email">
                      Enter your registred email id
                    </InputLabel>
                    <OutlinedInput
                      id="email"
                      type="email"
                      {...registerForgotPassword("email")}
                      endAdornment={
                        <InputAdornment position="end">
                          <Email />
                        </InputAdornment>
                      }
                      label="Enter your registred email id"
                      error={Boolean(forgotPasswordErrors.email?.message)}
                    />
                    {Boolean(forgotPasswordErrors.email?.message) && (
                      <FormHelperText error>
                        {forgotPasswordErrors?.email?.message}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <LoadingButton
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Send
                  </LoadingButton>
                  <Typography>
                    Back to <Link to="/">Login</Link>
                  </Typography>
                </Stack>
              </form>
            ) : pathname.includes("reset") ? (
              <form
                noValidate
                onSubmit={handleResetPaaswordSubmit(onResetPassword)}
              >
                <Stack spacing={2} width={400}>
                  <Typography variant="h3">Create a new Password</Typography>

                  <FormControl variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                      id="password"
                      {...registerResetPassword("password")}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            style={{ color: "#000" }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      error={Boolean(resetPasswordErrors.password?.message)}
                    />
                    {Boolean(resetPasswordErrors.password?.message) && (
                      <FormHelperText error>
                        {resetPasswordErrors?.password?.message}
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
                      {...registerResetPassword("confirm_password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            style={{ color: "#000" }}
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
                      error={Boolean(
                        resetPasswordErrors.confirm_password?.message
                      )}
                    />
                    {Boolean(resetPasswordErrors.confirm_password?.message) && (
                      <FormHelperText error>
                        {resetPasswordErrors?.confirm_password?.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <LoadingButton
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    loading={loading}
                    disabled={loading}
                  >
                    Reset
                  </LoadingButton>
                  <Typography>
                    Back to <Link to="/">Login</Link>
                  </Typography>
                </Stack>
              </form>
            ) : (
              <>
                {!otpSent ? (
                  <form noValidate onSubmit={handleUserSubmit(onUserCreate)}>
                    <Stack spacing={2} width={400}>
                      <IntegrationWrapper>
                        <Typography variant="h3" textAlign="center">
                          Start your form making journey now
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
                        <Button
                          variant="contained"
                          size="large"
                          onClick={handleConnect}
                          className="hubspot-connect"
                        >
                          <Typography color="#fff">
                            Connect your HubSpot Account
                          </Typography>
                        </Button>
                      </IntegrationWrapper>
                    </Stack>
                  </form>
                ) : (
                  otpForm
                )}
              </>
            )}
          </IntegrationWrapper>
        </Box>
      </Grid>
    </Grid>
  );
}
