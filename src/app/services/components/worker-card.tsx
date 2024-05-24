"use client";
import React, { useState } from "react";
import classes from "./worker-card.module.css";

interface IWorkerCard {
  id: number;
  name: string;
  image: string;
  expertise: string;
  experience: number;
  fee: number;
}

function WorkerCard({
  id,
  name,
  image,
  expertise,
  experience,
  fee,
}: IWorkerCard) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelectHandler = () => {
    setIsSelected((prevState) => !prevState);
  };

  return (
    <div className={classes["worker-card"]} onClick={toggleSelectHandler}>
      {isSelected && (
        <img
          src="check-mark.png"
          className={classes["checked-list-icon"]}
        ></img>
      )}
      <img src="worker-img.png" className={classes["worker-image"]}></img>
      <p className={classes["worker-id"]}>{id}</p>
      <h3 className={classes["worker-name"]}>{name}</h3>
      <h4 className={classes["worker-expertise"]}>{expertise}</h4>

      <p className={classes["experience"]}>
        <span className={classes["exp-title"]}>Experience:</span>
        <span>{experience} yrs</span>
      </p>
      <p className={classes["fee"]}>
        <span className={classes["fee-title"]}>Fee:</span>
        <span>$ {fee}</span>
      </p>
    </div>
  );
}

export default WorkerCard;
