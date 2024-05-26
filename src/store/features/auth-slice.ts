"use client";
import { createSlice } from "@reduxjs/toolkit";

interface IAuth {
  username: string | null;
  accountType: boolean | null;
  accessToken: string | null;
}

const initialState: IAuth = {
  username: null,
  accountType: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state, actions) => {
      state.username = null;
      state.accountType = null;
      state.accessToken = null;
    },
    logIn: (state, actions) => {
      console.log(actions.payload);
      state.username = actions.payload.username;
      state.accountType = actions.payload.accountType;
      state.accessToken = actions.payload.accessToken;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
