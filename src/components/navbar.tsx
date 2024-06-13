"use client";
import Link from "next/link";
import React, { useState } from "react";
import classes from "./navbar.module.css";

import { useAppSelector } from "@/store/hooks";

function Navbar() {
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  const [currentTab, setCurrentTab] = useState<number>(1);
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
            currentTab === 1 && classes["active-nav-option"]
          }`}
          onClick={() => {
            setCurrentTab(1);
          }}
        >
          Home
        </Link>
        {accessToken && (
          <Link
            href="/services"
            className={`${classes["nav-option"]} ${
              currentTab === 2 && classes["active-nav-option"]
            }`}
            onClick={() => {
              setCurrentTab(2);
            }}
          >
            Services
          </Link>
        )}
        {
          <Link
            href="/account"
            className={`${classes["nav-option"]} ${
              currentTab === 3 && classes["active-nav-option"]
            }`}
            onClick={() => {
              setCurrentTab(3);
            }}
          >
            Account
          </Link>
        }
        {accessToken && (
          <Link
            href="/profile"
            className={`${classes["nav-option"]} ${
              currentTab === 4 && classes["active-nav-option"]
            }`}
            onClick={() => {
              setCurrentTab(4);
            }}
          >
            Profile
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
