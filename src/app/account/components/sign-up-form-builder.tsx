"use client";
import React from "react";
import useInput from "@/hooks/use-input";
import classes from "./form.module.css";
import Input from "@/components/input";
import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { logIn } from "@/store/features/auth-slice";
import { useRouter } from "next/navigation";

function SignupFormBuilder({ isFormVisible }: { isFormVisible: boolean }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [signupStep, setSignupStep] = useState<number>(0);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const showPassword = (event: React.MouseEvent<HTMLInputElement>) => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const emailValidator = (email: string): boolean => {
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,7}\b/;
    return emailRegex.test(email);
  };

  const firstNameValidator = (firstname: string) => {
    return /^[A-Za-z]+$/.test(firstname);
  };

  const lastNameValidator = (lastname: string) => {
    return /^[A-Za-z]*$/.test(lastname);
  };

  const feeValidator = (fee: number) => {
    return fee > 0;
  };

  const pincodeValidator = (pincode: string) => {
    return pincode.length == 6;
  };

  const phnNoValidator = (phnNo: string) => {
    return (
      (phnNo.startsWith("9") ||
        phnNo.startsWith("8") ||
        phnNo.startsWith("7") ||
        phnNo.startsWith("6")) &&
      phnNo.length === 10
    );
  };

  const passwordValidator = (password: string): boolean => {
    return password.trim().length > 8;
  };

  const reenteredPasswordValidator = (reenteredPassword: string): boolean => {
    return reenteredPassword.trim().length > 8 && reenteredPassword == password;
  };

  const addressValidator = (address: string): boolean => {
    return address.length != 0;
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
    value: fee,
    isValid: isFeeValid,
    hasError: feeHasError,
    updateValueOnKeyStroke: updateFeeOnKeystroke,
    updateIsTouched: updateIsFeeTouched,
    reset: resetFee,
  } = useInput({ validator: feeValidator });

  const {
    value: pincode,
    isValid: isPincodeValid,
    hasError: pincodeHasError,
    updateValueOnKeyStroke: updatePincodeOnKeystroke,
    updateIsTouched: updateIsPincodeTouched,
    reset: resetPincode,
  } = useInput({ validator: pincodeValidator });

  const {
    value: phn_no,
    isValid: isPhnNoValid,
    hasError: phnNoHasError,
    updateValueOnKeyStroke: updatePhnNoOnKeystroke,
    updateIsTouched: updateIsPhnNoTouched,
    reset: resetPhnNo,
  } = useInput({ validator: phnNoValidator });

  const {
    value: address,
    isValid: isAddressValid,
    hasError: addressHasError,
    updateValueOnKeyStroke: updateAddressOnKeystroke,
    updateIsTouched: updateIsAddressTouched,
    reset: resetAddress,
  } = useInput({ validator: addressValidator });

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
      resetFee();
      resetPincode();
      resetPhnNo();
      resetAddress();
      resetPassword();
      resetReenteredPassword();
    }
  }, [isFormVisible]);

  const formSubmitHandler = () => {
    console.log(email, firstName, lastName, fee, pincode, address, password);
    //send an API request to sign up and if everything goes fine log in the user else state the error.
    // dispatch(
    //   logIn({
    //     username: "Aryant",
    //     accessToken: "access_token",
    //   })
    // );

    resetEmail();
    resetFirstName();
    resetLastName();
    resetFee();
    resetPincode();
    resetPhnNo();
    resetAddress();
    resetPassword();
    resetReenteredPassword();
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
      className={`${classes["sign-up-form-builder"]} ${
        isFormVisible ? classes["fadein"] : classes["fadeout"]
      }`}
    >
      {signupStep === 0 && (
        <div className={classes["form-segment"]}>
          <div className={classes["fields-container"]}>
            <Input
              type="email"
              value={email}
              valueHasError={emailHasError}
              placeholder="Email"
              errorMsg="Email not valid"
              updateValueOnKeyStroke={updateEmailOnKeystroke}
              updateIsTouched={updateIsEmailTouched}
              className={classes["input"]}
            ></Input>

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
          </div>

          <div className={classes["fields-container"]}>
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

            <Input
              type="number"
              value={fee}
              valueHasError={feeHasError}
              placeholder="Fee"
              errorMsg="Fee must be a valid amount"
              updateValueOnKeyStroke={updateFeeOnKeystroke}
              updateIsTouched={updateIsFeeTouched}
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
              type="text"
              value={pincode}
              valueHasError={pincodeHasError}
              placeholder="Pincode"
              errorMsg="Pincode must be of 6 digit"
              updateValueOnKeyStroke={updatePincodeOnKeystroke}
              updateIsTouched={updateIsPincodeTouched}
              className={classes["input"]}
            ></Input>

            <Input
              type="text"
              value={phn_no}
              valueHasError={phnNoHasError}
              placeholder="Phone Number"
              errorMsg="Phone Number must be valid"
              updateValueOnKeyStroke={updatePhnNoOnKeystroke}
              updateIsTouched={updateIsPhnNoTouched}
              className={classes["input"]}
            ></Input>
          </div>

          <Input
            type="text"
            value={address}
            valueHasError={addressHasError}
            errorMsg="Please enter a valid address"
            placeholder="Address"
            updateValueOnKeyStroke={updateAddressOnKeystroke}
            updateIsTouched={updateIsAddressTouched}
            className={classes["long-input"]}
          ></Input>

          <div className={classes["form-segment-actions"]}>
            <button className={classes["prev-btn"]}>
              <img
                src="arrow.png"
                className={classes["prev-icon"]}
                onClick={movePrevhandler}
              ></img>
            </button>
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

      {signupStep === 2 && (
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
              !isFeeValid ||
              !isFirstNameValid ||
              !isLastNameValid ||
              !isPhnNoValid ||
              !isAddressValid ||
              !isPasswordValid ||
              !isReenteredPasswordValid
            }
          >
            Sign up
          </button>
        </div>
      )}
    </div>
  );
}

export default SignupFormBuilder;
