"use client";
import React, { useState } from "react";
import classes from "./rating.module.css";

const useRating = () => {
  const [rating, setRating] = useState<number>(1);
  const [ratingMsg, setRatingMsg] = useState<string>("Terrible");

  const mapRatingMsg = (starIndex: number) => {
    switch (starIndex) {
      case 1:
        return "Terrible";
      case 2:
        return "Bad";
      case 3:
        return "Average";
      case 4:
        return "Good";
      case 5:
        return "Excellent";
      default:
        return "";
    }
  };

  const Rating = () => {
    const mouseOverHandler = (
      starIndex: number,
      event: React.MouseEvent<HTMLImageElement>
    ) => {
      event.currentTarget.src = "active-star.png";
      setRating(starIndex);
      setRatingMsg(mapRatingMsg(starIndex));
    };

    const mouseOutHandler = (
      starIndex: number,
      event: React.MouseEvent<HTMLImageElement>
    ) => {
      if (rating < starIndex) {
        event.currentTarget.src = "inactive-star.png";
        setRating(starIndex);
        setRatingMsg(mapRatingMsg(starIndex));
      }
    };

    return (
      <div className={classes.rating}>
        <img
          src={rating < 1 ? "inactive-star.png" : "active-star.png"}
          className={classes.star}
          onMouseOver={mouseOverHandler.bind(null, 1)}
          onMouseOut={mouseOutHandler.bind(null, 1)}
        />
        <img
          src={rating < 2 ? "inactive-star.png" : "active-star.png"}
          className={classes.star}
          onMouseOver={mouseOverHandler.bind(null, 2)}
          onMouseOut={mouseOutHandler.bind(null, 2)}
        />
        <img
          src={rating < 3 ? "inactive-star.png" : "active-star.png"}
          className={classes.star}
          onMouseOver={mouseOverHandler.bind(null, 3)}
          onMouseOut={mouseOutHandler.bind(null, 3)}
        />
        <img
          src={rating < 4 ? "inactive-star.png" : "active-star.png"}
          className={classes.star}
          onMouseOver={mouseOverHandler.bind(null, 4)}
          onMouseOut={mouseOutHandler.bind(null, 4)}
        />
        <img
          src={rating < 5 ? "inactive-star.png" : "active-star.png"}
          className={classes.star}
          onMouseOver={mouseOverHandler.bind(null, 5)}
          onMouseOut={mouseOutHandler.bind(null, 5)}
        />
        <p className={classes["rating-msg"]}>{ratingMsg}</p>
      </div>
    );
  };

  return {
    rating,
    Rating,
  };
};

export default useRating;
