import exp from "constants";
import classes from "./modal.module.css";

export enum ModalType {
  INFO,
  QUERY,
}

interface Imodal {
  type: ModalType;
  title: string;
  message: string;
  onAcceptHandler: () => void | null;
  onDenyHandler: () => void | null;
}
const Modal = ({
  type,
  title,
  message,
  onAcceptHandler,
  onDenyHandler,
}: Imodal) => {
  return (
    <div className={classes.modal}>
      <h4 className={classes["modal-title"]}>{title}</h4>
      <p className={classes["modal-message"]}>{message}</p>
      <div className={classes["modal-actions"]}>
        <button className={classes["modal-accept"]} onClick={onAcceptHandler}>
          Ok
        </button>
        {type == ModalType.QUERY && (
          <button className={classes["modal-deny"]} onClick={onDenyHandler}>
            cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Modal;
