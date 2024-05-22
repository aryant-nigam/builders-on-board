import React from "react";
import classes from "./home-segment1.module.css";
import SearchForm from "./search-form";

function FirstHomeSegment() {
  return (
    <div className={classes["home-segment-1"]}>
      <div className={classes["home-segment-1-left"]}>
        <h1>
          <span className={classes["highlighted-text"]}>Hire</span>
          &nbsp;professionals&nbsp;
          <br />
          <span className={classes["highlighted-text"]}>for</span> your{" "}
          <span className={classes["highlighted-text"]}>help</span>
        </h1>
        <h4>The easy and reliable way to take care of your home.</h4>
        <SearchForm />
      </div>
      <div className={classes["home-segment-1-right"]}>
        <img src="workers.png" className={classes["img-banner"]}></img>
      </div>
    </div>
  );
}

export default FirstHomeSegment;
