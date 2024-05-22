"use client";
import React, { useState } from "react";
import classes from "./page.module.css";

function SignupContent() {
  return (
    <div className={classes["signup-content"]}>
      <img
        src="sliding-page-image.png"
        className={classes["sliding-page-image"]}
      ></img>
      <h1 className={classes["sliding-page-heading"]}>Hello, Friend!</h1>
      <h4 className={classes["sliding-page-subheading"]}>
        Register with your personal details to avail all of our services
      </h4>
    </div>
  );
}

function SigninContent() {
  return <div className={classes["signin-content"]}></div>;
}

function AccountPage() {
  const [isLoginFormVisible, setIsLoginFormVisible] =
    React.useState<boolean>(true);

  const toggleHandler = () => {
    setIsLoginFormVisible((prevState) => {
      console.log(!prevState);
      console.log(!prevState ? "animation-left" : "animation-right");
      return !prevState;
    });
  };

  return (
    <div className={classes["account-page"]}>
      <div className={classes["account-page-section-container"]}>
        <div className={classes["account-page-signin-section"]}></div>
        <div className={classes["account-page-signup-section"]}></div>
        <div
          className={`${classes["account-page-sliding-section"]} ${
            isLoginFormVisible
              ? classes["animation-left"]
              : classes["animation-right"]
          }`}
        >
          <SignupContent />
          <button onClick={toggleHandler}>toggle</button>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
