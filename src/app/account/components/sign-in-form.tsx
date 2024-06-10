"use client";
import React, { useEffect, useState } from "react";
import classes from "./form.module.css";
import useInput from "@/hooks/use-input";
import Input from "@/components/input";
import { useAppDispatch } from "@/store/hooks";
import { logIn } from "@/store/features/auth-slice";
import { useRouter } from "next/navigation";
import useHttp from "@/hooks/use-http";

function SigninForm({ isLoginFormVisible }: { isLoginFormVisible: boolean }) {
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const router = useRouter();
  const { login, isLoading, successMsg, errorMsg } = useHttp(
    "https://builders-on-board-be-2.onrender.com/login"
  );

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

  useEffect(() => {
    if (!isLoginFormVisible) {
      resetEmail();
      resetPassword();
    }
  }, [isLoginFormVisible]);

  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email, password);
    //send the request to API an get the details

    login({ email, password });

    // dispatch(
    //   logIn({
    //     username: "Aryant",
    //     accountType: "customer",
    //     accessToken: "access_token",
    //   })
    // );
    // resetEmail();
    // resetPassword();
    // router.replace("/");
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className={`${classes["form"]} ${
        isLoginFormVisible ? classes["fadein"] : classes["fadeout"]
      }`}
    >
      <h1>
        Sign <span className={classes["highlighted-text"]}>In</span>{" "}
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
        disabled={!isEmailValid || !isPasswordValid}
      />
    </form>
  );
}

export default SigninForm;
