"use client";
import React, { useEffect } from "react";
import classes from "./service-card.module.css";
import { IServiceCard } from "./service-list";
import { toTitleCase } from "@/utils";
import { ServiceListType } from "../page";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { cancelService } from "@/store/features/services-slice";
import useHttp from "@/hooks/use-http";
import { isExpired } from "react-jwt";
import { removeAuthenticatedUserDetails } from "@/store/features/auth-slice";
import Backdrop from "@/components/backdrop";
import Loader from "@/components/loader";
import Snackbar from "@/components/snackbar";

function ServiceCard({
  service,
  type,
}: {
  service: IServiceCard;
  type: ServiceListType;
}) {
  const dispatch = useAppDispatch();
  const customerId = useAppSelector((state) => state.auth.user?.id);
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const { put, isLoading, successMsg, errorMsg } = useHttp(
    `https://builders-on-board-be-2.onrender.com/services?customer_id=${customerId}&service_id=${service.serviceId}`
  );

  const provideFeedbackHandler = () => {
    console.log("provide feedback");
  };

  const updateServiceStatus = async () => {
    const response = await put({ is_cancelled: true }, accessToken);
    if (response == 200) {
      setTimeout(() => {
        dispatch(cancelService({ service }));
      }, 3000);
    }
  };

  const cancelServiceHandler = () => {
    if (isExpired(accessToken!)) {
      removeAuthenticatedUserDetails();
      console.log(successMsg);
    } else {
      updateServiceStatus();
    }
  };

  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (type === ServiceListType.ACTIVE) {
      cancelServiceHandler();
    } else if (type === ServiceListType.INACTIVE) {
      provideFeedbackHandler();
    }
  };

  return (
    <div className={classes["service-card"]}>
      {isLoading && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}
      {successMsg && <Snackbar message={successMsg} />}
      {errorMsg && <Snackbar message={errorMsg} />}
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Service:</h4>
        <p className={classes["details-value"]}>
          {toTitleCase(service.serviceType)}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Booking Date:</h4>
        <p className={classes["details-value"]}>{service.bookingDate}</p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Charges:</h4>
        <p className={classes["details-value"]}>₹ {service.fee}</p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Description:</h4>
        <p className={classes["details-value"]}>
          {toTitleCase(service.description)}
        </p>
      </div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Address:</h4>
        <p className={classes["details-value"]}>{service.address}</p>
      </div>
      <div className={classes["hr"]}></div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>Expert name:</h4>
        <p className={classes["details-value"]}>{service.builderName}</p>
      </div>
      <div className={classes.details}>
        <div className={classes.contact}>
          <img src="phone.png" className={classes["contact-icon"]}></img>
          <p className={classes["details-value"]}>{service.builderPhnNo}</p>
        </div>
        <div className={classes.contact}>
          <img src="email.png" className={classes["contact-icon"]}></img>
          <p className={classes["details-value"]}>{service.builderEmail}</p>
        </div>
      </div>
      {(type === ServiceListType.ACTIVE ||
        type === ServiceListType.INACTIVE) && (
        <button className={classes["btn"]} onClick={clickHandler}>
          {type === ServiceListType.ACTIVE ? "cancel" : "write feedback"}
        </button>
      )}
    </div>
  );
}

export default ServiceCard;
//toLocaleString
