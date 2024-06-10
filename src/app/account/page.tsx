"use client";
import React, { useState } from "react";
import classes from "./page.module.css";
import SigninForm from "./components/sign-in-form";
import SignupForm from "./components/sign-up-form";

function Content({
  heading,
  subHeading,
  btnText,
  toggleHandler,
}: {
  heading: string;
  subHeading: string;
  btnText: string;
  toggleHandler: () => void;
}) {
  return (
    <div className={classes["content"]}>
      <h1 className={classes["sliding-page-heading"]}>{heading}</h1>
      <h4 className={classes["sliding-page-subheading"]}>{subHeading}</h4>
      <button className={classes["toggle-btn"]} onClick={toggleHandler}>
        {btnText}
      </button>
    </div>
  );
}

function AccountPage() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState<boolean>(true);

  const toggleHandler = () => {
    setIsLoginFormVisible((prevState) => {
      console.log(!prevState ? "animation-right" : "animation-left");
      return !prevState;
    });
  };

  return (
    <div className={classes["account-page"]}>
      <div className={classes["account-page-section-container"]}>
        <div className={classes["account-page-signin-section"]}>
          <SigninForm isLoginFormVisible={isLoginFormVisible} />
        </div>
        <div className={classes["account-page-signup-section"]}>
          <SignupForm
            isLoginFormVisible={!isLoginFormVisible}
            postSignUpHandler={toggleHandler}
          />
        </div>
        <div
          className={`${classes["account-page-sliding-section"]} ${
            isLoginFormVisible
              ? classes["animation-left"]
              : classes["animation-right"]
          }`}
        >
          {isLoginFormVisible ? (
            <Content
              heading="Welcome Back!"
              subHeading="Enter your login credentials to use all of site features"
              btnText="sign up"
              toggleHandler={toggleHandler}
            />
          ) : (
            <Content
              heading="Hello, Customer!"
              subHeading="Register with your personal details to avail all of our services"
              btnText="sign in"
              toggleHandler={toggleHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
