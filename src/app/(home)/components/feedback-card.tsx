import React from "react";
import classes from "./feedback-card.module.css";
interface IFeedback {
  consumerName: string;
  service: string;
  feedback: string;
  rating: number;
}

function FeedbackCard({ consumerName, service, feedback, rating }: IFeedback) {
  return (
    <div className={classes["feedback-card"]}>
      <h4 className={classes["consumer-name"]}>{consumerName}</h4>
      <h6 className={classes.service}>{service}</h6>
      <p className={classes.feedback}>{feedback}</p>
      <div className={classes["rating-holder"]}>
        <img src="star.png" className={classes["star-img"]}></img>
        <h6 className={classes.rating}>{rating}</h6>
      </div>
    </div>
  );
}

export default FeedbackCard;
