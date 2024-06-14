"use client";
import React from "react";
import { useState } from "react";
import classes from "./collapsible-tiles.module.css";

interface ICollapsableTile {
  title: string;
  children: React.ReactNode;
}
function CollapsibleTile({ title, children }: ICollapsableTile) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsCollapsed((prevState) => !prevState);
  };
  return (
    <div className={classes["collapsible-tile"]}>
      <div className={classes["collapsible-tile-head"]}>
        <h3 className={classes["collapsible-tile-title"]}>{title}</h3>
        <button
          className={`${classes["toggle-btn"]} ${
            isCollapsed ? classes["expand-icon"] : classes["collapse-icon"]
          }`}
          onClick={toggle}
        >
          <img src="arrow.png" className={classes["expand-icon"]}></img>
        </button>
      </div>
      <div
        className={`${
          isCollapsed
            ? classes["collapsible-tile-body-collapsed"]
            : classes["collapsible-tile-body-expanded"]
        }
        `}
      >
        {children}
      </div>
    </div>
  );
}

export default CollapsibleTile;
