"use-client";
import { configureStore } from "@reduxjs/toolkit";
import { themeSlice } from "./theme";
const store = configureStore({ reducer: { theme: themeSlice.reducer } });
export default store;
