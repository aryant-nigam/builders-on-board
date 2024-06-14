"use client";
import { createSlice } from "@reduxjs/toolkit";

interface Iuser {
  id: number;
  is_builder: boolean;
}

interface IPersonaInformation {
  firstname: string;
  lastname: string;
  email: string;
  address: string | null;
  landmark: string | null;
  phoneNumber: string | null;
  pincode: string | null;
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
  userPersonalInformation: IPersonaInformation | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IAuth = {
  user: null,
  userPersonalInformation: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeAuthenticatedUserDetails: (state) => {
      console.log("I am removing details");
      state.user = null;
      state.userPersonalInformation = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setAuthenticatedUserDetails: (state, actions) => {
      console.log("request recieved to set user details", actions.payload);
      state.user = actions.payload.user;
      state.accessToken = actions.payload.accessToken;
      state.refreshToken = actions.payload.refreshToken;
    },

    setAuthenticatedUserPersonalDetails: (state, actions) => {
      console.log(
        "request recieved to set users personal details",
        actions.payload
      );
      console.log(actions.payload);
      state.userPersonalInformation = {
        ...state.userPersonalInformation,
        ...actions.payload,
      };
    },
  },
});

export const {
  setAuthenticatedUserDetails,
  removeAuthenticatedUserDetails,
  setAuthenticatedUserPersonalDetails,
} = authSlice.actions;

export default authSlice.reducer;
