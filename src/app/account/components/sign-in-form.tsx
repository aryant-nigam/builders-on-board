"use client";
import React, { useEffect, useState } from "react";
import classes from "./form.module.css";
import useInput from "@/hooks/use-input";
import Input from "@/components/input";
import { useAppDispatch } from "@/store/hooks";
import {
  setAuthenticatedUserDetails,
  DecodedToken,
} from "@/store/features/auth-slice";
import { useRouter } from "next/navigation";
import useHttp from "@/hooks/use-http";
import { decodeToken, isExpired } from "react-jwt";
import { useCookies } from "react-cookie";
import Snackbar from "@/components/snackbar";
import Backdrop from "@/components/backdrop";
import Loader from "@/components/loader";

function SigninForm({
  isLoginFormVisible,
  postSignUpHandler,
}: {
  isLoginFormVisible: boolean;
  postSignUpHandler: () => void;
}) {
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
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

    const loginHandler = async () => {
      const tokens = await login({ email, password }, null);

      if (tokens) {
        const userAccessToken: DecodedToken = decodeToken(tokens.access_token)!;
        const userRefreshToken: DecodedToken = decodeToken(
          tokens.refresh_token
        )!;

        console.log(
          isExpired(tokens.access_token),
          isExpired(tokens.refresh_token)
        );

        removeCookie("user");

        setCookie(
          "user",
          JSON.stringify({
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          }),
          {
            path: "/",
            sameSite: true,
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }
        );

        console.log(tokens.access_token);
        console.log(tokens.refresh_token);

        dispatch(
          setAuthenticatedUserDetails({
            user: userAccessToken.sub,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
          })
        );
      }
    };

    loginHandler();

    // resetEmail();
    // resetPassword();
    // router.replace("/");
  };

  useEffect(() => {
    errorMsg && postSignUpHandler();
  }, [errorMsg]);

  return (
    <form
      onSubmit={formSubmitHandler}
      className={`${classes["form"]} ${
        isLoginFormVisible ? classes["fadein"] : classes["fadeout"]
      }`}
    >
      {isLoading && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}
      {successMsg && <Snackbar message={successMsg}></Snackbar>}
      {errorMsg && <Snackbar message={errorMsg}></Snackbar>}

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
