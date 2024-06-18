import React from "react";
import classes from "./feedback-card.module.css";
interface IFeedback {
  customerName: string;
  serviceType: string;
  feedback: string;
  rating: number;
}

function FeedbackCard({
  customerName,
  serviceType,
  feedback,
  rating,
}: IFeedback) {
  return (
    <div className={classes["feedback-card"]}>
      <h4 className={classes["consumer-name"]}>{customerName}</h4>
      <h6>
        service availed:&nbsp;&nbsp;
        <span className={classes.service}>{serviceType}</span>
      </h6>
      <p className={classes.feedback}>{feedback}</p>
      <div className={classes["rating-holder"]}>
        {Array.from({ length: rating }, (_, index) => (
          <img
            key={index}
            src="active-star.png"
            className={classes["star-img"]}
          ></img>
        ))}
      </div>
    </div>
  );
}

export default FeedbackCard;
