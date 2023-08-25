import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
  layoutData: [
    {
      slide_title: "Untitled",
      data: [],
    },
  ],
  activeSlide: 0,
  activeEndScreen: false,
  selectedItem: null,
  images: [],
  endScreenData: {
    slide_title: "Thank you",
    content: JSON.stringify(
      '<h2 class="ql-align-center">Thanks for Submiting the form</h2><p class="ql-align-center"><br></p><p class="ql-align-center">We will get back to you shorty...</p>'
    ),
    redirectLink: "",
  },
  themeSetting: {
    type: "outlined",
    inputTextColor: "#fff",
    labelColor: "#fff",
    borderColor: "#fff",
    borderFocusedColor: "#11c4e0",
    borderHoverColor: "#11c4e0",
    checkedColor: "#ccc",
    checkedActiveColor: "#11c4e0",
    background: "#11c4e0",
    bgImage: "",
    btnTextColor: "#fff",
    btnBgColor: "#11c4e0",
    footeBg: "#fff",
    btnHoveColor: "#fff",
    btnHoveBgColor: "#1a93a6",
    prevBtnText: "Prev",
    nextBtnText: "Next",
    submitBtnText: "Submit",
    step_style: "with_header_steps",
    step_bg: "#1a93a6",
    step_text_color: "#fff",
    step_label_text_color: "#fff",
    step_active_bg: "#b8e986",
    step_active_text_color: "#fff",
    step_active__label_text_color: "#fff",
    preview_type: "with_header_steps",
  },
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
    setActiveSlide: (state, action) => {
      state.activeSlide = action.payload;
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
    setEditFormData: (state, action) => {
      state.endScreenData = action.payload.endScreenData;
      state.layoutData = action.payload.layoutData;
      state.themeSetting = action.payload.themeSetting;
    },
    setThemeSetting: (state, action) => {
      state.themeSetting = action.payload;
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
} = uiSlice.actions;

export const uiState = (state: any) => state?.ui;

export default uiSlice.reducer;
