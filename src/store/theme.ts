"use client";
import { createSlice } from "@reduxjs/toolkit";

interface Itheme {
  currentTheme: string; //MediaQueryList;
  isDark: string; //boolean;
}

const initialState: Itheme = {
  currentTheme: "", //window.matchMedia("(prefers-color-scheme: dark)"),
  isDark: "", //window.matchMedia("(prefers-color-scheme: dark)").matches,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    switchTheme: (state, actions) => {},
    listener: (state, actions) => {},
  },
});

export const themeActions = themeSlice.actions;
