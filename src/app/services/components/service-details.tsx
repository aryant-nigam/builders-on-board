import React from "react";
import classes from "./service-details.module.css";

function ServiceDetails({ details }: { details: any }) {
  return (
    <div className={classes["service-details"]}>
      <h1>Service Details</h1>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Name:</h4>
        <p className={classes["details-value"]}>
          {`${details.serviceDetails.firstname} ${details.serviceDetails.lastname}`}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Phone Number:</h4>
        <p className={classes["details-value"]}>
          {details.serviceDetails.phoneNumber}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Email:</h4>
        <p className={classes["details-value"]}>
          {details.serviceDetails.email}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Address:</h4>
        <p className={classes["details-value"]}>
          {`${details.serviceDetails.address}, ${details.serviceDetails.pincode}
           ${
             "near " +
             (details.serviceDetails.landmark &&
               details.serviceDetails.landmark)
           }`}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Description:</h4>
        <p className={classes["details-value"]}>
          {details.serviceDetails.description}
        </p>
      </div>
      <hr className={classes.divider}></hr>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Expert Id:</h4>
        <p className={classes["details-value"]}>{details.workerSelected.id}</p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Expert Name:</h4>
        <p className={classes["details-value"]}>
          {details.workerSelected.name}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Charges:</h4>
        <p className={classes["details-value"]}>
          ₹ {details.workerSelected.fee}
        </p>
      </div>
    </div>
  );
}

export default ServiceDetails;
