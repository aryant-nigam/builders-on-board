"use client";
import React from "react";
import useInput from "@/hooks/use-input";
import classes from "./form.module.css";
import Input from "@/components/input";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { logIn } from "@/store/features/auth-slice";
import { useRouter } from "next/navigation";

function SignupForm({ isFormVisible }: { isFormVisible: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [accountType, setAccountType] = useState<string>("customer");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const showPassword = (event: React.MouseEvent<HTMLInputElement>) => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const emailValidator = (email: string): boolean => {
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return regex.test(email);
  };

  const passwordValidator = (password: string): boolean => {
    return password.trim().length > 8;
  };

  const {
    value: email,
    isValid: isEmailValid,
    hasError: emailHasError,
    updateValueOnKeyStroke: updateEmailOnKeystroke,
    updateIsTouched: updateIsEmailTouched,
    reset: resetEmail,
  } = useInput({ validator: emailValidator });

  const {
    value: password,
    isValid: isPasswordValid,
    hasError: passwordHasError,
    updateValueOnKeyStroke: updatePasswordOnKeystroke,
    updateIsTouched: updateIsPasswordTouched,
    reset: resetPassword,
  } = useInput({ validator: passwordValidator });

  const reenteredPasswordValidator = (reenteredPassword: string): boolean => {
    return reenteredPassword.trim().length > 8 && reenteredPassword == password;
  };

  const {
    value: reenteredPassword,
    isValid: isReenteredPasswordValid,
    hasError: reenteredPasswordHasError,
    updateValueOnKeyStroke: updateReenteredPasswordOnKeystroke,
    updateIsTouched: updateIsReenteredPasswordTouched,
    reset: resetReenteredPassword,
  } = useInput({ validator: reenteredPasswordValidator });

  useEffect(() => {
    if (!isFormVisible) {
      resetEmail();
      resetPassword();
      resetReenteredPassword();
    }
  }, [isFormVisible]);

  const accountTypeSwitchHandler = (accType: string) => {
    setAccountType(accType);
  };

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password, accountType);
    //send an API request to sign up and if everything goes fine log in the user else state the error.
    dispatch(
      logIn({
        username: "Aryant",
        accountType: "customer",
        accessToken: "access_token",
      })
    );

    resetEmail();
    resetPassword();
    resetReenteredPassword();
    router.replace("/");
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
        type="email"
        value={email}
        valueHasError={emailHasError}
        placeholder="Email"
        errorMsg="Email not valid"
        updateValueOnKeyStroke={updateEmailOnKeystroke}
        updateIsTouched={updateIsEmailTouched}
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
        valueHasError={reenteredPasswordHasError}
        errorMsg="Re-entered password should match the original password"
        placeholder="Re-enter Password"
        updateValueOnKeyStroke={updateReenteredPasswordOnKeystroke}
        updateIsTouched={updateIsReenteredPasswordTouched}
        isPasswordVisible={isPasswordVisible}
      ></Input>

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
        className={classes["signup-btn"]}
        disabled={!isEmailValid || !isPasswordValid}
      />
    </form>
  );
}

export default SignupForm;
