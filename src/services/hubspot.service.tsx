import { useDispatch, useSelector } from "react-redux";
import { userState } from "../redux/slices/userSlice";
import { setPropeerites } from "../redux/slices/hubspotSlice";

import { ErrorHandler } from "../utils/helpers";
import { UiService } from "./ui.service";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
export const HubspotService = () => {
  const userRef = useSelector(userState);
  const { toggleLoading } = UiService();

  const dispatch = useDispatch();
  const { handleError } = ErrorHandler();
  const { search } = useLocation();
  const getFeilds = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/properties");
      console.log("data", data);
      dispatch(setPropeerites(data.data));
      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  return {
    getFeilds,
  };
};
