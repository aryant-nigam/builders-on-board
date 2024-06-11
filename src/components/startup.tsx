"use client";
import { useAppDispatch } from "@/store/hooks";
import { useCookies } from "react-cookie";
import { setAuthenticatedUserDetails } from "@/store/features/auth-slice";
import { decodeToken, isExpired } from "react-jwt";
import { DecodedToken } from "@/store/features/auth-slice";
import useHttp from "@/hooks/use-http";
import { useEffect } from "react";

const StartUp = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const dispatch = useAppDispatch();
  const { login, errorMsg } = useHttp(
    "https://builders-on-board-be-2.onrender.com/refresh"
  );

  useEffect(() => {
    const loginWithRefreshToken = async (refreshToken: string) => {
      const token = await login(undefined, refreshToken);
      console.log("wit refresh", token);

      if (token)
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
    };

    if (cookie.user) {
      const userAccessToken: DecodedToken = decodeToken(
        cookie.user.accessToken
      )!;

      if (!isExpired(cookie.user.accessToken)) {
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
        console.log("expired");
        loginWithRefreshToken(cookie.user.refreshToken);
      }
    }

    if (errorMsg) {
      removeCookie("user");
    }
  }, []);

  return <></>;
};

export default StartUp;
