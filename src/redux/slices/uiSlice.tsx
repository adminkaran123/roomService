import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  isLoading: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    resetUI: (state) => {
      return (state = initialState);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoading, resetUI } = uiSlice.actions;

export const uiState = (state: any) => state?.ui;

export default uiSlice.reducer;
