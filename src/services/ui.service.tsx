import { useDispatch, useSelector } from "react-redux";
import { uiState, setLoading, resetUI } from "../redux/slices/uiSlice";
import { ErrorHandler } from "../utils/helpers";
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

  return {
    uiValue,
    toggleLoading,
    handleresetUI,
  };
};
