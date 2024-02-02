import { useDispatch, useSelector } from "react-redux";
import { ErrorHandler } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import {
  updateStripeAccountID,
  setTour,
  userState,
} from "../redux/slices/userSlice";
import { toast } from "react-toastify";

import {
  uiState,
  setLoading,
  resetUI,
  setLayoutData,
  setActiveSlide,
  setSelectedItem,
  setImages,
  setEndScreen,
  setEndScreenData,
  setThemeSetting,
  setLogicData,
  setErros,
  setFormValues,
  setFilterActiveSlide,
  setResult,
  setCamera,
} from "../redux/slices/uiSlice";
import axios from "../api/axios";
export const UiService = () => {
  const uiRef = useSelector(uiState);
  const userRef = useSelector(userState);
  const dispatch = useDispatch();
  const { handleError } = ErrorHandler();
  const navigate = useNavigate();

  const uiValue = () => {
    return uiRef;
  };

  const toggleLoading = (value: boolean) => {
    dispatch(setLoading(value));
  };
  const handleresetUI = () => {
    dispatch(resetUI());
  };

  const handleLayoutData = (value: any) => {
    const { layoutData, activeSlide } = uiRef;
    const layout = JSON.parse(JSON.stringify(layoutData));
    layout[activeSlide].data = JSON.parse(JSON.stringify(value));

    dispatch(setLayoutData(layout));
  };

  const handleCalcResult = (value: any) => {
    dispatch(setResult(value));
  };

  const handleTitle = (value: any) => {
    const { layoutData, activeSlide } = uiRef;
    const layout = JSON.parse(JSON.stringify(layoutData));
    layout[activeSlide] = JSON.parse(JSON.stringify(value));

    dispatch(setLayoutData(layout));
  };

  const updateLayots = (data: any) => {
    dispatch(setLayoutData(data));
  };

  const updateLogicData = (data: any) => {
    dispatch(setLogicData(data));
  };

  const changeActiveSlide = (value: any) => {
    dispatch(setActiveSlide(value));
    handleEndScreen(false);
  };

  const changeFilterActiveSlide = (value: any) => {
    dispatch(setFilterActiveSlide(value));
    handleEndScreen(false);
  };

  const handleEndScreen = (value: any) => {
    dispatch(setEndScreen(value));
  };

  const handleEndScreenData = (value: any) => {
    dispatch(setEndScreenData(value));
  };

  const addSlide = (setShowUpgradeDialog: Function) => {
    const { layoutData, activeSlide } = uiRef;
    const plan = userRef?.user?.user?.plan;
    const layout = JSON.parse(JSON.stringify(layoutData));
    if (plan === "monthly" || plan === "yearly" || layout.length < 4) {
      layout.push({
        slide_title: "Untitled",
        data: [],
      });
      dispatch(setLayoutData(layout));
    } else {
      setShowUpgradeDialog(true);
    }
  };

  const deleteSlide = (index: any) => {
    const { layoutData, activeSlide } = uiRef;
    if (activeSlide === index) {
      changeActiveSlide(0);
    }
    const layout = JSON.parse(JSON.stringify(layoutData));
    layout.splice(index, 1);
    dispatch(setLayoutData(layout));
  };

  const handleSelecteItem = (item: any) => {
    dispatch(setSelectedItem(item));
  };

  const handleErrors = (errors: any) => {
    dispatch(setErros(errors));
  };

  const handleFormValues = (errors: any) => {
    dispatch(setFormValues(errors));
  };

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    toggleLoading(true);
    try {
      const { data } = await axios.post("/upload-image-to-hs", formData);

      toggleLoading(false);
      getImages();
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const getImages = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.get("/get-images");
      dispatch(setImages(data.data));

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };
  const deleteImage = async (id: string) => {
    toggleLoading(true);
    try {
      const { data } = await axios.delete("/delete-image/" + id);
      toast.success(data?.message, {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      getImages();

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const purchasePlan = async (priceId: string) => {
    toggleLoading(true);
    try {
      const { data: response } = await axios.post("/buy", {
        priceId: priceId,
      });

      window.location.href = response.url;

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const onBoardUser = async () => {
    toggleLoading(true);
    try {
      const { data } = await axios.post("/onboard", {
        priceId: "aa",
      });
      toggleLoading(false);
      window.location.href = data.url;
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };

  const saveOnBoardUser = async (account_id: string) => {
    toggleLoading(true);

    try {
      const { data } = await axios.post("/onboard-save", {
        account_id: account_id,
      });
      navigate("/");
      dispatch(updateStripeAccountID(account_id));

      toggleLoading(false);
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
  };
  const getTour = async (allowFetch = false) => {
    if (userRef?.user?.isLoggedIn || allowFetch) {
      toggleLoading(true);
      try {
        const { data } = await axios.get("/get-user-tour");
        toggleLoading(false);
        dispatch(setTour(data.data));
      } catch (err) {
        handleError(err);
        toggleLoading(false);
      }
    }
  };

  const toggleCamera = (value: boolean) => {
    dispatch(setCamera(value));
  };

  const createAndUpadateTour = async (tour_data: any[]) => {
    try {
      const { data } = await axios.post("/create-upadte-tour", {
        tour_data: JSON.stringify(tour_data),
      });
      toggleLoading(false);
      dispatch(setTour(tour_data));
    } catch (err) {
      handleError(err);
    }
  };

  const updateThemeSettings = async (settings: any) => {
    dispatch(setThemeSetting(settings));
  };

  return {
    uiValue,
    toggleLoading,
    handleresetUI,
    uiRef,
    handleLayoutData,
    uploadImage,
    addSlide,
    changeActiveSlide,
    deleteSlide,
    handleSelecteItem,
    getImages,
    updateLayots,
    handleEndScreen,
    handleEndScreenData,
    updateThemeSettings,
    purchasePlan,
    handleTitle,
    onBoardUser,
    saveOnBoardUser,
    updateLogicData,
    handleErrors,
    handleFormValues,
    changeFilterActiveSlide,
    handleCalcResult,
    deleteImage,
    getTour,
    createAndUpadateTour,
    toggleCamera,
  };
};
