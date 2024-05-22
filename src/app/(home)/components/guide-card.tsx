import React from "react";
import classes from "./guide-card.module.css";

interface IGuideCard {
  imagePath: string;
  title: string;
  description: string;
}

function GuideCard({ imagePath, title, description }: IGuideCard) {
  return (
    <div className={classes["home-segment-4-card"]}>
      <img src={imagePath} className={classes["home-segment-4-card-img"]}></img>
      <h5 className={classes["home-segment-4-card-title"]}>{title}</h5>
      <p className={classes["home-segment-4-card-description"]}>
        {description}
      </p>
    </div>
  );
}

export default GuideCard;
