import { useDispatch, useSelector } from "react-redux";
import { ErrorHandler } from "../utils/helpers";
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
} from "../redux/slices/uiSlice";
import axios from "../api/axios";
export const UiService = () => {
  const uiRef = useSelector(uiState);
  const dispatch = useDispatch();
  const { handleError } = ErrorHandler();

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
    console.log("value", value);
    const { layoutData, activeSlide } = uiRef;
    const layout = JSON.parse(JSON.stringify(layoutData));
    layout[activeSlide] = JSON.parse(JSON.stringify(value));

    dispatch(setLayoutData(layout));
  };

  const updateLayots = (data: any) => {
    dispatch(setLayoutData(data));
  };

  const changeActiveSlide = (value: any) => {
    dispatch(setActiveSlide(value));
    handleEndScreen(false);
  };

  const handleEndScreen = (value: any) => {
    dispatch(setEndScreen(value));
  };

  const handleEndScreenData = (value: any) => {
    dispatch(setEndScreenData(value));
  };

  const addSlide = (value: any) => {
    const { layoutData, activeSlide } = uiRef;
    const layout = JSON.parse(JSON.stringify(layoutData));
    layout.push([]);
    dispatch(setLayoutData(layout));
  };

  const deleteSlide = (e: any, index: any) => {
    e.stopPropagation();
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

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    toggleLoading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);

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
  };
};
