import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
  layoutData: [[]],
  activeSlide: 0,
  selectedItem: null,
  images: [],
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
} = uiSlice.actions;

export const uiState = (state: any) => state?.ui;

export default uiSlice.reducer;
