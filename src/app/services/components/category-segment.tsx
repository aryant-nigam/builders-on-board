import React from "react";
import classes from "./category-segment.module.css";
import WorkerCard from "./worker-card";

interface Iworker {
  id: number;
  name: string;
  image: string;
  expertise: string;
  pincode: number;
}

interface ICategory {
  category: string;
}

const workersList: Iworker[] = [
  {
    id: 1122,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "electrician",
    pincode: 225533,
  },
  {
    id: 1123,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "electrician",
    pincode: 225533,
  },
  {
    id: 1124,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "electrician",
    pincode: 225533,
  },
  {
    id: 1125,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "carpentry",
    pincode: 225533,
  },
  {
    id: 1126,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "carpentry",
    pincode: 225533,
  },
  {
    id: 1127,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "carpentry",
    pincode: 225533,
  },
  {
    id: 1128,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painter",
    pincode: 225533,
  },
  {
    id: 1129,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painter",
    pincode: 225533,
  },
  {
    id: 1129,
    name: "Abhay Srivastava",
    image: "worker-img.png",
    expertise: "painter",
    pincode: 225533,
  },
];

function CategorySegment({ category }: ICategory) {
  const workers = workersList.filter((worker) => worker.expertise == category);
  return (
    <div className={classes["category-segment"]}>
      <h1>{category}</h1>
      <div className={classes["workers-list"]}>
        {workers.map((worker) => {
          return (
            <WorkerCard
              id={worker.id}
              name={worker.name}
              expertise={worker.expertise}
              pincode={worker.pincode}
              image={worker.image}
            ></WorkerCard>
          );
        })}
      </div>
    </div>
  );
}

export default CategorySegment;
