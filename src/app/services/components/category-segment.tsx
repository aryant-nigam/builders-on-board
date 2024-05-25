"use client";
import React, { useState } from "react";
import classes from "./category-segment.module.css";
import WorkerCard from "./worker-card";

export interface Iworker {
  id: number;
  name: string;
  image: string;
  expertise: string;
  pincode?: string;
  experience: number;
  fee: number;
}

const workersList: Iworker[] = [
  {
    id: 1122,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "electrical work",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
  {
    id: 1123,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "electrical work",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
  {
    id: 1124,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painting",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
  {
    id: 1125,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painting",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
  {
    id: 1126,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painting",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
  {
    id: 1127,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painting",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
  {
    id: 1128,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "pest controlling",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
  {
    id: 1129,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painting",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
  {
    id: 1129,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painter",
    pincode: "225533",
    experience: 3,
    fee: 300,
  },
];

function CategorySegment({
  category,
  pincode,
  selectedWorker,
  saveWorker,
}: {
  category: string;
  pincode: string;
  selectedWorker: Iworker | null;
  saveWorker: (worker: Iworker) => void;
}) {
  const workers = workersList.filter(
    (worker) => worker.expertise == category && worker.pincode == pincode
  );

  if (workers.length !== 0) {
    const [workerSelected, setWorkerSelected] = useState<Iworker>(
      selectedWorker ? selectedWorker : workers[0]
    );

    !selectedWorker && saveWorker(workerSelected);

    const selectWorkerHandler = (worker: Iworker) => {
      setWorkerSelected(worker);
      saveWorker(worker);
    };

    return (
      <div className={classes["category-segment"]}>
        <h1>
          <span className={classes["highlighted-text"]}>
            {category} Staff&nbsp;
          </span>
          in your locality
        </h1>
        <div className={classes["workers-list"]}>
          {workers.map((worker) => {
            return (
              <WorkerCard
                key={worker.id}
                worker={worker}
                selectWorkerHandler={selectWorkerHandler}
                isSelected={worker.id === workerSelected.id}
              ></WorkerCard>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes["category-segment"]}>
        <h1>😟 unfortunately! no experts found </h1>
      </div>
    );
  }
}

export default CategorySegment;
