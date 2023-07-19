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
    signOut: (state) => {
      state.user = {};
      state.isLoggedIn = false;
    },
  },
});

export const { signIn, signOut, updateToken } = userSlice.actions;
export const userState = (state: any) => state;
export default userSlice.reducer;
