import { createSlice } from "@reduxjs/toolkit";

interface INotification {
  isDialogBoxVisible: boolean;
  isSnackBarVisible: boolean;
}

const initialState: INotification = {
  isDialogBoxVisible: false,
  isSnackBarVisible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    showDialogBox: (state, action) => {
      state.isDialogBoxVisible = true;
    },
    hideDialogBox: (state, action) => {
      state.isDialogBoxVisible = false;
    },
    showSnackBar: (state, action) => {
      state.isSnackBarVisible = true;
    },
    hideSnackBar: (state, action) => {
      state.isSnackBarVisible = false;
    },
  },
});

export const { showDialogBox, hideDialogBox, showSnackBar, hideSnackBar } =
  notificationSlice.actions;
export default notificationSlice.reducer;
