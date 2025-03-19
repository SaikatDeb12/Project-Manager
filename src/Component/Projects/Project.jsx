import React from "react";
import styles from "./project.module.css";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import { Link } from "react-router-dom";

const Project = ({ name, link, github }) => {
  return (
    <div className={styles.container}>
      <div className={styles.project}>
        <div className={styles.name}>{name}</div>
        <div className={styles.connect}>
          <MdEdit className={styles.icons} />
          <MdDelete className={styles.icons} />
          {github ? (
            <Link to={`//${github}`} target="_blank">
              <FaGithub className={styles.icons} />
            </Link>
          ) : (
            ""
          )}
          {link ? (
            <Link to={`//${link}`} target="_blank">
              <FaLink className={styles.icons} />
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
