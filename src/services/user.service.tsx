import { useDispatch, useSelector } from "react-redux";
import {
  signIn,
  signOut,
  userState,
  updateHsToken,
  updateUserProfile,
} from "../redux/slices/userSlice";
import { ErrorHandler } from "../utils/helpers";
import { UiService } from "./ui.service";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
export const UserService = () => {
  const userRef = useSelector(userState);
  const { toggleLoading, getTour } = UiService();

  const dispatch = useDispatch();
  const { handleError } = ErrorHandler();
  const { search } = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);
  const code = query.get("code");

  const userValue = () => {
    return userRef?.user;
  };

  const loadAuthCode = async () => {
    if (code !== null) {
      toggleLoading(true);
      toggleLoading(true);
      try {
        const { data } = await axios.get("/oauth-callback?code=" + code);
        toast.success(data?.message, {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });

        dispatch(signIn(data));
        toggleLoading(false);
        navigate("/dashboard");
      } catch (err) {
        handleError(err);
        navigate("/dashboard");
        toggleLoading(false);
      }
    }
  };

  const loginUser = async (
    payload: any,
    setLoading: Function,

    setOtpSent: Function
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/signin", {
        email: payload.email,
        password: payload.password,
      });
      if (data.isVerifed) {
        dispatch(signIn(data));
        const userData = await getUserProfile(true);
        await getTour(true);
        navigate("/dashboard");
      } else {
        setOtpSent(true);
        resendOtp(payload.email);
      }

      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const logOutUser = async () => {
    dispatch(signOut());
  };

  const registerUser = async (
    payload: any,
    setLoading: Function,
    setOtpSent: Function
  ) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/signup", payload);
      setLoading(false);
      setOtpSent(true);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const verifyOtp = async (payload: any, setLoading: Function) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/verify-otp", payload);

      dispatch(signIn(data));
      await getUserProfile(true);
      await getTour(true);
      navigate("/dashboard");
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const resendOtp = async (email: string) => {
    toggleLoading(true);

    try {
      const { data } = await axios.post("/auth/resend-otp", { email });
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    toggleLoading(true);

    try {
      const { data } = await axios.post("/auth/forgot-password", { email });
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const resetPassword = async (payload: any, setLoading: Function) => {
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/reset-password", payload);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      navigate("/login");
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const changePassword = async (
    payload: any,
    setLoading: Function,
    setTogglePassword: Function
  ) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/change-password", payload);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      setLoading(false);
      setTogglePassword(false);
    } catch (err) {
      handleError(err);
      setTogglePassword(false);
      setLoading(false);
    }
  };

  const getUserProfile = async (allowFetch = false) => {
    console.log("userRef", userRef?.user?.user);
    if (userRef?.user?.user?.token || allowFetch) {
      toggleLoading(true);
      try {
        const { data } = await axios.get("/auth/get-profile");
        dispatch(updateUserProfile(data));
        toggleLoading(false);
        return data;
      } catch (err) {
        handleError(err);
        toggleLoading(false);
      }
    }
  };

  return {
    loginUser,
    userValue,
    registerUser,
    loadAuthCode,
    logOutUser,
    verifyOtp,
    resendOtp,
    forgotPassword,
    resetPassword,
    changePassword,
    getUserProfile,
  };
};
