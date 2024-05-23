"use client";
import React from "react";
import classes from "./input.module.css";

interface IInput {
  type: string;
  value: string;
  valueHasError: boolean;
  errorMsg: string;
  placeholder: string;
  updateValueOnKeyStroke: (event: React.FocusEvent<HTMLInputElement>) => void;
  updateIsTouched: (event: React.FocusEvent<HTMLInputElement>) => void;
  isPasswordVisible?: boolean;
}
function Input({
  type,
  value,
  valueHasError,
  errorMsg,
  placeholder,
  updateValueOnKeyStroke,
  updateIsTouched,
  isPasswordVisible,
}: IInput) {
  return (
    <div className={classes["input-holder"]}>
      <input
        className={classes["input"]}
        type={type == "text" ? "text" : isPasswordVisible ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={updateValueOnKeyStroke}
        onBlur={updateIsTouched}
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