"use client";
import React from "react";
import classes from "./sign-up-form.module.css";
import { useState, useEffect } from "react";
import SignupFormCustomer from "./sign-up-form-customer";
import SignupFormBuilder from "./sign-up-form-builder";

function SignupForm({ isFormVisible }: { isFormVisible: boolean }) {
  const [accountType, setAccountType] = useState<string>("customer");

  const accountTypeSwitchHandler = (accType: string) => {
    setAccountType(accType);
  };

  useEffect(() => {
    return () => {
      if (!isFormVisible) {
        setAccountType("customer");
      }
    };
  }, [isFormVisible]);

  return (
    <div
      className={`${classes["form-container"]} ${
        isFormVisible ? classes["fadein"] : classes["fadeout"]
      }`}
    >
      <h1>
        Sign <span className={classes["highlighted-text"]}>Up</span>
      </h1>

      {accountType === "customer" ? (
        <SignupFormCustomer isFormVisible={isFormVisible} />
      ) : (
        <SignupFormBuilder isFormVisible={isFormVisible}></SignupFormBuilder>
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
