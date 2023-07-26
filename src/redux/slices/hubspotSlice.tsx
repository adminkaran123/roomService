import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  properties: [],
  portals: [],
  fieldSetting: {
    type: "outlined",
    inputTextColor: "#fff",
    labelColor: "#fff",
    borderColor: "green",
    borderFocusedColor: "green",
  },
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
    setThemeSetting: (state, action) => {
      state.fieldSetting = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProperties, setPortals, setThemeSetting } =
  hubspotSlice.actions;

export const hubspotState = (state: any) => state?.hubspot;

export default hubspotSlice.reducer;
