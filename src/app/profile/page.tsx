"use client";
import React from "react";
import classes from "./page.module.css";
import CollapsibleTile from "./components/collapsible-tiles";
import ServiceList from "./components/service-list";
import { useAppSelector } from "@/store/hooks";

const tiles = [
  { title: "Active Services", isActive: true },
  { title: "Completed Services", isActive: false },
];
function ProfilePage() {
  function titleCase(str: string) {
    return str.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase());
  }

  const firstName = useAppSelector((state) => state.auth.user?.firstname);
  const lastName = useAppSelector((state) => state.auth.user?.lastname);

  return (
    <div className={classes["profile-page"]}>
      <div className={classes["profile-page-left"]}>
        {tiles.map((tile, index) => (
          <CollapsibleTile key={index} title={tile.title}>
            <ServiceList isActive={tile.isActive} />
          </CollapsibleTile>
        ))}
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
