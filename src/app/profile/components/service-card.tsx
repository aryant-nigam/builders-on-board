"use client";
import React, { useEffect, useState } from "react";
import classes from "./service-card.module.css";
import { IServiceCard } from "./service-list";
import { toTitleCase } from "@/utils";
import { ServiceListType } from "../page";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  acceptService,
  cancelService,
  completeService,
  updateCompletedServices,
} from "@/store/features/services-slice";
import useHttp from "@/hooks/use-http";
import { isExpired } from "react-jwt";
import { removeAuthenticatedUserDetails } from "@/store/features/auth-slice";
import Backdrop from "@/components/backdrop";
import Loader from "@/components/loader";
import Snackbar from "@/components/snackbar";
import FeedbackForm from "./feedback-form";
import { useRouter } from "next/navigation";

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
  const isBuilder = useAppSelector((state) => state.auth.user?.is_builder);
  const refreshToken = useAppSelector((state) => state.auth.refreshToken);
  const router = useRouter();
  const { put, isLoading, successMsg, errorMsg } = useHttp(
    `https://builders-on-board-be-2.onrender.com/services?service_id=${service.serviceId}`
  );

  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState<Boolean>(false);

  const canSendRequest = () => {
    if (isExpired(accessToken!)) {
      if (refreshToken && !isExpired(refreshToken)) {
        router.replace("/session-expired");
      } else {
        dispatch(removeAuthenticatedUserDetails());
      }
      return false;
    } else {
      return true;
    }
  };

  const sendFeedbackHandler = async (feedbackBody: any) => {
    if (canSendRequest()) {
      setIsFeedbackFormOpen(false);
      const response = await put(feedbackBody, accessToken);
      console.log("done Be");
      let updatedService: any = { ...service };
      if (!isBuilder)
        updatedService = {
          ...updatedService,
          customerStarRating: feedbackBody["customer_star_rating"],
          customerFeedback: feedbackBody["customer_feedback"],
        };
      else {
        updatedService = {
          ...updatedService,
          builderFeedback: feedbackBody["builder_feedback"],
        };
      }

      dispatch(
        updateCompletedServices({
          service: updatedService,
        })
      );
      console.log("done store");
    }
  };

  const openFeedbackFormHandler = () => {
    if (isExpired(accessToken!)) {
      if (refreshToken && !isExpired(refreshToken)) {
        router.replace("/session-expired");
      } else {
        dispatch(removeAuthenticatedUserDetails());
      }
    } else {
      setIsFeedbackFormOpen(true);
    }
  };

  const acceptServiceHandler = async () => {
    if (canSendRequest()) {
      const response = await put({ is_active: true }, accessToken);
      if (response == 200) {
        setTimeout(() => {
          dispatch(
            acceptService({
              service: { ...service, isActive: true },
            })
          );
        }, 3000);
      }
    }
  };

  const completeServiceHandler = async () => {
    if (canSendRequest()) {
      const response = await put({ is_active: false }, accessToken);
      if (response == 200) {
        setTimeout(() => {
          dispatch(
            completeService({
              service: { ...service, isActive: false },
            })
          );
        }, 3000);
      }
    }
  };

  const cancelServiceHandler = async () => {
    if (canSendRequest()) {
      const response = await put({ is_cancelled: true }, accessToken);
      if (response == 200) {
        setTimeout(() => {
          dispatch(
            cancelService({
              service: { ...service, isActive: false, isCancelled: true },
            })
          );
        }, 3000);
      }
    }
  };

  return (
    <div className={classes["service-card"]}>
      {isLoading && (
        <Backdrop>
          <Loader />
        </Backdrop>
      )}
      {isFeedbackFormOpen && (
        <Backdrop>
          <FeedbackForm
            serviceId={service.serviceId}
            sendFeedbackHandler={sendFeedbackHandler}
            closeFeedbackFormHandler={() => {
              setIsFeedbackFormOpen(false);
            }}
          />
        </Backdrop>
      )}
      {successMsg && <Snackbar message={successMsg} />}
      {errorMsg && <Snackbar message={errorMsg} />}
      {type === ServiceListType.CANCELLED && (
        <p className={classes.cancelled}>Cancelled</p>
      )}
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
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>landmark:</h4>
        <p className={classes["details-value"]}>{service.landmark}</p>
      </div>
      <div className={classes["hr"]}></div>
      <div className={classes.details}>
        <h4 className={classes["details-label"]}>
          {isBuilder ? "Customer Name:" : "Expert Name:"}
        </h4>
        <p className={classes["details-value"]}>
          {isBuilder
            ? toTitleCase(service.customerName)
            : toTitleCase(service.builderName)}
        </p>
      </div>
      <div className={classes.details}>
        <div className={classes.contact}>
          <img src="phone.png" className={classes["contact-icon"]}></img>
          <p className={classes["details-value"]}>
            {isBuilder ? service.customerPhnNo : service.builderPhnNo}
          </p>
        </div>
        <div className={classes.contact}>
          <img src="email.png" className={classes["contact-icon"]}></img>
          <p className={classes["details-value"]}>
            {isBuilder ? service.customerEmail : service.builderEmail}
          </p>
        </div>
      </div>
      <div className={classes["service-actions"]}>
        {type === ServiceListType.INACTIVE && (
          <>
            <button
              className={classes["reject-btn"]}
              onClick={cancelServiceHandler}
              style={{ marginRight: `${isBuilder ? "15px" : "0px"}` }}
            >
              {isBuilder ? "reject" : "cancel"}
            </button>
            {isBuilder && (
              <button className={classes["btn"]} onClick={acceptServiceHandler}>
                accept
              </button>
            )}
          </>
        )}

        {type === ServiceListType.ACTIVE && isBuilder && (
          <>
            <button
              className={classes["reject-btn"]}
              onClick={cancelServiceHandler}
              style={{ marginRight: "15px" }}
            >
              cancel
            </button>
            <button className={classes["btn"]} onClick={completeServiceHandler}>
              complete
            </button>
          </>
        )}

        {type === ServiceListType.COMPLETED &&
          ((!isBuilder &&
            !service.customerFeedback &&
            !service.customerStarRating) ||
            (isBuilder && !service.builderFeedback)) && (
            <button
              className={classes["btn"]}
              onClick={openFeedbackFormHandler}
            >
              write feedback
            </button>
          )}
      </div>
    </div>
  );
}

export default ServiceCard;
//toLocaleString
