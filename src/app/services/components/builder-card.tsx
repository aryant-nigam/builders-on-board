"use client";
import React, { useState } from "react";
import classes from "./builder-card.module.css";
import { Builder } from "./category-segment";
import { toTitleCase } from "@/utils";

interface IBuilderCard {
  builder: Builder;
  isSelected: boolean;
  selectBuilderHandler: (builder: Builder) => void;
}

function BuilderCard({
  builder,
  isSelected,
  selectBuilderHandler,
}: IBuilderCard) {
  const clickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    selectBuilderHandler(builder);
  };

  return (
    <div className={classes["builder-card"]} onClick={clickHandler}>
      {isSelected && (
        <img
          src="check-mark.png"
          className={classes["checked-list-icon"]}
        ></img>
      )}
      <img src="builder-img.png" className={classes["builder-image"]}></img>

      <h3 className={classes["builder-name"]}>
        {toTitleCase(builder.firstname) + " " + toTitleCase(builder.lastname)}
      </h3>
      <h4 className={classes["builder-expertise"]}>{builder.service_type}</h4>

      <p className={classes["fee"]}>
        <span className={classes["fee-title"]}>Fee:</span>
        <span>₹ {builder.fee}</span>
      </p>
    </div>
  );
}

export default BuilderCard;
