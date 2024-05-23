"use client";
import React from "react";
import useInput from "@/hooks/use-input";
import classes from "./form.module.css";
import Input from "@/components/input";
import { useState, useEffect } from "react";

function SignupForm({ isFormVisible }: { isFormVisible: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const showPassword = (event: React.MouseEvent<HTMLInputElement>) => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const usernameValidator = (username: string): boolean => {
    return !username.includes(" ") && username.trim().length >= 8;
  };

  const passwordValidator = (password: string): boolean => {
    return password.trim().length > 8;
  };

  const {
    value: username,
    isValid: isUsenameValid,
    hasError: usernameHasError,
    updateValueOnKeyStroke: updateUsernameOnKeystroke,
    updateIsTouched: updateIsUsernameTouched,
    reset: resetUsername,
  } = useInput({ validator: usernameValidator });

  const {
    value: password,
    isValid: isPasswordValid,
    hasError: passwordHasError,
    updateValueOnKeyStroke: updatePasswordOnKeystroke,
    updateIsTouched: updateIsPasswordTouched,
    reset: resetPassword,
  } = useInput({ validator: passwordValidator });

  const {
    value: reenteredPassword,
    isValid: isReenteredPasswordValid,
    hasError: reenteredPasswordHasError,
    updateValueOnKeyStroke: updateReenteredPasswordOnKeystroke,
    updateIsTouched: updateIsReenteredPasswordTouched,
    reset: resetReenteredPassword,
  } = useInput({ validator: passwordValidator });

  useEffect(() => {
    if (!isFormVisible) {
      resetUsername();
      resetPassword();
      resetReenteredPassword();
    }
  }, [isFormVisible]);

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(username, password);
    //reset inputs
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className={`${classes["form"]} ${
        isFormVisible ? classes["fadein"] : classes["fadeout"]
      }`}
    >
      <h1>
        Sign <span className={classes["highlighted-text"]}>Up</span>
      </h1>
      <Input
        type="text"
        value={username}
        valueHasError={usernameHasError}
        placeholder="Username"
        errorMsg="Username must can not contain spaces and must be 8 characters long"
        updateValueOnKeyStroke={updateUsernameOnKeystroke}
        updateIsTouched={updateIsUsernameTouched}
      ></Input>

      <Input
        type="password"
        value={password}
        valueHasError={passwordHasError}
        errorMsg="Password must be 8 characters long"
        placeholder="Password"
        updateValueOnKeyStroke={updatePasswordOnKeystroke}
        updateIsTouched={updateIsPasswordTouched}
        isPasswordVisible={isPasswordVisible}
      ></Input>

      <Input
        type="password"
        value={reenteredPassword}
        valueHasError={
          reenteredPasswordHasError || reenteredPassword !== password
        }
        errorMsg="Re-entered password should match the original password"
        placeholder="Re-enter Password"
        updateValueOnKeyStroke={updateReenteredPasswordOnKeystroke}
        updateIsTouched={updateIsReenteredPasswordTouched}
        isPasswordVisible={isPasswordVisible}
      ></Input>

      <div className={classes["show-password-choice-holder"]}>
        <input
          className={classes["show-password-choice"]}
          type="checkbox"
          value="hide"
          onClick={showPassword}
        ></input>
        <label> Show password</label>
      </div>

      <input
        type="submit"
        value="sign up"
        className={classes["signin-btn"]}
        disabled={!isUsenameValid || !isPasswordValid}
      />
    </form>
  );
}

export default SignupForm;
