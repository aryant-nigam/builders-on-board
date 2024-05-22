import Link from "next/link";
import React from "react";
import classes from "./navbar.module.css";

function Navbar() {
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
        <Link href="/services" className={classes["nav-option"]}>
          Services
        </Link>
        <Link href="/account" className={classes["nav-option"]}>
          Account
        </Link>
      </ul>
    </nav>
  );
}

export default Navbar;
