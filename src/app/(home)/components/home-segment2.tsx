import React from "react";
import classes from "./home-segment2.module.css";

function SecondHomeSegment() {
  return (
    <div className={classes["home-segment-2"]}>
      <h1>
        Popular <span className={classes["highlighted-text"]}>projects</span> in
        your <span className={classes["highlighted-text"]}>city</span>
      </h1>
      <div className={classes["image-holders"]}>
        <div className={classes["image-holder"]}>
          <div className={classes["frame-odd"]}>
            <img
              src="carpenter.webp"
              alt="carpenter"
              className={classes["image"]}
            />
          </div>
          <h3>Carpentry</h3>
          <h5>Avg Project cost : $55 - $60</h5>
        </div>

        <div className={classes["image-holder"]}>
          <h3>Electrical Help</h3>
          <h5>Avg Project cost : $37 - $42</h5>
          <div className={classes["frame-even"]}>
            <img
              src="electrician.webp"
              alt="electrician"
              className={classes["image"]}
            />
          </div>
        </div>

        <div className={classes["image-holder"]}>
          <div className={classes["frame-odd"]}>
            <img
              src="painter.webp"
              alt="painter"
              className={classes["image"]}
            />
          </div>
          <h3>Painting</h3>
          <h5>Avg Project cost : $85 - $97</h5>
        </div>

        <div className={classes["image-holder"]}>
          <h3>Pest Control</h3>
          <h5>Avg Project cost : $62 - $67</h5>
          <div className={classes["frame-even"]}>
            <img
              src="pest.jpg"
              alt="pest control"
              className={classes["image"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondHomeSegment;
