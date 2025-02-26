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
      <input
        type={toggle ? "password" : "text"}
        placeholder="Enter name"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {isPassword &&
        (toggle ? (
          <LuEyeClosed className="eye" onClick={() => onToggle(!toggle)} />
        ) : (
          <IoMdEye onClick={() => onToggle(!toggle)} />
        ))}
    </div>
  );
};

export default InputControl;
