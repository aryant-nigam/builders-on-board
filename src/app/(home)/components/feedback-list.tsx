"use client";
import React, { useEffect, useState } from "react";
import classes from "./feedback-list.module.css";
import FeedbackCard from "./feedback-card";
import useHttp from "@/hooks/use-http";
import { toTitleCase } from "@/utils";
import Loader from "@/components/loader";
import { Button } from "@mui/material";

function FeedbackList() {
  const [feedbackCardsList, setFeedbackCardsList] = useState([]);
  const [feedbackContainer, setFeedbackContainer] = useState<Element | null>(
    null
  );
  const { get, isLoading, successMsg, errorMsg } = useHttp(
    `https://builders-on-board-be-2.onrender.com/feedbacks`
  );

  useEffect(() => {
    const getFeedbacks = async () => {
      const response = await get(null);
      console.log(response);
      if (response.length > 0) {
        const list = response.map((feedback: any, index: number) => {
          return (
            <FeedbackCard
              key={index}
              customerName={`${toTitleCase(
                feedback.customer_firstname
              )} ${toTitleCase(feedback.customer_lastname)}`}
              serviceType={toTitleCase(feedback.service_type)}
              feedback={toTitleCase(feedback.customer_feedback)}
              rating={feedback.customer_star_rating}
            />
          );
        });
        console.log(list);
        setFeedbackCardsList(list);
      }
    };
    getFeedbacks();
  }, []);

  useEffect(() => {
    setFeedbackContainer(
      document.querySelector(`#${classes["feedback-container"]}`)
    );
    console.log(document.querySelector(`#${classes["feedback-container"]}`));
  }, []);

  const moveNextHandler = () => {
    if (feedbackContainer) {
      let width = feedbackContainer.clientWidth;
      feedbackContainer.scrollLeft = feedbackContainer.scrollLeft + width;
    }
  };

  const movePrevHandler = () => {
    if (feedbackContainer) {
      let width = feedbackContainer.clientWidth;
      feedbackContainer.scrollLeft = feedbackContainer.scrollLeft - width;
    }
  };

  return (
    <div className={classes["feedback-carousel"]}>
      {/* {feedbackCardsList.length > 0 && feedbackCardsList}
      {isLoading && <Loader />}
      {feedbackCardsList.length == 0 && !isLoading && (
        <p>No feedbacks to show up</p>
      )} */}
      <button
        className={`${classes["prev-btn"]} ${
          feedbackCardsList.length <= 3 && classes.hidden
        }`}
      >
        <img
          src="arrow.png"
          className={classes["prev-icon"]}
          onClick={movePrevHandler}
        ></img>
      </button>
      <div id={classes["feedback-container"]}>
        {feedbackCardsList.length > 0 && feedbackCardsList}
        {
          <div className={classes["loader-container"]}>
            {isLoading && <Loader />}
            {feedbackCardsList.length == 0 && !isLoading && (
              <p className={classes["error-msg"]}>No feedbacks to show up</p>
            )}
          </div>
        }
      </div>
      <button
        className={`${classes["next-btn"]} ${
          feedbackCardsList.length <= 3 && classes.hidden
        }`}
      >
        <img
          src="arrow.png"
          className={classes["next-icon"]}
          onClick={moveNextHandler}
        ></img>
      </button>
    </div>
  );
}

export default FeedbackList;
