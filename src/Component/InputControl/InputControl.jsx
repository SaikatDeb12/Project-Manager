import React, { useState } from "react";
import styles from "./inputControl.module.css";
import { LuEyeClosed } from "react-icons/lu";
import { IoMdEye } from "react-icons/io";

const InputControl = ({ label, isPassword, ...props }) => {
  const [toggle, onToggle] = useState(isPassword); //true
  const [text, setText] = useState("");
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.inputContainer}>
        <input
          type={toggle ? "password" : "text"}
          placeholder={props.placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={styles.icon}>
          {isPassword &&
            (toggle ? (
              <LuEyeClosed onClick={() => onToggle(!toggle)} />
            ) : (
              <IoMdEye onClick={() => onToggle(!toggle)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default InputControl;
