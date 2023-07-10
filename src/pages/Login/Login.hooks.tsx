import React, { useState } from "react";
import { API_URL } from "../../utils/constants/constants";
import { useLocation } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const confirmPasswordCredentialsSchema = yup.object().shape({
  password: yup
    .string()
    .label("password")
    .required("Please input the value for new password")
    .typeError("This is an error")
    .min(
      12,
      "Password must contain 12 or more characters with at least one of each: uppercase, lowercase, number and special characters."
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
  confirm_password: yup
    .string()
    .label("ConfirmPassword")
    .required("Please input the value for confirm password")
    .oneOf([yup.ref("confirm_password"), null], "Password should match")
    .typeError("This is an error"),
});

const useLogin = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const {
    register: registerLogin,
    control,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: yupResolver(confirmPasswordCredentialsSchema),
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    if (typeof window !== "undefined") {
      window.location.href = API_URL + "/oauth";
    }
  };

  const onUserCreate = async () => {
    alert("workinf");
  };
  return {
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
  };
};

export default useLogin;
