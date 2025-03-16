import React from "react";
import styles from "./project.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Project = ({ name }) => {
  return (
    <div className={styles.container}>
      <div className={styles.project}>
        <div className={styles.name}>{name}</div>
        <div className={styles.connect}>
          <MdEdit />
          <MdDelete />
          <FaGithub />
          <FaLinkedin />
        </div>
      </div>
    </div>
  );
};

export default Project;
