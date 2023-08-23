import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLoggedIn: false,
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
  },
});

export const {
  signIn,
  signOut,
  updateToken,
  updatePortal,
  updateHsToken,
  updateStripeAccountID,
} = userSlice.actions;
export const userState = (state: any) => state;
export default userSlice.reducer;
