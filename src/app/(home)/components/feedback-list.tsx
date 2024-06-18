"use client";
import React, { useEffect, useState } from "react";
import classes from "./feedback-list.module.css";
import FeedbackCard from "./feedback-card";
import useHttp from "@/hooks/use-http";
import { toTitleCase } from "@/utils";
import Loader from "@/components/loader";

function FeedbackList() {
  const [feedbackCardsList, setFeedbackCardsList] = useState([]);
  const { get, isLoading, successMsg, errorMsg } = useHttp(
    `https://builders-on-board-be-2.onrender.com/feedbacks`
  );

  useEffect(() => {
    const getFeedbacks = async () => {
      const response = await get(null);
      console.log(response);
      if (response.length > 0) {
        const list = response.map((feedback: any) => {
          return (
            <FeedbackCard
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

  return (
    <div className={classes["feedback-list"]}>
      {feedbackCardsList.length > 0 && feedbackCardsList}
      {isLoading && <Loader />}
      {feedbackCardsList.length == 0 && !isLoading && (
        <p>No feedbacks to show up</p>
      )}
    </div>
  );
}

export default FeedbackList;
