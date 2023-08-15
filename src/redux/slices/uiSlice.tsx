import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
  layoutData: [[]],
  activeSlide: 0,
  activeEndScreen: false,
  selectedItem: null,
  images: [],
  endScreenData: {
    content: JSON.stringify(
      '<h2 class="ql-align-center">Thanks for Submitton the form</h2><p class="ql-align-center"><br></p><p class="ql-align-center">We will get back to you shorty</p>'
    ),
    redirectLink: "",
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
} = uiSlice.actions;

export const uiState = (state: any) => state?.ui;

export default uiSlice.reducer;
