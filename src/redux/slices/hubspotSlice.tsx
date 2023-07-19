import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  properties: [],
  portals: [],
};

export const hubspotSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setPortals: (state, action) => {
      state.portals = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProperties, setPortals } = hubspotSlice.actions;

export const hubspotState = (state: any) => state?.hubspot;

export default hubspotSlice.reducer;
