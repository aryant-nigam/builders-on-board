import React from "react";
import classes from "./worker-card.module.css";

interface IWorkerCard {
  id: number;
  name: string;
  image: string;
  expertise: string;
  pincode: number;
}

function WorkerCard({ id, name, image, expertise, pincode }: IWorkerCard) {
  return (
    <div className={classes["worker-card"]}>
      <img src="worker-img.png" className={classes["worker-image"]}></img>
      <p className={classes["worker-id"]}>{id}</p>
      <h3 className={classes["worker-name"]}>{name}</h3>
      <h4 className={classes["worker-expertise"]}>{expertise}</h4>
      <p className={classes["pincode"]}>{pincode}</p>
    </div>
  );
}

export default WorkerCard;
