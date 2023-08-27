import { signOut } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

export const ErrorHandler = () => {
  const dispatch = useDispatch();
  const handleError = (err: any) => {
    toast.error(err.response?.data?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if (err.response?.status === 401) {
      dispatch(signOut());
    }
  };

  return {
    handleError,
  };
};

export const formatDate = (date: Date) => {
  return moment(date).format("MMM Do YY");
};

// [11:53 am, 07/05/2023] Prince Si: or sec me aise conver ho jayega

export const convertTimeToSec = (date: Date) => {
  const timeString = "12:30";
  const [hours, minutes] = timeString
    .split(":")
    .map((str) => parseInt(str, 10));
  return hours * 3600 + minutes * 60;
};

export const convertSecToTime = (seconds: any) => {
  console.log("seconds", seconds);
  const hours = Math.floor(seconds / 3600);
  seconds = seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  return hours + ":" + minutes;
};

export const getParameterByName = (name: string, url: string) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

export const currencyFormater = (number: any, currency = "INR") => {
  const price = 14340;

  // Format the price above to USD using the locale, style, and currency.
  let fomatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumSignificantDigits: 3,
  });

  return fomatter.format(number);
};
