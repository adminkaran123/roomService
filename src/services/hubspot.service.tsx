import { useDispatch, useSelector } from "react-redux";
import { userState, updateToken } from "../redux/slices/userSlice";
import {
  setProperties,
  hubspotState,
  setPortals,
  setThemeSetting,
  setStepForms,
} from "../redux/slices/hubspotSlice";

import { ErrorHandler } from "../utils/helpers";
import { UiService } from "./ui.service";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
export const HubspotService = () => {
  const userRef = useSelector(userState);
  const hubspotRef = useSelector(hubspotState);
  const navigate = useNavigate();

  const { toggleLoading } = UiService();

  const dispatch = useDispatch();
  const { handleError } = ErrorHandler();
  const { search } = useLocation();
  const getFeilds = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/properties");
      dispatch(
        setProperties(data.data.filter((prp: any) => prp.formField == true))
      );
      if (data.token) {
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

  const getStepForms = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/step-form/forms");
      dispatch(setStepForms(data.data));
      console.log("data", data);

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const creteStepForm = async (payload: any) => {
    toggleLoading(true);
    try {
      const { data } = await axios.post("/step-form/create", payload);
      //dispatch(setStepForms(data.data));
      navigate("/forms");

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
    getStepForms,
    creteStepForm,
  };
};
