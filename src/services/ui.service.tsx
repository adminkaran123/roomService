import { useDispatch, useSelector } from "react-redux";
import {
  uiState,
  setLoading,
  resetUI,
  setLayoutData,
} from "../redux/slices/uiSlice";
export const UiService = () => {
  const uiRef = useSelector(uiState);
  const dispatch = useDispatch();

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

  return {
    uiValue,
    toggleLoading,
    handleresetUI,
    uiRef,
    handleLayoutData,
  };
};
