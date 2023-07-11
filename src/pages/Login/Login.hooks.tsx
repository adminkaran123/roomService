import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants/constants";
import { useLocation } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "../../api/axios";

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
    .oneOf([yup.ref("confirm_password"), null], "Password should match")
    .typeError("This is an error"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Please input the value for email"),
  password: yup.string().required("Please input the value for password"),
});

const useLogin = () => {
  const { pathname, search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const query = new URLSearchParams(search);
  const code = query.get("code");
  const [authData, setAuthData] = useState<any>(null);
  console.log("code", code);

  useEffect(() => {
    loadAuthCode();
  }, []);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const {
    register: registerUser,
    handleSubmit: handleUserSubmit,
    formState: { errors: createUserErrors },
  } = useForm({
    resolver: yupResolver(confirmPasswordCredentialsSchema),
  });

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: createLoginErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
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

  const loadAuthCode = async () => {
    if (code !== null) {
      try {
        const { data } = await axios.get("/oauth-callback?code=" + code);
        console.log("data", data);
        setAuthData(data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onUserCreate = async (values: any) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/signup", {
        ...authData,
        password: values.password,
      });
      console.log("data", data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const onUserLogin = async (values: any) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/signin", {
        email: values.password,
        password: values.password,
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
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
    registerUser,
    createUserErrors,
    handleUserSubmit,
    loading,
    authData,
    registerLogin,
    handleLoginSubmit,
    createLoginErrors,
    onUserLogin,
  };
};

export default useLogin;
