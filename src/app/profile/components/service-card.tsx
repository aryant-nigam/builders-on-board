"use client";
import React from "react";
import classes from "./service-card.module.css";
import { IServiceCard } from "./service-list";

function ServiceCard({
  serviceCard,
  isActive,
}: {
  serviceCard: IServiceCard;
  isActive: boolean;
}) {
  const accType = "customer";

  const provideFeedbackHandler = () => {
    console.log("provide feedback");
  };

  const cancelServiceHandler = () => {
    console.log("cancel service");
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (isActive) {
      cancelServiceHandler();
    } else {
      provideFeedbackHandler();
    }
  };

  return (
    <div className={classes["service-card"]}>
      <h1>
        Service card :{" "}
        <span className={classes["highlighted-text"]}>
          {serviceCard.serviceId}
        </span>
      </h1>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Service:</h4>
        <p className={classes["details-value"]}>{serviceCard.service}</p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Booking Date:</h4>
        <p className={classes["details-value"]}>{serviceCard.bookingDate}</p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Expert name:</h4>
        <p className={classes["details-value"]}>{serviceCard.expertName}</p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Charges:</h4>
        <p className={classes["details-value"]}>₹ {serviceCard.charges}</p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Description:</h4>
        <p className={classes["details-value"]}>{serviceCard.description}</p>
      </div>
      {/* {accType === "builder" && (
        <input type="submit" value="Save" className={classes["save-btn"]} />
      )} */}
      {accType === "customer" && (
        <button className={classes["btn"]} onClick={clickHandler}>
          {isActive ? "cancel" : "write feedback"}
        </button>
      )}
    </div>
  );
}

export default ServiceCard;
