import React from "react";
import classes from "./home-segment3.module.css";

function ThirdHomeSegment() {
  return (
    <div className={classes["home-segment-3"]}>
      <div className={classes["home-segment-3-left"]}>
        <img src="worker.avif" className={classes["img-banner"]}></img>
      </div>
      <div className={classes["home-segment-3-right"]}>
        <h1>Why us ?</h1>
        <h2>Instant solution and team for you</h2>
        <p>
          Get instant solution, our skilled professionals ensure exceptional
          craftsmanship and attention to detail. Trust us to enhance your home
          with efficient, affordable solutions tailored to your needs, ensuring
          complete satisfaction every time.
        </p>
        <div className={classes["checked-list-item"]}>
          <img
            src="check-mark.png"
            className={classes["checked-list-icon"]}
          ></img>
          <p>Choose and connect with the best person for the job.</p>
        </div>
        <div className={classes["checked-list-item"]}>
          <img
            src="check-mark.png"
            className={classes["checked-list-icon"]}
          ></img>
          <p>Compare taskers reviews, ratings and prices.</p>
        </div>
        <div className={classes["checked-list-item"]}>
          <img
            src="check-mark.png"
            className={classes["checked-list-icon"]}
          ></img>
          <p>Best in class service with affordable prices.</p>
        </div>
      </div>
    </div>
  );
}

export default ThirdHomeSegment;
