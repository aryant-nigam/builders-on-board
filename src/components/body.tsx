import React from "react";
import Navbar from "./navbar";
import classes from "./body.module.css";
function Body({ children }: { children: React.ReactNode }) {
  return (
    <body className={classes.body}>
      <Navbar />
      {children}
    </body>
  );
}

export default Body;
