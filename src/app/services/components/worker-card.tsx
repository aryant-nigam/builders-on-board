"use client";
import React, { useState } from "react";
import classes from "./worker-card.module.css";
import { Iworker } from "./category-segment";

interface IWorkerCard {
  worker: Iworker;
  isSelected: boolean;
  selectWorkerHandler: (worker: Iworker) => void;
}

function WorkerCard({ worker, isSelected, selectWorkerHandler }: IWorkerCard) {
  const clickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    selectWorkerHandler(worker);
  };

  return (
    <div className={classes["worker-card"]} onClick={clickHandler}>
      {isSelected && (
        <img
          src="check-mark.png"
          className={classes["checked-list-icon"]}
        ></img>
      )}
      <img src="worker-img.png" className={classes["worker-image"]}></img>
      <p className={classes["worker-id"]}>{worker.id}</p>
      <h3 className={classes["worker-name"]}>{worker.name}</h3>
      <h4 className={classes["worker-expertise"]}>{worker.expertise}</h4>

      <p className={classes["experience"]}>
        <span className={classes["exp-title"]}>Experience:</span>
        <span>{worker.experience} yrs</span>
      </p>
      <p className={classes["fee"]}>
        <span className={classes["fee-title"]}>Fee:</span>
        <span>₹ {worker.fee}</span>
      </p>
    </div>
  );
}

export default WorkerCard;
