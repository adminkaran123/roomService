import { useDispatch, useSelector } from "react-redux";
import { ErrorHandler } from "../utils/helpers";
import {
  uiState,
  setLoading,
  resetUI,
  setLayoutData,
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
    dispatch(setLayoutData(value));
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
  };
};
