import React, { useState, useEffect } from "react";
import { API_URL } from "../../utils/constants/constants";
import { useNavigate } from "react-router";
import { UserService, UiService } from "../../services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export const changePasswordSchema = yup.object().shape({
  old_password: yup
    .string()
    .label("old_password")
    .required("Please input the value for old password"),
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
    .label("confirm_password")
    .required("Please input the value for confirm password")
    //@ts-ignore
    .oneOf([yup.ref("confirm_password"), null], "Password should match")
    .typeError("This is an error"),
});

const useProfile = () => {
  const navigate = useNavigate();

  const { userValue, changePassword } = UserService();
  const { onBoardUser } = UiService();
  const { user } = userValue();
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [togglePassword, setTogglePassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register: registerChangePassword,
    handleSubmit: handleResetPaaswordSubmit,
    formState: { errors: changePasswordErrors },
    reset: resetChangePasswordForm, // Add reset function
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onChangePassword = async (values: any) => {
    changePassword(
      {
        password: values.password,
        old_password: values.old_password,
      },
      setLoading,
      setTogglePassword
    );
  };
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return {
    navigate,
    user,
    onBoardUser,
    registerChangePassword,
    handleResetPaaswordSubmit,
    changePasswordErrors,
    handleClickShowPassword,
    onChangePassword,
    showPassword,
    handleMouseDownPassword,
    showConfirmPassword,
    handleClickShowConfirmPassword,
    togglePassword,
    setTogglePassword,
    loading,
    resetChangePasswordForm,
    showOldPassword,
    handleClickShowOldPassword,
  };
};

export default useProfile;
