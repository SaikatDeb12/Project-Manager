import React from "react";
import styles from "./modal.module.css";
const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.container} onClick={() => onClose()}>
      <div
        className={styles.inner}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
