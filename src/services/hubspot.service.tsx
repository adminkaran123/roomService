import { useDispatch, useSelector } from "react-redux";
import { userState, updateToken } from "../redux/slices/userSlice";
import {
  setProperties,
  hubspotState,
  setPortals,
  setThemeSetting,
} from "../redux/slices/hubspotSlice";

import { ErrorHandler } from "../utils/helpers";
import { UiService } from "./ui.service";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
export const HubspotService = () => {
  const userRef = useSelector(userState);
  const hubspotRef = useSelector(hubspotState);

  const { toggleLoading } = UiService();

  const dispatch = useDispatch();
  const { handleError } = ErrorHandler();
  const { search } = useLocation();
  const getFeilds = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/properties");
      dispatch(setProperties(data.data.filter((prp) => prp.formField == true)));
      if (data.token) {
        console.log("data.tokenaaa", data.token);
        console.log(data.token);
        dispatch(updateToken(data.token));
      }
      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const getPortals = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/portals");
      dispatch(setPortals(data.data));
      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const updateThemeSettings = async (settings: any) => {
    dispatch(setThemeSetting(settings));
  };

  return {
    getFeilds,
    getPortals,
    hubspotRef,
    updateThemeSettings,
  };
};
