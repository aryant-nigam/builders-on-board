"use client";
import React, { useRef, useState } from "react";
import classes from "./feedback-form.module.css";
import useRating from "./use-rating";
import { useAppSelector } from "@/store/hooks";

function FeedbackForm({
  serviceId,
  sendFeedbackHandler,
  closeFeedbackFormHandler,
}: {
  serviceId: number;
  sendFeedbackHandler: (feedbackBody: {}) => void;
  closeFeedbackFormHandler: () => void;
}) {
  const { rating, Rating } = useRating();
  const [feedbackError, setFeedbackError] = useState<boolean>(false);
  const feedbackRef = useRef<HTMLTextAreaElement>(null);
  const isBuilder = useAppSelector((state) => state.auth.user?.is_builder);

  // const sendFeedbackHandler = async () => {
  //   let body: any = { customer_star_rating: rating };
  //   if (feedbackRef.current?.value) {
  //     if (/^[a-zA-Z0-9. ]*$/.test(feedbackRef.current?.value)) {
  //       setFeedbackError(false);
  //       body["customer_feedback"] = feedbackRef.current?.value;
  //     } else {
  //       setFeedbackError(true);
  //     }
  //   }

  //   if (!isExpired(accessToken!)) {
  //     const response = await put(body, accessToken);
  //   }
  // };

  const feedbackBtnClickHandler = () => {
    console.log("feedback ", feedbackRef.current?.value);
    console.log("current rating ", rating);
    let body: any;
    if (!isBuilder) body = { ...body, customer_star_rating: rating };

    if (feedbackRef.current?.value) {
      if (/^[a-zA-Z0-9. ]*$/.test(feedbackRef.current?.value)) {
        setFeedbackError(false);
        if (!isBuilder)
          body = { ...body, customer_feedback: feedbackRef.current?.value };
        else body = { ...body, builder_feedback: feedbackRef.current?.value };
      } else {
        setFeedbackError(true);
      }
    }

    sendFeedbackHandler(body);

    // closeFeedbackFormHandler();
    // setTimeout(() => {
    //   closeFeedbackFormHandler();
    // }, 1500);
  };

  return (
    <div className={classes["feedback-form"]}>
      <div className={classes["feedback-header"]}>
        <h1>Your feedback matters</h1>
        <button
          className={classes["close-btn"]}
          onClick={closeFeedbackFormHandler}
        >
          X
        </button>
      </div>

      <textarea
        ref={feedbackRef}
        className={classes.feedback}
        placeholder="Your comments"
      ></textarea>

      {feedbackError && (
        <p className={classes["feedback-error"]}>
          Feedback must contain only alphabets, spaces, period{" "}
        </p>
      )}

      {!isBuilder && <Rating />}
      <button className={classes["send-btn"]} onClick={feedbackBtnClickHandler}>
        share
      </button>
    </div>
  );
}

export default FeedbackForm;
