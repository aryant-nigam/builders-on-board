"use client";
import React from "react";
import classes from "./page.module.css";
import CollapsibleTile from "./components/collapsible-tiles";
import ServiceList from "./components/service-list";
import { useAppSelector } from "@/store/hooks";
import PersonalDetailsForm from "./components/personal-details-form";
import UnAuth from "@/components/unauth";

export enum ServiceListType {
  ACTIVE,
  INACTIVE,
  COMPLETED,
  CANCELLED,
}

function ProfilePage() {
  function titleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
  }

  const firstName = useAppSelector(
    (state) => state.auth.userPersonalInformation?.firstname
  );
  const lastName = useAppSelector(
    (state) => state.auth.userPersonalInformation?.lastname
  );

  const inactiveServicesList = useAppSelector(
    (state) => state.services.inactiveServicesList
  );
  const activeServicesList = useAppSelector(
    (state) => state.services.activeServicesList
  );
  const completedServicesList = useAppSelector(
    (state) => state.services.completedServicesList
  );
  const cancelledServicesList = useAppSelector(
    (state) => state.services.cancelledServicesList
  );

  console.log(
    inactiveServicesList,
    activeServicesList,
    completedServicesList,
    cancelledServicesList
  );

  return (
    <div className={classes["profile-page"]}>
      {<UnAuth />}
      <div className={classes["profile-page-left"]}>
        <CollapsibleTile title="Personal Details">
          <PersonalDetailsForm />
        </CollapsibleTile>

        <CollapsibleTile title="Services Requested">
          {inactiveServicesList.length !== 0 ? (
            <ServiceList
              type={ServiceListType.INACTIVE}
              servicesList={inactiveServicesList}
            ></ServiceList>
          ) : (
            <p className={classes["empty-list-message"]}>
              You have no requested services !
            </p>
          )}
        </CollapsibleTile>

        <CollapsibleTile title="Active Services">
          {activeServicesList.length !== 0 ? (
            <ServiceList
              type={ServiceListType.ACTIVE}
              servicesList={activeServicesList}
            ></ServiceList>
          ) : (
            <p className={classes["empty-list-message"]}>
              You have no active services !
            </p>
          )}
        </CollapsibleTile>

        <CollapsibleTile title="Completed Services">
          {completedServicesList.length !== 0 ? (
            <ServiceList
              type={ServiceListType.COMPLETED}
              servicesList={completedServicesList}
            ></ServiceList>
          ) : (
            <p className={classes["empty-list-message"]}>
              You have no services which are completed !
            </p>
          )}
        </CollapsibleTile>

        <CollapsibleTile title="Cancelled Services">
          {cancelledServicesList.length !== 0 ? (
            <ServiceList
              type={ServiceListType.CANCELLED}
              servicesList={cancelledServicesList}
            ></ServiceList>
          ) : (
            <p className={classes["empty-list-message"]}>
              You have no services which were cancelled !
            </p>
          )}
        </CollapsibleTile>
      </div>
      <div className={classes["profile-page-right"]}>
        <h1>
          Hello,&nbsp;
          <span className={classes["highlighted-text"]}>
            {firstName && titleCase(firstName)}{" "}
            {lastName && titleCase(lastName!)} !
          </span>
          &nbsp; let's look at the services you availed
        </h1>

        <img src="builders.png" className={classes["img-banner"]}></img>
      </div>
    </div>
  );
}

export default ProfilePage;
{
  /* <div className={classes["active-services"]}>
        {l.map((data) => (
          <ServiceCard key={data} />
        ))}
      </div>
      <div className={classes["completed-services"]}></div>
      {accountType == "builder" && <div className={classes["bookings"]}></div>} */
}
