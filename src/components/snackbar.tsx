"use client";
import { useEffect, useState } from "react";
import classes from "./snackbar.module.css";
import { createPortal } from "react-dom";
const Snackbar = ({ message }: { message: string }) => {
  const [snackbarContainer, setSnackbarContainer] = useState<Element | null>(
    null
  );

  useEffect(() => {
    setSnackbarContainer(document.querySelector("#footer"));
  }, []);

  return snackbarContainer
    ? createPortal(
        <div className={classes["snackbar-holder"]}>
          <p className={classes.snackbar}>{message}</p>
        </div>,
        snackbarContainer! as Element
      )
    : null;
};

export default Snackbar;
