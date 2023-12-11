import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  properties: [],
  portals: [],
  stepForms: [],
  submissons: [],
  users: [],
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

    setStepForms: (state, action) => {
      state.stepForms = action.payload;
    },
    setSubmissons: (state, action) => {
      state.submissons = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setProperties,
  setPortals,
  setStepForms,
  setSubmissons,
  setUsers,
} = hubspotSlice.actions;

export const hubspotState = (state: any) => state?.hubspot;

export default hubspotSlice.reducer;
