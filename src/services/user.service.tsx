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

  const loadAuthCode = async (setAuthData: Function) => {
    if (code !== null) {
      toggleLoading(true);
      try {
        const { data } = await axios.get("/oauth-callback?code=" + code);
        console.log("data", data);
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

  const registerUser = async (payload: any) => {
    try {
      const { data } = await axios.post("/auth/signin", {
        email: payload.email,
        password: payload.password,
      });
      dispatch(signIn(data));

      //setLoading(false);
    } catch (err) {
      console.log(err);
      handleError(err);
      //setLoading(false);
    }
  };

  const removeToken = () => {
    dispatch(signOut());
  };

  return {
    loginUser,
    userValue,
    registerUser,
    removeToken,
    loadAuthCode,
  };
};
