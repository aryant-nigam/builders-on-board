"use client";
import React from "react";
import classes from "./input.module.css";

export interface IInput {
  type: string;
  value: string;
  isDiabled?: boolean;
  valueHasError?: boolean;
  errorMsg?: string;
  placeholder?: string;
  updateValueOnKeyStroke?: (event: React.FocusEvent<HTMLInputElement>) => void;
  updateIsTouched?: (event: React.FocusEvent<HTMLInputElement>) => void;
  isPasswordVisible?: boolean;
  className?: string;
}
function Input({
  type,
  value,
  isDiabled,
  valueHasError,
  errorMsg,
  placeholder,
  updateValueOnKeyStroke,
  updateIsTouched,
  isPasswordVisible,
  className,
}: IInput) {
  return (
    <div className={classes["input-holder"]}>
      <input
        className={`${classes["input"]} ${
          className ? className : classes["input-optional"]
        }`}
        type={
          type != "password" ? type : isPasswordVisible ? "text" : "password"
        }
        value={value}
        placeholder={placeholder}
        onChange={updateValueOnKeyStroke}
        onBlur={updateIsTouched}
        disabled={isDiabled}
      ></input>
      {valueHasError && (
        <div className={classes["input-error-holder"]}>
          <img className={classes["error-icon"]} src="error.png"></img>
          <p className={classes["input-error"]}>{errorMsg}</p>
        </div>
      )}
    </div>
  );
}

export default Input;
