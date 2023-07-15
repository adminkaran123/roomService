import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  properties: [],
};

export const hubspotSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setPropeerites: (state, action) => {
      state.properties = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPropeerites } = hubspotSlice.actions;

export const hubspotState = (state: any) => state?.ui;

export default hubspotSlice.reducer;
