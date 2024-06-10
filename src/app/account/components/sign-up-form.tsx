"use client";
import React from "react";
import classes from "./sign-up-form.module.css";
import { useState, useEffect } from "react";
import SignupFormCustomer from "./sign-up-form-customer";
import SignupFormBuilder from "./sign-up-form-builder";

function SignupForm({
  isLoginFormVisible,
  postSignUpHandler,
}: {
  isLoginFormVisible: boolean;
  postSignUpHandler: () => void;
}) {
  const [accountType, setAccountType] = useState<string>("customer");

  const accountTypeSwitchHandler = (accType: string) => {
    setAccountType(accType);
  };

  useEffect(() => {
    return () => {
      if (!isLoginFormVisible) {
        setAccountType("customer");
      }
    };
  }, [isLoginFormVisible]);

  return (
    <div
      className={`${classes["form-container"]} ${
        isLoginFormVisible ? classes["fadein"] : classes["fadeout"]
      }`}
    >
      <h1>
        Sign <span className={classes["highlighted-text"]}>Up</span>
      </h1>

      {accountType === "customer" ? (
        <SignupFormCustomer
          isLoginFormVisible={isLoginFormVisible}
          postSignUpHandler={postSignUpHandler}
        />
      ) : (
        <SignupFormBuilder
          isLoginFormVisible={isLoginFormVisible}
          postSignUpHandler={postSignUpHandler}
        ></SignupFormBuilder>
      )}

      <div className={classes["account-type-selector"]}>
        <h3>Account Type</h3>
        <div className={classes["account-type-option"]}>
          <input
            type="radio"
            id="customer"
            value="customer"
            checked={accountType === "customer"}
            onChange={() => accountTypeSwitchHandler("customer")}
          ></input>
          <label htmlFor="customer" className={classes["label"]}>
            Customer
          </label>
        </div>
        <div className={classes["account-type-option"]}>
          <input
            type="radio"
            id="builder"
            value="builder"
            checked={accountType === "builder"}
            onChange={() => accountTypeSwitchHandler("builder")}
          ></input>
          <label htmlFor="builder" className={classes["label"]}>
            Builder
          </label>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
