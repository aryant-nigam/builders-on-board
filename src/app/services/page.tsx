import React from "react";
import classes from "./page.module.css";
import CategorySegment from "./components/category-segment";

interface Iworker {
  id: number;
  name: string;
  image: string;
  expertise: string;
  pincode: number;
}

function ServicesPage() {
  const categories: string[] = [
    "painter",
    "pest cleaning",
    "carpentry",
    "electrician",
  ];

  return (
    <div className={classes["service-page"]}>
      {categories.map((category, index) => (
        <CategorySegment category={category} />
      ))}
    </div>
  );
}

export default ServicesPage;
