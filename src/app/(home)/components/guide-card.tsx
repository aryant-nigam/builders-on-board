import React from "react";
import classes from "./guide-card.module.css";

interface IGuideCard {
  imagePath: string;
  title: string;
  description: string;
}

function GuideCard({ imagePath, title, description }: IGuideCard) {
  return (
    <div className={classes["guide-card"]}>
      <img src={imagePath} className={classes["guide-card-img"]}></img>
      <h5 className={classes["guide-card-title"]}>{title}</h5>
      <p className={classes["guide-card-description"]}>{description}</p>
    </div>
  );
}

export default GuideCard;
