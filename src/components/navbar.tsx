"use client";
import Link from "next/link";
import React from "react";
import classes from "./navbar.module.css";

import { useAppSelector } from "@/store/hooks";

function Navbar() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  console.log(accessToken);
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
        <Link href="/" className={classes["nav-option"]}>
          Home
        </Link>
        {accessToken && (
          <Link href="/services" className={classes["nav-option"]}>
            Services
          </Link>
        )}
        {!accessToken && (
          <Link href="/account" className={classes["nav-option"]}>
            Account
          </Link>
        )}
        {accessToken && (
          <Link href="/profile" className={classes["nav-option"]}>
            Profile
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
