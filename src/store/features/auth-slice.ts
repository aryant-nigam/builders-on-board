"use client";
import { createSlice } from "@reduxjs/toolkit";

interface Iuser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  is_builder: boolean;
}

export interface DecodedToken {
  csrf: string;
  exp: number;
  fresh: boolean;
  iat: number;
  jti: string;
  nbf: number;
  sub: Iuser;
  type: string;
}

interface IAuth {
  user: Iuser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IAuth = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeAuthenticatedUserDetails: (state, actions) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setAuthenticatedUserDetails: (state, actions) => {
      console.log(actions);
      state.user = actions.payload.user;
      state.accessToken = actions.payload.accessToken;
      state.refreshToken = actions.payload.refreshToken;
    },
  },
});

export const { setAuthenticatedUserDetails, removeAuthenticatedUserDetails } =
  authSlice.actions;

export default authSlice.reducer;
