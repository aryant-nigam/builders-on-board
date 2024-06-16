"use client";
import Link from "next/link";
import React, { useState } from "react";
import classes from "./navbar.module.css";
import { usePathname } from "next/navigation";

import { useAppSelector } from "@/store/hooks";
import { isExpired } from "react-jwt";
import { useCookies } from "react-cookie";

function Navbar() {
  const [cookies] = useCookies(["user"]);
  const accessToken = cookies.user?.accessToken;
  const refreshToken = cookies.user?.refreahToken;
  const pathName = usePathname();

  console.log(accessToken, refreshToken);

  if (pathName !== "/session-expired")
    return (
      <nav className={classes.navbar}>
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
          {accessToken && !isExpired(accessToken) && (
            <Link
              href="/services"
              className={`${classes["nav-option"]} ${
                pathName === "/services" && classes["active-nav-option"]
              }`}
            >
              Services
            </Link>
          )}
          {accessToken && !isExpired(accessToken) && (
            <Link
              href="/profile"
              className={`${classes["nav-option"]} ${
                pathName === "/profile" && classes["active-nav-option"]
              }`}
            >
              Profile
            </Link>
          )}
          {(cookies.user === undefined ||
            (isExpired(accessToken) && refreshToken === undefined)) && (
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
