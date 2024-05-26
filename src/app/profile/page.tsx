import React from "react";
import classes from "./page.module.css";
import CollapsibleTile from "./components/collapsible-tiles";
import ServiceList from "./components/service-list";

const tiles = [
  { title: "Active Services", isActive: true },
  { title: "Completed Services", isActive: false },
];
function ProfilePage() {
  const username = "Aryant";

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
          <span className={classes["highlighted-text"]}>{username}! </span>
          let's look at the services you availed
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
