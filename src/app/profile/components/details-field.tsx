"use client";
import classes from "./details-field.module.css";
import { IInput } from "@/components/input";
import Input from "@/components/input";
import React, { useState } from "react";

interface IDetailsField extends IInput {
  label: string;
}
const DetailsField = ({
  label,
  type,
  value,
  isDiabled,
  valueHasError,
  placeholder,
  errorMsg,
  updateValueOnKeyStroke,
  updateIsTouched,
  isPasswordVisible,
  className,
}: IDetailsField) => {
  const [isEditButtonClicked, setIsEditButtonClicked] =
    useState<boolean>(false);
  return (
    <div className={classes["fields-container"]}>
      <label className={classes.label}>{label}</label>
      <div className={classes["container"]}>
        <Input
          type={type}
          value={value}
          valueHasError={valueHasError}
          placeholder={placeholder}
          errorMsg={errorMsg}
          updateValueOnKeyStroke={updateValueOnKeyStroke}
          updateIsTouched={updateIsTouched}
          className={className}
          isDiabled={!isEditButtonClicked}
        />
      </div>
      <button
        className={classes["edit-btn"]}
        onClick={() => {
          setIsEditButtonClicked(true);
        }}
      >
        <img src="edit.png" className={classes["edit-icon"]}></img>
      </button>
    </div>
  );
};

export default DetailsField;
