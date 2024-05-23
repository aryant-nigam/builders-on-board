"use client";
import React, { useEffect, useState } from "react";
import classes from "./form.module.css";
import useInput from "@/hooks/use-input";
import Input from "@/components/input";
function SigninForm({ isFormVisible }: { isFormVisible: boolean }) {
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

  useEffect(() => {
    if (!isFormVisible) {
      resetUsername();
      resetPassword();
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
        Sign <span className={classes["highlighted-text"]}>In</span>{" "}
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
        value="sign in"
        className={classes["signin-btn"]}
        disabled={!isUsenameValid || !isPasswordValid}
      />
    </form>
  );
}

export default SigninForm;
