"use client";
import React from "react";
import useInput from "@/hooks/use-input";
import classes from "./form.module.css";
import Input from "@/components/input";
import { useState, useEffect } from "react";
import { serviceTypesList } from "@/utils";
import useHttp from "@/hooks/use-http";
import Backdrop from "@/components/backdrop";
import Loader from "@/components/loader";
import Snackbar from "@/components/snackbar";

function SignupFormBuilder({
  isLoginFormVisible,
  postSignUpHandler,
}: {
  isLoginFormVisible: boolean;
  postSignUpHandler: () => void;
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [signupStep, setSignupStep] = useState<number>(0);
  const [serviceType, setserviceType] = useState(serviceTypesList[0]);

  const { post, isLoading, errorMsg, successMsg, responseCode } = useHttp(
    "https://builders-on-board-be-2.onrender.com/builder"
  );

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
    if (!isLoginFormVisible) {
      resetEmail();
      resetFirstName();
      resetLastName();
      resetFee();
      resetPincode();
      resetPhnNo();
      resetAddress();
      resetPassword();
      resetReenteredPassword();
      setSignupStep(0);
    }
  }, [isLoginFormVisible]);

  const formSubmitHandler = () => {
    post(
      {
        email: email.toLowerCase(),
        firstname: firstName.toLowerCase(),
        lastname: lastName.toLowerCase(),
        service_type: serviceType,
        password: password,
        fee: fee,
        pincode: pincode,
        phn_no: phn_no,
      },
      null
    );

    resetEmail();
    resetFirstName();
    resetLastName();
    resetFee();
    resetPincode();
    resetPhnNo();
    resetAddress();
    resetPassword();
    resetReenteredPassword();
  };

  useEffect(() => {
    if (responseCode === 409 || successMsg) postSignUpHandler();
  }, [successMsg, responseCode, errorMsg]);

  const movePrevhandler = () => {
    setSignupStep((prevStep) => prevStep - 1);
  };

  const moveNexthandler = () => {
    setSignupStep((prevStep) => prevStep + 1);
  };

  const serviceChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setserviceType(event.target.value);
  };

  return (
    <div
      className={`${classes["sign-up-form-builder"]} ${
        isLoginFormVisible ? classes["fadein"] : classes["fadeout"]
      }`}
    >
      {isLoading && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}
      {errorMsg && <Snackbar message={errorMsg}></Snackbar>}
      {successMsg && <Snackbar message={successMsg}></Snackbar>}

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
            <h2 className={classes["services-label"]}>Expertise :</h2>
            <select
              className={classes["services"]}
              onChange={serviceChangeHandler}
              defaultValue={serviceType}
            >
              {serviceTypesList.map((service, index) => (
                <option
                  className={classes["service"]}
                  value={service}
                  key={index}
                >
                  {service}
                </option>
              ))}
            </select>
          </div>
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
              checked={isPasswordVisible}
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
              emailHasError ||
              feeHasError ||
              firstNameHasError ||
              lastNameHasError ||
              phnNoHasError ||
              addressHasError ||
              passwordHasError ||
              reenteredPasswordHasError
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
