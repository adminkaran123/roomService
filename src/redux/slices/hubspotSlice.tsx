import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  properties: [],
  portals: [],
  stepForms: [],
  themeSetting: {
    type: "outlined",
    inputTextColor: "#fff",
    labelColor: "#fff",
    borderColor: "#fff",
    borderFocusedColor: "#29A5FF",
    borderHoverColor: "#29A5FF",
    checkedColor: "#ccc",
    checkedActiveColor: "#29A5FF",
    background: "#4a90e2",
    bgImage: "",
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
      state.themeSetting = action.payload;
    },
    setStepForms: (state, action) => {
      state.stepForms = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProperties, setPortals, setThemeSetting, setStepForms } =
  hubspotSlice.actions;

export const hubspotState = (state: any) => state?.hubspot;

export default hubspotSlice.reducer;
