import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
  layoutData: [
    {
      slide_title: "Untitled",
      data: [],
    },
  ],
  logicData: [],
  activeSlide: 0,
  filterActiveSlide: 0,
  activeEndScreen: false,
  selectedItem: null,
  images: [],
  endScreenData: {
    slide_title: "Thank you",
    content: JSON.stringify(
      '<h2 class="ql-align-center">Thanks for Submiting the form</h2><p class="ql-align-center"><br></p><p class="ql-align-center">We will get back to you shorty...</p>'
    ),
    redirectLink: "",
    allowReset: true,
    resetButtonText: "Reset",
  },
  themeSetting: {
    type: "outlined",
    inputTextColor: "#000",
    labelColor: "#000",
    borderColor: "#000",
    borderFocusedColor: "#66b2ff",
    borderHoverColor: "#66b2ff",
    checkedColor: "#ccc",
    checkedActiveColor: "#4fd2c2",
    background: "#fff",
    bgImage: "",
    btnTextColor: "#fff",
    btnBgColor: "#4fd2c2",
    footeBg: "#fff",
    btnHoveColor: "#fff",
    btnHoveBgColor: "#1a93a6",
    prevBtnText: "Prev",
    nextBtnText: "Next",
    submitBtnText: "Submit",
    step_style: "with_header_steps",
    step_bg: "#4fd2c2",
    step_text_color: "#000",
    step_label_text_color: "#000",
    step_active_bg: "#777cf0",
    step_active_text_color: "#fff",
    step_active__label_text_color: "#777cf0",
    preview_type: "with_header_steps",
  },
  errors: {},
  formValues: {},
  calcResult: {
    show: false,
    multiple: false,
    singleData: JSON.stringify(
      '<h2 class="ql-align-center">Your Result</h2><p class="ql-align-center"><strong>{{result}}</strong></p><p class="ql-align-center"><br></p>'
    ),
    multiType: [],
  },
  tour: [],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setLayoutData: (state, action) => {
      state.layoutData = action.payload;
    },
    setLogicData: (state, action) => {
      state.logicData = action.payload;
    },
    setActiveSlide: (state, action) => {
      state.activeSlide = action.payload;
    },
    setFilterActiveSlide: (state, action) => {
      state.filterActiveSlide = action.payload;
    },
    setEndScreen: (state, action) => {
      state.activeEndScreen = action.payload;
    },
    setEndScreenData: (state, action) => {
      state.endScreenData = action.payload;
    },

    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setErros: (state, action) => {
      state.errors = action.payload;
    },
    setFormValues: (state, action) => {
      state.formValues = action.payload;
    },
    setEditFormData: (state, action) => {
      state.endScreenData = action.payload.endScreenData;
      state.layoutData = action.payload.layoutData;
      state.themeSetting = action.payload.themeSetting;
      state.logicData = action.payload.logicData;
      state.calcResult = action.payload.calcResult;
    },
    setThemeSetting: (state, action) => {
      state.themeSetting = action.payload;
    },
    setResult: (state, action) => {
      state.calcResult = action.payload;
    },
    setTour: (state, action) => {
      state.tour = action.payload;
    },

    resetUI: (state) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setLoading,
  resetUI,
  setLayoutData,
  setActiveSlide,
  setSelectedItem,
  setImages,
  setEndScreen,
  setEndScreenData,
  setEditFormData,
  setThemeSetting,
  setLogicData,
  setErros,
  setFormValues,
  setFilterActiveSlide,
  setResult,
  setTour,
} = uiSlice.actions;

export const uiState = (state: any) => state?.ui;

export default uiSlice.reducer;
