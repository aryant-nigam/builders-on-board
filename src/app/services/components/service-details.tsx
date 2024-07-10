import React from "react";
import classes from "./service-details.module.css";
import { toTitleCase } from "@/utils";

function ServiceDetails({ details }: { details: any }) {
  console.log(details);
  return (
    <div className={classes["service-details"]}>
      <h1>Service Details</h1>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Name:</h4>
        <p className={classes["details-value"]}>
          {`${toTitleCase(details.customerDetails.firstname)} ${toTitleCase(
            details.customerDetails.lastname
          )}`}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Phone Number:</h4>
        <p className={classes["details-value"]}>
          {details.customerDetails.phoneNumber}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Email:</h4>
        <p className={classes["details-value"]}>
          {details.customerDetails.email}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Address:</h4>
        <p className={classes["details-value"]}>
          {`${details.customerDetails.address}, ${
            details.customerDetails.pincode
          }
           ${
             "near " +
             (details.customerDetails.landmark &&
               details.customerDetails.landmark)
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
        <p className={classes["details-value"]}>
          {details.builderSelected.builder_id}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Expert Name:</h4>
        <p className={classes["details-value"]}>
          {toTitleCase(details.builderSelected.firstname) +
            " " +
            toTitleCase(details.builderSelected.lastname)}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Service Type:</h4>
        <p className={classes["details-value"]}>
          {toTitleCase(details.builderSelected.service_type)}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Charges:</h4>
        <p className={classes["details-value"]}>
          ₹ {details.builderSelected.fee}
        </p>
      </div>
    </div>
  );
}

export default ServiceDetails;
