import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  FormHelperText,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import { RowItem, ConnectedBox, TitleDivider } from "./Profile.styles";
import { EditOutlined } from "@mui/icons-material";
import CustomModal from "../../components/CustomModal";
import useProfile from "./Profile.hooks";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { set } from "react-hook-form";
function StepFormListing() {
  const {
    handleResetPaaswordSubmit,
    handleClickShowPassword,
    onChangePassword,
    changePasswordErrors,
    registerChangePassword,
    showPassword,
    handleMouseDownPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword,
    togglePassword,
    setTogglePassword,
    loading,
    resetChangePasswordForm,
    handleClickShowOldPassword,
    showOldPassword,
  } = useProfile();
  return (
    <ConnectedBox>
      <Typography variant="h2"> Profile </Typography>
      <TitleDivider />
      <CustomModal
        open={togglePassword}
        width={"480px"}
        handleClose={() => {
          setTogglePassword(false);
        }}
      >
        <form noValidate onSubmit={handleResetPaaswordSubmit(onChangePassword)}>
          <Stack spacing={2} width={400}>
            <Typography variant="h3">Create a new Password</Typography>
            <FormControl variant="outlined">
              <InputLabel htmlFor="old_password">Old Password</InputLabel>
              <OutlinedInput
                id="old_password"
                {...registerChangePassword("old_password")}
                type={showOldPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowOldPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      style={{ color: "#000" }}
                    >
                      {showOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Old Password"
                error={Boolean(changePasswordErrors.old_password?.message)}
              />
              {Boolean(changePasswordErrors.old_password?.message) && (
                <FormHelperText error>
                  {changePasswordErrors?.old_password?.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                {...registerChangePassword("password")}
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
                error={Boolean(changePasswordErrors.password?.message)}
              />
              {Boolean(changePasswordErrors.password?.message) && (
                <FormHelperText error>
                  {changePasswordErrors?.password?.message}
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
                {...registerChangePassword("confirm_password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      style={{ color: "#000" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
                error={Boolean(changePasswordErrors.confirm_password?.message)}
              />
              {Boolean(changePasswordErrors.confirm_password?.message) && (
                <FormHelperText error>
                  {changePasswordErrors?.confirm_password?.message}
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
              Change Password
            </LoadingButton>
          </Stack>
        </form>
      </CustomModal>

      {/* <Stack direction="row" justifyContent="flex-end" marginTop="10px">
        <Button variant="contained" size="large">
          <EditOutlined />
          &nbsp; Edit Profile
        </Button>
      </Stack> */}

      <RowItem direction="row" justifyContent="space-between">
        <Typography variant="h5">Username:</Typography>
        <Typography variant="h5">Karan</Typography>
      </RowItem>
      <RowItem direction="row" justifyContent="space-between">
        <Typography variant="h5">Email:</Typography>
        <Typography variant="h5">karanjalendere@gmail.com</Typography>
      </RowItem>
      <Stack direction="row" justifyContent="flex-end" marginTop="20px">
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            setTogglePassword(true);
            resetChangePasswordForm();
          }}
        >
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
