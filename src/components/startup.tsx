"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCookies } from "react-cookie";
import {
  setAuthenticatedUserDetails,
  setAuthenticatedUserPersonalDetails,
} from "@/store/features/auth-slice";
import { decodeToken, isExpired } from "react-jwt";
import { DecodedToken } from "@/store/features/auth-slice";
import useHttp from "@/hooks/use-http";
import { useEffect } from "react";
import Backdrop from "./backdrop";
import Loader from "./loader";

const StartUp = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const id = user?.id;
  const jwt_token = useAppSelector((state) => state.auth.accessToken);
  console.log("user", user);
  const {
    refresh,
    isLoading: isLoadingOnRefresh,
    errorMsg: errorMessageOnRefresh,
  } = useHttp("https://builders-on-board-be-2.onrender.com/refresh");

  const {
    get,
    isLoading: isLoadingOnGet,
    errorMsg: errorMessageOnGet,
  } = useHttp(`https://builders-on-board-be-2.onrender.com/customer?id=${id}`);

  useEffect(() => {
    const loginWithRefreshToken = async (refreshToken: string) => {
      console.log(refreshToken);
      const token = await refresh(refreshToken);
      console.log("with refresh", token);

      if (token) {
        setCookie(
          "user",
          JSON.stringify({
            accessToken: token.access_token,
            refreshToken: null,
          }),
          {
            path: "/",
            sameSite: true,
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          }
        );

        const userAccessToken: DecodedToken = decodeToken(token.access_token)!;

        dispatch(
          setAuthenticatedUserDetails({
            user: userAccessToken.sub,
            accessToken: token.access_token,
            refreshToken: null,
          })
        );
      } else if (errorMessageOnRefresh) {
        removeCookie("user");
      }
    };

    if (cookie.user && !user) {
      // first fetch the cookies from the browser
      console.log("fetching user from cookies", cookie);
      const userAccessToken: DecodedToken = decodeToken(
        cookie.user.accessToken
      )!;

      if (!isExpired(cookie.user.accessToken)) {
        //if browser cookie's access token has not expired the ininitalise the auth slice
        console.log("not expired");
        dispatch(
          setAuthenticatedUserDetails({
            user: userAccessToken.sub,
            accessToken: cookie.user.accessToken,
            refreshToken: cookie.user.refreshToken,
          })
        );
      } else if (
        cookie.user.refreshToken &&
        !isExpired(cookie.user.refreshToken)
      ) {
        // if browser cookie's refresh token has not expired then regain the access with refresh token and
        // initialise the auth slice
        console.log("expired");
        loginWithRefreshToken(cookie.user.refreshToken);
      } else {
        //if neither access token and refresh token is valid then user should login again manually
        console.log("expired login again");
      }
    }
  }, [user]);

  useEffect(() => {
    if (id && jwt_token) {
      console.log("triggered");
      const fetchUserData = async () => {
        const personal_data = await get(jwt_token);
        console.log("hi", personal_data);
        if (personal_data) {
          console.log(personal_data);
          dispatch(
            setAuthenticatedUserPersonalDetails({
              firstname: personal_data.firstname,
              lastname: personal_data.lastname,
              email: personal_data.email,
              address: personal_data.address,
              landmark: personal_data.landmark,
              phoneNumber: personal_data.phn_no,
              pincode: personal_data.pincode,
            })
          );
        }
      };
      fetchUserData();
    }
  }, [user, id, jwt_token]);

  return (
    <>
      {(isLoadingOnRefresh || isLoadingOnGet) && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}
    </>
  );
};

export default StartUp;
