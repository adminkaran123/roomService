import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants/constants";
import { useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserService, UiService } from "../../services";

import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

export const resetSchema = yup.object().shape({
  password: yup
    .string()
    .label("password")
    .required("Please input the value for new password")
    .typeError("This is an error")
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special characters."
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
  confirm_password: yup
    .string()
    .label("ConfirmPassword")
    .required("Please input the value for confirm password")
    //@ts-ignore
    .oneOf([yup.ref("confirm_password"), null], "Password should match")
    .typeError("This is an error"),
});

export const registerUserSchema = yup.object().shape({
  username: yup.string().required("Please input the value for username"),
  email: yup.string().email().required("Please input the value for email"),
  password: yup
    .string()
    .label("password")
    .required("Please input the value for new password")
    .typeError("This is an error")
    .min(
      8,
      "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special characters."
    )
    .minLowercase(1, "password must contain at least 1 lower case letter")
    .minUppercase(1, "password must contain at least 1 upper case letter")
    .minNumbers(1, "password must contain at least 1 number")
    .minSymbols(1, "password must contain at least 1 special character"),
  confirm_password: yup
    .string()
    .label("ConfirmPassword")
    .required("Please input the value for confirm password")
    //@ts-ignore
    .oneOf([yup.ref("confirm_password"), null], "Password should match")
    .typeError("This is an error"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Please input the value for email"),
  password: yup.string().required("Please input the value for password"),
});

export const forgotSchema = yup.object().shape({
  email: yup.string().email().required("Please input the value for email"),
});

const useLogin = () => {
  const { pathname, search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const query = new URLSearchParams(search);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  const token = query.get("token");

  const {
    loginUser,
    registerUser,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
  } = UserService();

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const {
    register: handleLoginUser,
    handleSubmit: handleUserSubmit,
    formState: { errors: createUserErrors },
  } = useForm({
    resolver: yupResolver(registerUserSchema),
  });

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: createLoginErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerForgotPassword,
    handleSubmit: handleForgotPasswordSubmit,
    formState: { errors: forgotPasswordErrors },
  } = useForm({
    resolver: yupResolver(forgotSchema),
  });

  const {
    register: registerResetPassword,
    handleSubmit: handleResetPaaswordSubmit,
    formState: { errors: resetPasswordErrors },
  } = useForm({
    resolver: yupResolver(resetSchema),
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleConnect = async () => {
    if (typeof window !== "undefined") {
      window.location.href = API_URL + "/oauth";
    }
  };

  const onUserCreate = async (values: any) => {
    registerUser(values, setLoading, setOtpSent);
    setEmail(values.email);
  };

  const handleVerifyOtp = async () => {
    verifyOtp(
      {
        otp,
        email,
      },
      setLoading
    );
  };

  const handleResendOtp = async () => {
    resendOtp(email);
  };

  const onUserLogin = async (values: any) => {
    loginUser(values, setLoading, setOtpSent);
    setEmail(values.email);
  };

  const onForgotPassword = async (values: any) => {
    forgotPassword(values.email);
  };

  const onResetPassword = async (values: any) => {
    resetPassword(
      {
        password: values.password,
        token,
      },
      setLoading
    );
  };
  return {
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
    verifyOtp,
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
  };
};

export default useLogin;
