import { useDispatch, useSelector } from "react-redux";
import {
  userState,
  updateToken,
  updatePortal,
} from "../redux/slices/userSlice";
import { setEditFormData } from "../redux/slices/uiSlice";
import { toast } from "react-toastify";
import {
  setProperties,
  hubspotState,
  setPortals,
  setStepForms,
  setSubmissons,
  setUsers,
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

  const getStepForms = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/step-form/forms");
      dispatch(setStepForms(data.data));

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const getSubmissions = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/step-form/submissions");
      dispatch(setSubmissons(data.data));

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const getUsers = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/users");
      dispatch(setUsers(data.data));

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
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });

      navigate("/forms");

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const editStepForm = async (payload: any) => {
    toggleLoading(true);
    try {
      const { data } = await axios.patch("/step-form/update", payload);
      //dispatch(setStepForms(data.data));
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });

      navigate("/forms");

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const deleteStepForm = async (formid: any) => {
    toggleLoading(true);
    try {
      const { data } = await axios.delete("/step-form/" + formid);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });

      toggleLoading(false);
      getStepForms();
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const deleteSubmisson = async (submissonId: any) => {
    toggleLoading(true);
    try {
      const { data } = await axios.delete("/submisson/" + submissonId);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });

      toggleLoading(false);
      getSubmissions();
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const getStepFormById = async (formid: any, setName: Function) => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/step-form/" + formid);
      console.log("data.data.endScreen", data.data.logicData);
      dispatch(
        setEditFormData({
          endScreenData: JSON.parse(data.data.endScreen),
          layoutData: JSON.parse(data.data.formData),
          themeSetting: JSON.parse(data.data.themeSetting),
          logicData: JSON.parse(data.data.logicData),
          calcResult: JSON.parse(data.data.calulation),
        })
      );
      setName(data.data.name);

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  return {
    getFeilds,
    hubspotRef,
    getStepForms,
    creteStepForm,
    deleteStepForm,
    getStepFormById,
    editStepForm,
    getSubmissions,
    deleteSubmisson,
    getUsers,
  };
};
