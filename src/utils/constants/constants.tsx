export const API_URL =
  window.location.hostname === "localhost" ? "http://localhost/api" : "/api";
import DateRangeIcon from "@mui/icons-material/DateRange";
export const FILE_SIZE_PARAM_NAME = "fileSize";
export const STATUS_PARAM_NAME = "status";
export const ACTIVE_STATUS_PARAM_NAME = "active_status";
export const MODULE_PARAM_NAME = "param";
export const ACTION_PARAM_NAME = "action";
export const STATUS_TEXT_PARAM_NAME = "status_text";
export const STATUS_PARAM_FILE_TYPE = "fileType";
export const NAME_PARAM = "name";
export const LAST_SAVED_PAYMENT_INFO_PARAM = "lastSavedPaymentInfo";
export const DATE_PARAM_NAME = "paymentDateTime";
export const AMOUNT_PAID_PARAM_NAME = "paidAmount";
export const DOWNLOAD_PARAM_NAME = "download";
export const RISK_BADGE = "riskBadge";
export const INSTITUTION_PARAM = "Institution";
export const INSTITUTION_PARAM_WITH_LOGO = "Institution_with_logo";

export const feidTypes: any = {
  booleancheckbox: (
    <div className="icon_item booleancheckbox">
      <span className="checkbox_style"></span>
    </div>
  ),
  checkbox: (
    <div className="icon_item checkbox">
      <span className="checkbox_style"></span>
      <span className="checkbox_style"></span>
    </div>
  ),
  radio: (
    <div className="icon_item radio">
      <span className="radio_style"></span>
    </div>
  ),
  text: (
    <div className="icon_item radio">
      <span className="text_style">abc..</span>
    </div>
  ),
  phonenumber: (
    <div className="icon_item radio">
      <span className="text_style">abc..</span>
    </div>
  ),
  number: (
    <div className="icon_item number">
      <span className="number_style">123..</span>
    </div>
  ),
  textarea: (
    <div className="icon_item textarea">
      <span className="textarea_style">
        abc..
        <br />
        abc...
      </span>
    </div>
  ),
  select: (
    <div className="icon_item select">
      <span className="select_style"></span>
    </div>
  ),
  date: (
    <div className="icon_item date">
      <DateRangeIcon />
    </div>
  ),
};

export const InputTypes = [
  {
    label: "Outlined",
    value: "outlined",
  },
  {
    label: "Filled",
    value: "filled",
  },
  {
    label: "Standard",
    value: "standard",
  },
];

export const feidTypesOptions: any = {
  booleancheckbox: "Single Checkbox",
  checkbox: "Checkbox",
  radio: "Radio",
  text: "Text",
  phonenumber: "Phone Number",
  number: "Number",
  textarea: "TextArea",
  select: "Select",
  date: "Date",
};

export const extraFeidTypesDropDown = [
  {
    label: "Textfelied",
    value: "text",
  },
  {
    label: "Filled",
    value: "filled",
  },
  {
    label: "Standard",
    value: "standard",
  },
];

export const singleCheckboxOptions = [
  {
    label: "Switch",
    value: "switch",
  },
  {
    label: "Image Select",
    value: "image_select_single",
  },
];

export const textFeildOptions = [
  {
    label: "Browse file",
    value: "browse_file",
  },
  {
    label: "Rating",
    value: "rating",
  },

  {
    label: "Country Select",
    value: "country_select",
  },
  {
    label: "Phone No Select",
    value: "phone_no_select",
  },
  {
    label: "Range Slider",
    value: "range_slider",
  },
  {
    label: "Slider",
    value: "slider",
  },
  {
    label: "Multi Select",
    value: "multi_select",
  },
  {
    label: "Signature",
    value: "signature",
  },
];

export const numberFeildOptions = [
  {
    label: "Slider",
    value: "slider",
  },
];

export const chekBokOptions = [
  {
    label: "Image Select",
    value: "image_select_checkbox",
  },
];

export const radioOptions = [
  {
    label: "Image Select",
    value: "image_select_radio",
  },
];

export const plans = {
  premium: "price_1NgQAWD6BMgDnsI2lmw39rzZ",
  plus: "price_1NgQ9tD6BMgDnsI2RtOBQkc7",
  basic: "price_1NgQ97D6BMgDnsI2D84JNPt9",
};
