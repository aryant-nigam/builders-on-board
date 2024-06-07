"use client";
import React from "react";
import useInput from "@/hooks/use-input";
import classes from "./form.module.css";
import Input from "@/components/input";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { logIn } from "@/store/features/auth-slice";
import { useRouter } from "next/navigation";
import useHttp from "@/hooks/use-http";
import Loader from "@/components/loader";
import Backdrop from "@/components/backdrop";

function SignupFormCustomer({ isFormVisible }: { isFormVisible: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [signupStep, setSignupStep] = useState<number>(0);
  const { post, isLoading, error } = useHttp(
    "https://builders-on-board-be-2.onrender.com/customer"
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const showPassword = (event: React.MouseEvent<HTMLInputElement>) => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const emailValidator = (email: string): boolean => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/;
    return emailRegex.test(email);
  };

  const passwordValidator = (password: string): boolean => {
    return password.trim().length > 8;
  };

  const firstNameValidator = (firstname: string) => {
    return /^[A-Za-z]+$/.test(firstname);
  };

  const lastNameValidator = (lastname: string) => {
    return /^[A-Za-z]*$/.test(lastname);
  };

  const reenteredPasswordValidator = (reenteredPassword: string): boolean => {
    return reenteredPassword.trim().length > 8 && reenteredPassword == password;
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
    value: firstName,
    isValid: isFirstNameValid,
    hasError: firstNameHasError,
    updateValueOnKeyStroke: updateFirstNameOnKeystroke,
    updateIsTouched: updateIsFirstNameTouched,
    reset: resetFirstName,
  } = useInput({ validator: firstNameValidator });

  const {
    value: lastName,
    isValid: isLastNameValid,
    hasError: lastNameHasError,
    updateValueOnKeyStroke: updateLastNameOnKeystroke,
    updateIsTouched: updateIsLastNameTouched,
    reset: resetLastName,
  } = useInput({ validator: lastNameValidator });

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
  } = useInput({ validator: reenteredPasswordValidator });

  useEffect(() => {
    if (!isFormVisible) {
      resetEmail();
      resetFirstName();
      resetLastName();
      resetPassword();
      resetReenteredPassword();
    }
  }, [isFormVisible]);

  const formSubmitHandler = () => {
    console.log(firstName, lastName, email, password);
    post({
      email: email.toLowerCase(),
      first_name: firstName.toLowerCase(),
      last_name: lastName.toLowerCase(),
      password: password,
    });
    //send an API request to sign up and if everything goes fine log in the user else state the error.
    // dispatch(
    //   logIn({
    //     username: "Aryant",
    //     accessToken: "access_token",
    //   })
    // );

    // resetEmail();
    // resetFirstName();
    // resetLastName();
    // resetPassword();
    // resetReenteredPassword();
    // router.replace("/");
  };

  const movePrevhandler = () => {
    setSignupStep((prevStep) => prevStep - 1);
  };

  const moveNexthandler = () => {
    setSignupStep((prevStep) => prevStep + 1);
  };

  return (
    <div
      className={`${classes["sign-up-form-customer"]} ${
        isFormVisible ? classes["fadein"] : classes["fadeout"]
      }`}
    >
      {isLoading && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}

      {signupStep === 0 && (
        <div className={classes["form-segment"]}>
          <Input
            type="email"
            value={email}
            valueHasError={emailHasError}
            placeholder="Email"
            errorMsg="Email not valid"
            updateValueOnKeyStroke={updateEmailOnKeystroke}
            updateIsTouched={updateIsEmailTouched}
            className={classes["long-input"]}
          ></Input>

          <div className={classes["fields-container"]}>
            <Input
              type="text"
              value={firstName}
              valueHasError={firstNameHasError}
              placeholder="First Name"
              errorMsg="First Name must be valid"
              updateValueOnKeyStroke={updateFirstNameOnKeystroke}
              updateIsTouched={updateIsFirstNameTouched}
              className={classes["input"]}
            ></Input>
            <Input
              type="text"
              value={lastName}
              valueHasError={lastNameHasError}
              placeholder="Last Name"
              errorMsg="Last Name must be valid"
              updateValueOnKeyStroke={updateLastNameOnKeystroke}
              updateIsTouched={updateIsLastNameTouched}
              className={classes["input"]}
            ></Input>
          </div>

          <div className={classes["form-segment-actions"]}>
            <button className={classes["next-btn"]}>
              <img
                src="arrow.png"
                className={classes["next-icon"]}
                onClick={moveNexthandler}
              ></img>
            </button>
          </div>
        </div>
      )}

      {signupStep === 1 && (
        <div className={classes["form-segment"]}>
          <div className={classes["fields-container"]}>
            <Input
              type="password"
              value={password}
              valueHasError={passwordHasError}
              errorMsg="Password must be 8 characters long"
              placeholder="Password"
              updateValueOnKeyStroke={updatePasswordOnKeystroke}
              updateIsTouched={updateIsPasswordTouched}
              isPasswordVisible={isPasswordVisible}
              className={classes["input"]}
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
              className={classes["input"]}
            ></Input>
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
          <div className={classes["form-segment-actions"]}>
            <button className={classes["prev-btn"]}>
              <img
                src="arrow.png"
                className={classes["prev-icon"]}
                onClick={movePrevhandler}
              ></img>
            </button>
          </div>
          <button
            className={classes["signup-btn"]}
            onClick={formSubmitHandler}
            disabled={
              !isEmailValid ||
              !isFirstNameValid ||
              !isLastNameValid ||
              !isPasswordValid
            }
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
}

export default SignupFormCustomer;
