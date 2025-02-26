import React from "react";
import styles from "./inputControl.module.css";

const InputControl = ({ label, isPassword, ...props }) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <input type="text" placeholder="Enter name" />
    </div>
  );
};

export default InputControl;
