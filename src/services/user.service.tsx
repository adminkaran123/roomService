import { useDispatch, useSelector } from "react-redux";
import { signIn, signOut, userState } from "../redux/slices/userSlice";
import { ErrorHandler } from "../utils/helpers";
import { UiService } from "./ui.service";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
export const UserService = () => {
  const userRef = useSelector(userState);
  const { toggleLoading } = UiService();

  const dispatch = useDispatch();
  const { handleError } = ErrorHandler();
  const { search } = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(search);
  const code = query.get("code");

  const userValue = () => {
    return userRef?.user;
  };

  const checkUser = async (payload: any) => {
    toggleLoading(true);
    try {
      const { data } = await axios.post("/auth/checkuser", payload);
      if (data.isExist) {
        dispatch(signIn(data));
        navigate("/dashboard");
      }
      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const loadAuthCode = async (setAuthData: Function) => {
    if (code !== null) {
      toggleLoading(true);
      try {
        const { data } = await axios.get("/oauth-callback?code=" + code);

        await checkUser(data);

        setAuthData(data);
      } catch (err) {
        handleError(err);
        toggleLoading(false);
      }
    }
  };

  const loginUser = async (payload: any, setLoading: Function) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/signin", {
        email: payload.email,
        password: payload.password,
      });

      dispatch(signIn(data));
      navigate("/dashboard");
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  const logOutUser = async () => {
    dispatch(signOut());
  };

  const registerUser = async (payload: any, setLoading: Function) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/auth/signup", payload);
      navigate("/login");
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
  };

  return {
    loginUser,
    userValue,
    registerUser,

    loadAuthCode,
    logOutUser,
  };
};
