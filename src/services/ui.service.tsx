import { useDispatch, useSelector } from "react-redux";
import { ErrorHandler } from "../utils/helpers";
import {
  uiState,
  setLoading,
  resetUI,
  setLayoutData,
  setActiveSlide,
  setSelectedItem,
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
    const { layoutData, activeSlide } = uiRef;
    const layout = JSON.parse(JSON.stringify(layoutData));
    layout[activeSlide] = value;
    dispatch(setLayoutData(layout));
  };

  const changeActiveSlide = (value: any) => {
    dispatch(setActiveSlide(value));
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
    } catch (err) {
      handleError(err);
      toggleLoading(false);
    }
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
  };
};
