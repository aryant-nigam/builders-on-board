"use client";
import React from "react";
import { useRouter } from "next/navigation";
import classes from "./page.module.css";

function SessionExpired() {
  const router = useRouter();
  return (
    <div className={classes["session-page"]}>
      <div className={classes["img-container"]}>
        <img
          className={classes["builder-session-expired-img"]}
          src="builder-session-expired.png"
        ></img>
        <button
          className={classes.reload}
          onClick={() => {
            router.replace("/");
            setTimeout(() => {
              window.location.reload();
            }, 500);
          }}
        >
          reload
        </button>
      </div>
      <div className={classes["page-title"]}>
        <h1 className={classes["broken-char"]}>S</h1>
        <h1 className={classes["broken-char"]}>e</h1>
        <h1 className={classes["broken-char"]}>s</h1>
        <h1 className={classes["broken-char"]}>s</h1>
        <h1 className={classes["broken-char"]}>i</h1>
        <h1 className={classes["broken-char"]}>o</h1>
        <h1 className={classes["broken-char"]}>n</h1>
        <h1 className={classes["broken-char"]}>&nbsp;</h1>
        <h1 className={classes["broken-char"]}>E</h1>
        <h1 className={classes["broken-char"]}>x</h1>
        <h1 className={classes["broken-char"]}>p</h1>
        <h1 className={classes["broken-char"]}>i</h1>
        <h1 className={classes["broken-char"]}>r</h1>
        <h1 className={classes["broken-char"]}>e</h1>
        <h1 className={classes["broken-char"]}>d</h1>
      </div>
    </div>
  );
}

export default SessionExpired;
