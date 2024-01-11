import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
  tour: [],
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.isLoggedIn = true;
    },
    updateToken: (state, action) => {
      state.user = { ...state.user, token: action.payload };
    },
    updateUserProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    updateHsToken: (state, action) => {
      state.user = { ...state.user, hs_access_token: action.payload };
    },

    updateStripeAccountID: (state, action) => {
      state.user = { ...state.user, stripe_account_id: action.payload };
    },
    updatePortal: (state, action) => {
      state.user = {
        ...state.user,
        portal_id: action.payload.portal_id,
        token: action.payload.token,
      };
    },
    signOut: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
    setTour: (state, action) => {
      state.tour = action.payload;
    },
  },
});

export const {
  signIn,
  signOut,
  updateToken,
  updatePortal,
  updateHsToken,
  updateStripeAccountID,
  updateUserProfile,
  setTour,
} = userSlice.actions;
export const userState = (state: any) => state;
export default userSlice.reducer;
