"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import classes from "./navbar.module.css";
import { usePathname } from "next/navigation";
import { isExpired } from "react-jwt";
import { useCookies } from "react-cookie";
import { useState } from "react";
import useHttp from "@/hooks/use-http";
import Snackbar from "./snackbar";
import Backdrop from "./backdrop";
import Loader from "./loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeAuthenticatedUserDetails } from "@/store/features/auth-slice";
import { useRouter } from "next/navigation";
import { resetServices } from "@/store/features/services-slice";

function Navbar() {
  const [cookies, _, removeCookie] = useCookies(["user"]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [shouldSignin, setShouldSignin] = useState<boolean>(false);
  const accessToken = cookies.user?.accessToken;
  const refreshToken = cookies.user?.refreshToken;
  const pathName = usePathname();
  const router = useRouter();
  const isBuilder = useAppSelector((state) => state.auth.user?.is_builder);

  // console.log(accessToken, refreshToken);

  useEffect(() => {
    setIsAuthenticated(accessToken && !isExpired(accessToken));
    setShouldSignin(
      accessToken === undefined ||
        (isExpired(accessToken) && refreshToken === undefined)
    );
  }, [accessToken, refreshToken]);

  const dispatch = useAppDispatch();

  const { get, isLoading } = useHttp(
    "https://builders-on-board-be-2.onrender.com/logout"
  );

  const logoutHandler = async () => {
    if (!isExpired(accessToken)) {
      const response = await get(accessToken);
      console.log(response);
    }
    if (refreshToken && !isExpired(refreshToken)) {
      const response = await get(refreshToken);
      console.log(response);
    }
    router.replace("/");
    console.log("replaced", pathName);
    setTimeout(() => {
      removeCookie("user");
      dispatch(removeAuthenticatedUserDetails());
      dispatch(resetServices());
      window.location.reload();
    }, 20);
    setTimeout(() => {
      window.location.reload();
    }, 30);
  };

  if (pathName !== "/session-expired")
    return (
      <nav className={classes.navbar}>
        {isLoading && (
          <Backdrop>
            <Loader />
          </Backdrop>
        )}
        <div className={classes["app-logo-container"]}>
          <Link href="/" className={classes["app-logo"]}>
            <h3>
              <span className={classes["first-char"]}>B</span>uilders{" "}
              <span className={classes["first-char"]}>O</span>n{" "}
              <span className={classes["first-char"]}>B</span>oard
            </h3>
          </Link>
        </div>
        <ul className={classes["nav-options"]}>
          <Link
            href="/"
            className={`${classes["nav-option"]} ${
              pathName === "/" && classes["active-nav-option"]
            }`}
          >
            Home
          </Link>
          {isAuthenticated && !isBuilder && (
            <Link
              href="/services"
              className={`${classes["nav-option"]} ${
                pathName === "/services" && classes["active-nav-option"]
              }`}
            >
              Services
            </Link>
          )}
          {isAuthenticated && (
            <Link
              href="/profile"
              className={`${classes["nav-option"]} ${
                pathName === "/profile" && classes["active-nav-option"]
              }`}
            >
              Profile
            </Link>
          )}
          {isAuthenticated && (
            <button className={classes["logout-btn"]} onClick={logoutHandler}>
              Log out
            </button>
          )}
          {shouldSignin && (
            <Link
              href="/account"
              className={`${classes["nav-option"]} ${
                pathName === "/account" && classes["active-nav-option"]
              }`}
            >
              Account
            </Link>
          )}
        </ul>
      </nav>
    );
  else return <></>;
}

export default Navbar;

// {
//   !accessToken ||
//     (accessToken && isExpired(accessToken) && (
//       <Link
//         href="/account"
//         className={`${classes["nav-option"]} ${
//           pathName === "/account" && classes["active-nav-option"]
//         }`}
//       >
//         Account
//       </Link>
//     ));
// }
