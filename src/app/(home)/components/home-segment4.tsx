import React from "react";
import classes from "./home-segment4.module.css";
import GuideCard from "./guide-card";
import FeedbackCard from "./feedback-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function FourthHomeSegment() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={classes["home-segment-4"]}>
      <div className={classes["home-segment-4-top"]}>
        <h1>
          How it <span className={classes["highlighted-text"]}>Works</span> ?
        </h1>
        <div className={classes["home-segment-4-guide-cards-container"]}>
          <GuideCard
            imagePath="mail.png"
            title="Tell us what you need"
            description="From home cleaning to repair to gardening, electrical help etc. We can help with any project Big or Small!"
          />
          <GuideCard
            imagePath="puzzle.png"
            title="We will match you with perfect solutions"
            description="See your price and service need in an instant and compare from highly rated offline providers near you."
          />
          <GuideCard
            imagePath="check.png"
            title="Be relaxed we have got you covered"
            description="We will cover your projects up to full purchase price plus limited damage protection."
          />
        </div>
      </div>
      <div className={classes["home-segment-4-bottom"]}>
        <h1>
          What <span className={classes["highlighted-text"]}>our clients</span>{" "}
          say about <span className={classes["highlighted-text"]}>us</span> ...
        </h1>
        <div className={classes["home-segment-4-feedback-cards-container"]}>
          <FeedbackCard
            consumerName="aryant"
            service="painting"
            feedback="The service was really nice and the work was done in time with utmost quality."
            rating={4.5}
          />
          <FeedbackCard
            consumerName="aryant"
            service="painting"
            feedback="The service was really nice and the work was done in time with utmost quality."
            rating={4.5}
          />
          <FeedbackCard
            consumerName="aryant"
            service="painting"
            feedback="The service was really nice and the work was done in time with utmost quality."
            rating={4.5}
          />
          <FeedbackCard
            consumerName="aryant"
            service="painting"
            feedback="The service was really nice and the work was done in time with utmost quality."
            rating={4.5}
          />
        </div>
      </div>
    </div>
  );
}

export default FourthHomeSegment;
