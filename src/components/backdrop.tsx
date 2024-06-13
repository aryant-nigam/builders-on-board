"use client";
import { useEffect, useRef, useState } from "react";
import classes from "./backdrop.module.css";
import { createPortal } from "react-dom";

const Backdrop = ({ children }: { children: React.ReactNode }) => {
  const [backdropContainer, setBackdropContainer] = useState<Element | null>(
    null
  );

  useEffect(() => {
    document.documentElement.classList.remove(classes["backdrop-close"]);
    document.documentElement.classList.add(classes["backdrop-open"]);
    setBackdropContainer(document.querySelector("#backdrop"));

    return () => {
      // document.documentElement.classList.remove(classes["backdrop-open"]);
      document.documentElement.classList.add(classes["backdrop-close"]);
    };
  }, []);

  return backdropContainer
    ? createPortal(
        <div className={classes.backdrop}>{children}</div>,
        backdropContainer! as Element
      )
    : null;
};

export default Backdrop;

// usage:
{
  /* <Backdrop>
  <Modal
    type={ModalType.QUERY}
    title="This is the title"
    message="This is the message that user has to read"
    onAcceptHandler={() => {
      console.log("confirm");
    }}
    onDenyHandler={() => {
      console.log("deny");
    }}
  />
</Backdrop>; */
}
