import React from "react";
import classes from "./page.module.css";
function Unauthorised() {
  return (
    <div className={classes.unauthorised}>
      <h1>UNAUTHORISED: 401</h1>
      <img src="stop-bob.png"></img>
    </div>
  );
}

export default Unauthorised;
